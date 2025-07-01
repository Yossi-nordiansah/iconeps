import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){
    try {
        const data = await prisma.users.findMany({
            where: {
                role: 'admin_pusbas'
            },
            include: {
                admin: true,
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, error.message, { status: 500 })
    }
}