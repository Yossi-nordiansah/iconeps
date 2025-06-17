import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {

    const { periode } = await req.json();

    try {
        const data = await prisma.peserta.findMany({
            where: {
                kelas_peserta_kelasTokelas: {
                    periode: periode
                },
            },
            select: {
                id: true,
                pilihan_kelas: true,
                mahasiswa: {
                    select: {
                        nim: true,
                        nama: true,
                        fakultas: true,
                        prodi: true,
                        semester: true,
                        email: true,
                        nomor_telepon: true
                    }
                },
                kelas_peserta_kelasTokelas: {
                    select: {
                        nama_kelas: true,
                    }
                }
            }
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}