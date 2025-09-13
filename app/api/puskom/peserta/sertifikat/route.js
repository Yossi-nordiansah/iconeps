import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { periode, link } = body;

    if (!periode || !link) {
      return NextResponse.json({ error: "Periode dan link wajib diisi." }, { status: 400 });
    }

    const updated = await prisma.periode_puskom.update({
      where: { periode },
      data: {
        link_gdrive: link
      }
    });  

    return NextResponse.json({
      message: "Link berhasil diunggah.",
      updatedCount: updated.count
    });
  } catch (error) {
    return NextResponse.json({ error }, error.message, { status: 500 });
  }
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const periode = searchParams.get("periode");

  if (!periode) {
    return NextResponse.json({ error: "Periode wajib diisi" }, { status: 400 });
  };

  const kelas = await prisma.periode_puskom.findFirst({
    where: {
      periode: periode,
    },
  });
  return NextResponse.json({ kelas });
}

