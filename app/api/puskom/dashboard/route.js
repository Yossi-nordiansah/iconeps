import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const periode = searchParams.get('periode');

    try {
        const jumlahMahasiswa = await prisma.mahasiswa.count();

        const jumlahKelas = await prisma.kelas.count({
            where: {
                periode: periode || undefined,
                divisi: 'puskom',
            },
        });

        const jumlahPendaftar = await prisma.peserta.count({
            where: {
                status: 'pendaftar',
                divisi: 'puskom',
            },
        });

        const jumlahPeserta = await prisma.peserta.count({
            where: {
                status: {
                    in: ['peserta', 'lulus', 'remidial'],
                },
                divisi: 'puskom',
                kelas_peserta_kelasTokelas: {
                    periode: periode || undefined,
                },
            },
        });

        const jumlahPesertaLulus = await prisma.peserta.count({
            where: {
                status: 'lulus',
                divisi: 'puskom',
                kelas_peserta_kelasTokelas: {
                    periode: periode || undefined,
                },
            },
        });

        const jumlahPesertaRemidial = await prisma.peserta.count({
            where: {
                status: 'remidial',
                divisi: 'puskom', 
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
