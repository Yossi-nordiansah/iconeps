import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
 
export async function GET(req) {
 
    const { searchParams } = new URL(req.url);
    const periode = searchParams.get('periode');

    try {
        const dataPesertaLulus = await prisma.peserta.findMany({
            where: {
                status: 'lulus',
                divisi: 'pusbas',
                kelas_peserta_kelasTokelas: {
                    periode: periode,
                },
            }, 
            include: {
                mahasiswa: true,
                kelas_peserta_kelasTokelas: true,
                nilai: true
            },
        });
        return NextResponse.json(dataPesertaLulus, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 });
    }
}