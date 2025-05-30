import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(req) {

    const body = await req.json();
    const {
        id,
        nama,
        nim,
        email,
        password
    } = body;

    let hashedPassword = undefined;

    if (password && password.trim() !== "") {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
        const updateUser = await prisma.users.update({
            where: {
                id
            },
            data: {
                email: email,
                password: hashedPassword,
                mahasiswa: {
                    update: {
                        nama,
                        nim
                    }
                }
            }
        });
        console.log(updateUser)
        return NextResponse.json({ message: "data berhasil diperbaharui" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }


}