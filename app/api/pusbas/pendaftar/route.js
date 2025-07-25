import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const body = await req.json();
    const { divisi } = body;
    try {
        const data = await prisma.mahasiswa.findMany({
            where: {
                peserta: {
                    some: {
                        divisi: divisi,
                        status: 'pendaftar'
                    }
                }
            },
            select: {
                id: true,
                nama: true,
                fakultas: true, 
                prodi: true,
                nomor_telepon: true,
                semester: true,
                nim: true,
                peserta: {
                    where: {
                        divisi: divisi
                    }
                },
                users: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                },
            },
        });
        if (data.length === 0) {
            return NextResponse.json({ message: "data kosong" }, { status: 200 });
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 });
    }
}
