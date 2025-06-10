import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const body = await req.json();
    const { divisi } = body;
    try {
        const data = await prisma.peserta.findMany({
            where: {
                divisi: divisi,
                status: 'peserta'
            },
            select: {
                id: true,
                pilihan_kelas: true,
                mahasiswa: {
                    nim: true,
                    nama: true,
                    fakultas: true,
                    prodi: true,
                    semester: true
                },
                kelas: {
                    nama_kelas: true,
                    tipe_kelas: true
                }
            }
        });
        if (data.length === 0) {
            return NextResponse.json({ message: "data kosong" }, { status: 404 });
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 });
    }
}
