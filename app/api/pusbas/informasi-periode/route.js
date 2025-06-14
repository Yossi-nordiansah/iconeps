import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {

    try {
        const data = await prisma.informasi_periode.findFirst({
            where: {
                id: 1
            },
        })
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 });
    }
};

export async function PUT(req) {
    const body = await req.json();

    const updated = await prisma.informasi_periode.update({
        where: { id: 1 }, 
        data: {
            keterangan: body.keterangan,
        }
    });

    return Response.json(updated);
}