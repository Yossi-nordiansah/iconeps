import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { kelasId, jadwal } = await req.json();

    if (!kelasId || !jadwal || !Array.isArray(jadwal)) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    const dataToCreate = jadwal.map(item => ({
      id_kelas: parseInt(kelasId),
      hari: item.hari,
      jam_mulai: item.jamMulai,
      jam_selesai: item.jamSelesai,
    }));

    await prisma.jadwal.createMany({ data: dataToCreate });

    return NextResponse.json({ message: "Jadwal berhasil ditambahkan" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, err.message, { status: 500 });
  }
}

export async function GET(req) {

  const { searchParams } = new URL(req.url);
  const periode = searchParams.get('periode');

  try {
    const data = await prisma.kelas.findMany({
      where: {
        divisi: 'puskom',
        periode
      },
      include: {
        jadwal: true,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
}