import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {

    const param = await params;
    const id = parseInt(param.id);
    const body = await req.json();

    try {
        const updateDatakelas = await prisma.kelas.update({
            where: {
                id
            },
            data: {
                nama_kelas: body.nama_kelas,
                tipe_kelas: body.tipe_kelas,
                periode: body.periode,
                id_instruktur: parseInt(body.id_instruktur)
            }
        })
        return NextResponse.json(updateDatakelas, { status: 200 })
    } catch (error) {
        return NextResponse.json({error}, error.message, { status: 500 })
    }
};

export async function DELETE(req, { params }) {
    
    const param = await params;
    const id = parseInt(param.id);

    try {
        await prisma.kelas.delete({
            where: {
                id
            }
        })

        return NextResponse.json({message: "Data berhasil dihapus"}, {status: 200})
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500});
    }

}