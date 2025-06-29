import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const jumlahMahasiswa = await prisma.mahasiswa.count();
    const jumlahKelas = await prisma.kelas.count();

    const jumlahPendaftar = await prisma.peserta.count({
      where: { status: 'pendaftar', divisi: 'pusbas' },
    });

    const jumlahPesertaLulus = await prisma.peserta.count({
      where: { status: 'lulus', divisi: 'pusbas' },
    });

    const jumlahPesertaRemidial = await prisma.peserta.count({
      where: { status: 'remidial', divisi: 'pusbas' },
    });

    const jumlahPeserta = await prisma.peserta.count({
      where: {
        status: { in: ['peserta', 'lulus', 'remidial'] },
        divisi: 'pusbas'
      },
    });

    return NextResponse.json({
      jumlahMahasiswa,
      jumlahKelas,
      jumlahPendaftar,
      jumlahPeserta,
      jumlahPesertaLulus,
      jumlahPesertaRemidial,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
