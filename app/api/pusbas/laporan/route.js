import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const periodes = await prisma.kelas.findMany({
            select: {
                periode: true,
            },
        });
        const tahunSet = new Set();
        periodes.forEach(p => {
            const match = p.periode.match(/\b(20\d{2})\b/); 
            if (match) {
                tahunSet.add(match[1]);
            }
        });

        const tahunList = Array.from(tahunSet).sort((a, b) => b - a);
        return NextResponse.json(tahunList);
    } catch (error) {
        console.error("Gagal fetch periode:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
