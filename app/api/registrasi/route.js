import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
    const body = await request.json();

    const {
        nama,
        email,
        telepon,
        fakultas,
        prodi,
        semester,
        nim,
        password
    } = body;

    if (!nama || !email || !telepon || !fakultas || !prodi || !semester || !nim || !password) {
        return NextResponse.json({ message: "Data tidak lengkap." }, { status: 400 });
    }


    try {

        const existingUser = await prisma.users.findMany({
            where: { email: email }
        });

        if (existingUser) {
            return NextResponse.json({ message: "Email sudah terdaftar." }, { status: 409 });
        }

        // Cek apakah NIM sudah digunakan
        const existingNIM = await prisma.mahasiswa.findMany({
            where: { nim: nim }
        });

        if (existingNIM) {
            return NextResponse.json({ message: "NIM sudah terdaftar." }, { status: 409 });
        }
        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        const userRegistrasi = await prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
                role: 'mahasiswa',
            }
        });

        const dataMahasiswa = await prisma.mahasiswa.create({
            data: {
                user_id: userRegistrasi.id,
                nama: nama,
                email: email,
                nomor_telepon: telepon,
                fakultas: fakultas,
                prodi: prodi,
                semester: semester,
                nim: nim,
                role: 'mahasiswa'
            }
        });

        console.log("user:", userRegistrasi);
        console.log("mahasiswa:", dataMahasiswa);

        return NextResponse.json({ message: "Registrasi berhasil" }, { status: 200 });

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ message: "Terjadi kesalahan saat registrasi" }, { status: 500 });
    }
}
