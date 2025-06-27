import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {

    const param = await params;
    const id = parseInt(param.id);

    try {
        const data = await prisma.peserta.findUnique({
            where: {id},
            include: {
                sertifikat: true
            }
        });
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500} )
    }

}