import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = parseInt(params.id);

  try {
    const jadwal = await prisma.jadwal.findMany({
      where: { id_kelas: id },
      orderBy: { tanggal: "asc" },
    });

    return NextResponse.json(jadwal);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
