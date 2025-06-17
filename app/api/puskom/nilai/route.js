// import { NextResponse } from 'next/server';
// import * as XLSX from 'xlsx';
// import prisma from '@/lib/prisma';
// import fs from 'fs';
// import path from 'path';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import fontkit from '@pdf-lib/fontkit';

// export async function POST(req) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get('file');

//         if (!file) {
//             return NextResponse.json({ error: 'File tidak ditemukan.' }, { status: 400 });
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const workbook = XLSX.read(buffer, { type: 'buffer' });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const studentData = XLSX.utils.sheet_to_json(sheet);

//         const existingPeserta = await prisma.peserta.findMany({
//             include: {
//                 mahasiswa: { select: { nim: true } }
//             }
//         });

//         const pesertaMap = new Map(
//             existingPeserta.map(p => [p.mahasiswa.nim, p])
//         );

//         const results = [];
//         const notFound = [];

//         for (const student of studentData) {
//             const nim = String(student.nim);
//             const { nama, status: statusExcel } = student;

//             if (!pesertaMap.has(nim)) {
//                 notFound.push({ nim, nama });
//                 continue;
//             }

//             const peserta = pesertaMap.get(nim);

//             const status = statusExcel?.toLowerCase() === 'lulus' ? 'lulus' : 'remidial';

//             await prisma.peserta.update({
//                 where: { id: peserta.id },
//                 data: { status }
//             });
//             results.push({ nim, nama, status });
//         }

//         return NextResponse.json({
//             message: 'Upload dan update nilai selesai.',
//             updated: results.length,
//             notFoundCount: notFound.length,
//             updatedData: results,
//             notFoundData: notFound
//         });
//     } catch (error) {
//         return NextResponse.json({ error }, error.message, { status: 500 });
//     }
// }

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
    const studentData = XLSX.utils.sheet_to_json(sheet);

    // Hanya ambil peserta dengan divisi 'puskom'
    const existingPeserta = await prisma.peserta.findMany({
      where: {
        divisi: 'puskom'
      },
      include: {
        mahasiswa: { select: { nim: true } }
      }
    });

    // Buat map dengan key = nim
    const pesertaMap = new Map(
      existingPeserta.map(p => [p.mahasiswa.nim, p])
    );

    const results = [];
    const notFound = [];

    for (const student of studentData) {
      const nim = String(student.nim).trim();
      const { nama, status: statusExcel } = student;

      if (!pesertaMap.has(nim)) {
        notFound.push({ nim, nama });
        continue;
      }

      const peserta = pesertaMap.get(nim);
      const status = statusExcel?.toLowerCase() === 'lulus' ? 'lulus' : 'remidial';

      await prisma.peserta.update({
        where: { id: peserta.id },
        data: { status }
      });

      results.push({ nim, nama, status });
    }

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
      { status: 500 }
    );
  }
}
