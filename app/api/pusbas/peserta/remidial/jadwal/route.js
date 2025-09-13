import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { peserta_status } from "@prisma/client";

export async function GET() {
  try {
    const data = await prisma.peserta.findFirst({
      select: { jadwal_remidial: true },
      where: { status: peserta_status.remidial },
    });
    console.log("test");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req){

    const body = await req.json();
    const jadwal = body.jadwal;

    try {
        await prisma.peserta.updateMany({
            data: {
                jadwal_remidial: jadwal
            },
            where: { status: peserta_status.remidial }
        });

        return NextResponse.json({status: 200});
    } catch (error) {
        return NextResponse.json({error}, error.message, {status: 500});
    }
}
