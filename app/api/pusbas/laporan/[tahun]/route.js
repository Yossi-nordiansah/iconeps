import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    const param = await params;
    const tahun = param.tahun;

    try {
        const kelas = await prisma.kelas.findMany({
            where: {
                periode: {
                    endsWith: tahun,
                },
            },
            select: {
                periode: true,
                peserta_peserta_kelasTokelas: {
                    select: {
                        status: true,
                    },
                },
            },
        });

        // Buat array awal dari map
        const laporanMentah = kelas.map((kls) => {
            const total = kls.peserta_peserta_kelasTokelas.length;
            const lulus = kls.peserta_peserta_kelasTokelas.filter(p => p.status === 'lulus').length;
            const remidi = kls.peserta_peserta_kelasTokelas.filter(p => p.status === 'remidial').length;
            return {
                periode: kls.periode,
                peserta: total,
                lulus,
                remidi,
            };
        });

        // Gabungkan berdasarkan periode
        const laporan = Object.values(
            laporanMentah.reduce((acc, curr) => {
                if (!acc[curr.periode]) {
                    acc[curr.periode] = { ...curr };
                } else {
                    acc[curr.periode].peserta += curr.peserta;
                    acc[curr.periode].lulus += curr.lulus;
                    acc[curr.periode].remidi += curr.remidi;
                }
                return acc;
            }, {})
        );

        return NextResponse.json(laporan);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
