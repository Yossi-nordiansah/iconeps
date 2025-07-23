import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req) {

    const pesertaId = await req.json(); 

    try {
        const updatedPesertaList = await Promise.all(
            pesertaId.map(async (pesertaId) => {
                return prisma.peserta.update({
                    where: {
                        id: pesertaId
                    },
                    data: {
                        status: "peserta"
                    }
                });
            })
        );

        return NextResponse.json(updatedPesertaList, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 })
    }

}