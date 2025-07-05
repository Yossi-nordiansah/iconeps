import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt'

export async function PUT(req, { params }) {

    const param = await params;
    const id = parseInt(param.id);
    const body = await req.json();

    let hashedPassword = undefined;

    if (body.password && body.password.trim() !== "") {
        hashedPassword = await bcrypt.hash(body.password, 10);
    }

    try {
        await prisma.users.update({
            where: { id },
            data: {
                email: body.email,
                ...(hashedPassword && { password: hashedPassword }),
            },
        });
        
        await prisma.admin.updateMany({
            where: { users_id: id },
            data: {
                nama: body.nama,
            },
        });
        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 });
    }
}