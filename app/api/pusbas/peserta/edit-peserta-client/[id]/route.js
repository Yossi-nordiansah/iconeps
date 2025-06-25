import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export async function PUT(req, { params }) {
  const id = parseInt(params.id);

  try {
    const formData = await req.formData();

    const pilihan_kelas = formData.get("pilihan_kelas");
    const nominal_pembayaran = parseInt(formData.get("nominal_pembayaran"));
    const loket_pembayaran = formData.get("loket_pembayaran");
    const tanggal_pembayaran = formData.get("tanggal_pembayaran");
    const divisi = formData.get("divisi");
    const file = formData.get("bukti_pembayaran");

    let bukti_pembayaran = null;

    // Simpan file jika ada file baru
    if (file && typeof file === "object" && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      bukti_pembayaran = `/uploads/${fileName}`;
    }

    const updateData = {
      pilihan_kelas,
      nominal_pembayaran,
      loket_pembayaran,
      tanggal_pembayaran,
    };

    if (bukti_pembayaran) {
      updateData.bukti_pembayaran = bukti_pembayaran;
    }

    await prisma.peserta.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memperbarui data peserta" }, { status: 500 });
  }
}
