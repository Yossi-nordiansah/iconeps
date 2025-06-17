import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
    const param = await params;
    const kelasId = parseInt(param.id);
    const body = await req.json();

    try {
        const editData = await prisma.peserta.update({
            where: { 
                id: body.id
             },
            data: {
                kelas: kelasId
            }
        });
        return NextResponse.json(editData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}