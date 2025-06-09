import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, {params}){

    const param = await params;
    const kelasId = param.id;
    const pesertaId = await req.json();

    // console.log(pesertaId);
    // return NextResponse.json({status: 200});
    
    try {
        const updatedPesertaList = await Promise.all(
            pesertaId.map(async (pesertaId) => {
                return prisma.peserta.update({
                    where: {
                        id: pesertaId
                    },
                    data: {
                        kelas: parseInt(kelasId),
                        status: "peserta"
                    }
                });
            })
        );

        return NextResponse.json(updatedPesertaList, { status: 200 });
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500})
    }
} 