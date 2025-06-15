import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req){

    const body = await req.json();

    try {
        const data = await prisma.instruktur.create({
            data: {
                nama: body.nama,
                divisi: body.divisi,
                kontak: body.kontak
            }
        })
        return NextResponse.json(data, {status: 200})
    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }
};

export async function GET(){

    try {
        const data = await prisma.instruktur.findMany({
            where: {
                divisi: "puskom"
            }
        })

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.messagem, {status: 200})
    }
}