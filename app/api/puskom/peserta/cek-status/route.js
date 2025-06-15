import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {

    const body = await req.json();  
    const { id } = body;
    try {
        const dataPeserta = await prisma.users.findUnique({
            where: {
                id
            },
            include: {
                mahasiswa: {
                    include: {
                        peserta: true
                    }
                }
            }
        });
        return NextResponse.json(dataPeserta, {status: 200})
    } catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}