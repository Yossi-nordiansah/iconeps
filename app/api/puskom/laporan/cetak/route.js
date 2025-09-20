// /app/api/pusbas/laporan/cetak/route.js
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';

export async function POST(req) {
  const { tahun } = await req.json();
  console.log(tahun);

  try {
    const peserta = await prisma.peserta.findMany({
      where: {
        status: { in: ['lulus', 'remidial'] },
        divisi: 'puskom',
      },
    });

    console.log(peserta)

    const data = peserta.map((p) => ({
      Periode: p.periode,
      Nama: p.mahasiswa.nama,
      Status: p.status,
    }));

    const totalPeserta = peserta.length;
    const totalLulus = peserta.filter(p => p.status === 'lulus').length;
    const totalRemidial = peserta.filter(p => p.status === 'remidial').length;

    data.push({});
    data.push({ Periode: 'Total Peserta', Nama: totalPeserta });
    data.push({ Periode: 'Total Lulus', Nama: totalLulus });
    data.push({ Periode: 'Total Remidial', Nama: totalRemidial });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Laporan_${tahun}`);

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=laporan_${tahun}.xlsx`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Gagal membuat laporan', error }, { status: 500 });
  }
}