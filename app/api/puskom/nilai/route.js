import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = rawData[1];
    const rows = rawData.slice(2).filter(row => !!row[headers.indexOf('ID')]);


    const studentData = rows.map(row => {
      const obj = {};
      headers.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });

    const existingPeserta = await prisma.peserta.findMany({
      where: {
        divisi: 'puskom',
        status: { in: ['peserta', 'lulus', 'remidial'] }
      },
      include: {
        mahasiswa: { select: { nim: true } }
      }
    });

    const pesertaMap = new Map(
      existingPeserta.map(p => [p.mahasiswa.nim.trim(), p])
    );

    const results = [];
    const notFound = [];

    console.log(studentData)

    for (const student of studentData) {
      const nim = student['ID']?.toString().replace(/\D/g, '').trim() || '';
      const nama = student['Name']?.toString().trim() || '';
      const statusExcel = student['Status']?.toString().trim().toLowerCase() || '';

      if (!nim || !pesertaMap.has(nim)) {
        notFound.push({ nim, nama });
        continue;
      }

      const peserta = pesertaMap.get(nim);
      const status = statusExcel === 'lulus' ? 'lulus' : 'remidial';

      await prisma.peserta.update({
        where: { id: peserta.id },
        data: { status }
      });

      const existingNilai = await prisma.nilai.findFirst({
        where: { id_peserta: peserta.id }
      });

      if (existingNilai) {
        await prisma.nilai.update({
          where: { id: existingNilai.id },
          data: {
            id_peserta: peserta.id,
            excel_2016_e: student.excel_2016_e,
            powerpoint_2016_e: student.powerpoint_2016_e,
            word_2016_e: student.word_2016_e,
            total: parseFloat(student.Percentage?.toString().replace('%', '').trim()) || 0,
          }
        });
      } else {
        await prisma.nilai.create({
          data: {
            id_peserta: peserta.id,
            excel_2016_e: student.excel_2016_e,
            powerpoint_2016_e: student.powerpoint_2016_e,
            word_2016_e: student.word_2016_e,
            total: parseFloat(student.Percentage?.toString().replace('%', '').trim()) || 0,
          }
        });
      }

      results.push({ nim, nama, status });
    };

    return NextResponse.json({
      message: 'Upload dan update nilai selesai.',
      updated: results.length,
      notFoundCount: notFound.length,
      updatedData: results,
      notFoundData: notFound
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan.' },
      error.message,
      { status: 500 }
    );
  }
}


