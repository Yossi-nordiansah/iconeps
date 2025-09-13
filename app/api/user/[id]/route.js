import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {

    const param = await params;
    const id = parseInt(param.id);

    try {
        const data = await prisma.users.findUnique({
            where: { id },
            include: {
                mahasiswa: true
            }
        })
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 });
    }
}

export async function PUT(req, { params }) {

    const param = await params;
    const id = parseInt(param.id);
    const body = await req.json();

    try {
        const editData = await prisma.users.update({
            where: { id },
            data: {
                email: body.email,
                mahasiswa: {
                    update: {
                        data: {
                            nama: body.nama,
                            email: body.email,
                            nomor_telepon : body.telepon,
                            fakultas: body.fakultas,
                            prodi: body.prodi,
                            semester: body.semester,
                            nim: body.nim
                        }
                    }
                }
            }
        });

        return NextResponse.json(editData)
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500})
    }

}