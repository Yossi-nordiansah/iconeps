import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updated = await prisma.kelas.update({
      where: { id: parseInt(id) },
      data: { link_ujian: body.link_ujian },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update link" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updated = await prisma.kelas.update({
      where: { id: parseInt(id) },
      data: { link_ujian: body.link_ujian },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Gagal tambah link" }, { status: 500 });
  }
}