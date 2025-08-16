import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req){

    const {searchParams} = new URL(req.url);
    const periode = searchParams.get("periode");
    const body = await req.json();
    const link = body.link; 

    try {
        await prisma.periode_puskom.updateMany({
            where: {periode},
            data: {
                link_grup_wa: link
            }
        })
        return NextResponse.json({message: "Data berhasil di unggah"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500});
    }
}

export async function GET(req){

    const {searchParams} = new URL(req.url);
    const periode = searchParams.get("periode");

    try {
        const sendData = await prisma.periode_puskom.findFirst({
            where: {periode},
        })
        return NextResponse.json(sendData, {status: 200});
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500});
    }
}