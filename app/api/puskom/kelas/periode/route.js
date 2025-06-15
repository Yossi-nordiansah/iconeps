import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const periode = searchParams.get('periode');

    if (!periode) {
        return NextResponse.json({ error: 'Periode is required' }, { status: 400 });
    }

    const data = await prisma.kelas.findMany({
        where: {
            periode: periode,
            divisi: "puskom"
        },
        include: {
            instruktur: true
        }
    });

    return NextResponse.json(data);
}