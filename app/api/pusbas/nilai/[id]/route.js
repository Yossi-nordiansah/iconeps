import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {

    const param = await params;
    const id = parseInt(param.id);

    try {
        const nilai  = await prisma.nilai.findFirst({
            where: {
                id_peserta: id
            }
        })
        return NextResponse.json(nilai)
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500})
    }

}