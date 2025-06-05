import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {

    const param = await params;
    const id = parseInt(param.id);
    const body = await req.json();

    try {
        const editInstruktur = await prisma.instruktur.update({
            where: {
                id
            },
            data: {
                nama: body.nama,
                kontak: body.kontak
            }
        });
        return NextResponse.json(editInstruktur, { status: 200 })
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 })
    }
};

export async function DELETE(req, {params}) {

    const param = await params;
    const id = parseInt(param.id);

    try {
        await prisma.instruktur.delete({
            where: {
                id
            }
        })
        return NextResponse.json({message: "Data berhasil dihapus"}, {status: 200})
    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }

}