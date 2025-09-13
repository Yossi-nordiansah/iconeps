import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const periode = searchParams.get('periode');

    try {
        const data = await prisma.peserta.findMany({
            where: {
                status: 'lulus',
                kelas_peserta_kelasTokelas: {
                    periode: periode,
                },
            },
            include: {
                mahasiswa: true,
                sertifikat: true
            }
        })
        return NextResponse.json(data, {status: 200})
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500});
    }
}