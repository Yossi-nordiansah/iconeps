import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){
    try {
        const dataPesertaLulus = await prisma.peserta.findMany({
            where: {
                status: 'lulus'
            },
            include: {
                mahasiswa: true
            }
        })
        return NextResponse.json(dataPesertaLulus, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500});
    }
}