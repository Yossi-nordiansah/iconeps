import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    const param = await params;
    const id = parseInt(param.id);

    try {
        const data = await prisma.peserta.findUnique({
            where: id,
            
        })
    } catch (error) {

    }

}

export async function PUT(req, { params }) {
    const param = await params;
    const id = parseInt(param.id);
    const body = await req.json();
    const { pilihan_kelas, nominal_pembayaran, loket_pembayaran } = body.updatedData;
    const divisi = body.divisi

    try {
        const editData = await prisma.mahasiswa.update({
            where: { id },
            data: {
                peserta: {
                    updateMany: {
                        where: {
                            divisi,
                        },
                        data: {
                            pilihan_kelas,
                            nominal_pembayaran: parseInt(nominal_pembayaran),
                            loket_pembayaran
                        }
                    }
                }
            }
        });
        return NextResponse.json(editData, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const param = await params;
    const id = parseInt(param.id);

    if (!id) {
        return NextResponse.json({ message: "ID tidak ditemukan di URL" }, { status: 400 });
    }

    try {
        await prisma.peserta.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Data berhasil dihapus" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}