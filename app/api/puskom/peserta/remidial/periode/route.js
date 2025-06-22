import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {

    try {
        const dataPesertaLulus = await prisma.peserta.findMany({
            where: {
                status: 'remidial',
                divisi: 'puskom'
            },
            include: {
                mahasiswa: true,
                kelas_peserta_kelasTokelas: true,
                nilai: true
            },
        })
        return NextResponse.json(dataPesertaLulus, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 });
    }
}