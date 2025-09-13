import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
    const body = await request.json();

    const {
        nama,
        email,
        password,
        role
    } = body;

    if (!nama || !email || !role || !password) {
        return NextResponse.json({ message: "Data tidak lengkap." }, { status: 400 });
    }

    try {
        const existingUser = await prisma.users.findMany({
            where: { email: email }
        });

        if (existingUser.length > 0) {
            return NextResponse.json({ message: "Email sudah terdaftar." }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRegistrasi = await prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
                role: role,
            }
        });

        const dataAdmin = await prisma.admin.create({
            data: {
                users_id: userRegistrasi.id,
                nama: nama,
                role: role
            }
        });

        return NextResponse.json({ message: "Admin berhasil Ditambahkan" }, { status: 200 });

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
    }
}

