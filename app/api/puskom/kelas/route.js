import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {

    const body = await req.json();

    try {
        const data = await prisma.kelas.create({
            data: { 
                nama_kelas: body.nama_kelas,
                id_instruktur: parseInt(body.id_instruktur),
                divisi: "puskom",
                periode: body.periode
            }
        })
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 })
    }
}

export async function GET() {
    try {
        const data = await prisma.kelas.findMany({
            where: {
                divisi: 'puskom'
            },
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 })
    }
}