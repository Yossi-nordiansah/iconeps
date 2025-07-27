import { writeFile, mkdir } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Buffer } from "buffer";
import { getPeriodePuskomByTanggal } from '@/lib/getPeriodePuskom';

export async function POST(req) {
    const formData = await req.formData();
    // const tanggal_pendaftaran = new Date(); 
    // const tanggalPendaftaranToExecute = tanggal_pendaftaran.toISOString().substring(0, 10);

    //testing
    const dateStr = '2025-03-31T13:48:24.625Z';
    const dateObj = new Date(dateStr);
    const tanggalPendaftaranToExecute = dateObj.toISOString().substring(0, 10);

    const origin = req.headers.get('origin');
    if (!origin || !origin.includes(process.env.ALLOWED_ORIGIN)) {
        return NextResponse.json({ error: 'Request tidak valid (CSRF)' }, { status: 403 });
    }

    const bukti_pembayaran = formData.get("bukti_pembayaran");
    const mahasiswa_id = sanitizeText(formData.get("mahasiswa_id"));
    const status = sanitizeText(formData.get("status"));
    const divisi = sanitizeText(formData.get("divisi"));
    const pilihan_kelas = sanitizeText(formData.get("pilihan_kelas"));
    const tanggal_pembayaran = sanitizeText(formData.get("tanggal_pembayaran")); // format: yyyy-mm-dd
    const nominal_pembayaran = parseInt(formData.get("nominal_pembayaran"));
    const loket_pembayaran = sanitizeText(formData.get("loket_pembayaran"));

    if (!(bukti_pembayaran instanceof Blob)) return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    if (isNaN(nominal_pembayaran)) return NextResponse.json({ error: "Nominal pembayaran tidak valid" }, { status: 400 });
    if (!["image/jpeg", "image/png"].includes(bukti_pembayaran.type)) return NextResponse.json({ error: "File harus berupa JPG/PNG" }, { status: 400 });

    const uploadDir = path.join(process.cwd(), "public", "bukti-pembayaran");
    await mkdir(uploadDir, { recursive: true });
    const extension = bukti_pembayaran.type === "image/png" ? "png" : "jpg";
    const safeFileName = `${nanoid()}.${extension}`;
    const filePath = path.join(uploadDir, safeFileName);
    const buffer = Buffer.from(await bukti_pembayaran.arrayBuffer());
    await writeFile(filePath, buffer);

    try {
        const mahasiswa = await prisma.mahasiswa.findFirst({
            where: { user_id: parseInt(mahasiswa_id) }
        });

        if (!mahasiswa) return NextResponse.json({ error: "Mahasiswa tidak ditemukan" }, { status: 404 });

        const periode_puskom = await getPeriodePuskomByTanggal(tanggalPendaftaranToExecute);

        const created = await prisma.peserta.create({
            data: {
                mahasiswa_id: mahasiswa.id,
                status,
                divisi,
                pilihan_kelas,
                tanggal_pembayaran,
                nominal_pembayaran,
                loket_pembayaran,
                bukti_pembayaran: `/bukti-pembayaran/${safeFileName}`,
                periode_puskom,
                tanggal_pendaftaran: dateObj
            },
        });
        console.log(periode_puskom);
        return NextResponse.json(created, { status: 200 });

    } catch (err) {
        console.error("Database Error:", err);
        return NextResponse.json({ error: err.message || "Terjadi kesalahan" }, { status: 500 });
    }
}

function sanitizeText(input) {
    if (typeof input !== "string") return "";
    return input.trim().replace(/[<>"'`&]/g, "");
}
