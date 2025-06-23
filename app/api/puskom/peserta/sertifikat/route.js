import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { periode, link } = body;

    if (!periode || !link) {
      return NextResponse.json({ error: "Periode dan link wajib diisi." }, { status: 400 });
    }

    const updated = await prisma.kelas.updateMany({
      where: {
        periode: periode,
        divisi: 'puskom'
      },
      data: {
        link_sertifikat_puskom: link
      }
    });

    return NextResponse.json({
      message: "Link berhasil diunggah.",
      updatedCount: updated.count
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const periode = searchParams.get("periode");

  if (!periode) {
    return NextResponse.json({ error: "Periode wajib diisi" }, { status: 400 });
  };

  console.log(periode);

  const kelas = await prisma.kelas.findFirst({
    where: {
      periode,
      divisi: "puskom",
    },
    select: {
      link_sertifikat_puskom: true,
    },
  });

  return NextResponse.json({ link: kelas?.link_sertifikat_puskom || "" });
}

