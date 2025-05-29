import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req){

    try {
        const getDataMahasiswa = await prisma.users.findMany({
            where: {
                role: 'mahasiswa'
            },
            include: {
                mahasiswa: true
            }
        });
        return NextResponse.json(getDataMahasiswa, {status: 200})
    } catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}