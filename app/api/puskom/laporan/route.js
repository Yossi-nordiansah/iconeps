import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const periodes = await prisma.peserta.findMany({
      where: {
        divisi: "puskom",
      },
    });
    const periodeList = periodes.map((p) => p.periode_puskom);
    // console.log(periodeList);
    // const tahunSet = new Set();
    // periodes.forEach(p => {
    //     const match = p.periode.match(/\b(20\d{2})\b/);
    //     if (match) {
    //         tahunSet.add(match[1]);
    //     }
    // });

    // const tahunList = Array.from(tahunSet).sort((a, b) => b - a);
    const tahunUnik = [
      ...new Set(
        periodeList
          .map((p) => {
            const match = p.match(/\b(20\d{2})\b/); // cari angka tahun 20xx
            return match ? parseInt(match[1]) : null;
          })
          .filter(Boolean) // buang null kalau tidak ketemu
      ),
    ];

    console.log(tahunUnik);
    return NextResponse.json(tahunUnik, { status: 200 });
  } catch (error) {
    console.error("Gagal fetch periode:", error);
    return NextResponse.json({ error }, error.message, { status: 500 });
  }
}
