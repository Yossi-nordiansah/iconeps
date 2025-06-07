// app/api/pusbas/kelas/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // pastikan path prisma benar

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const periode = searchParams.get('periode');

    if (!periode) {
        return NextResponse.json({ error: 'Periode is required' }, { status: 400 });
    }

    const data = await prisma.kelas.findMany({
        where: {
            periode: periode
        },
        include: {
            instruktur: true
        }
    });

    return NextResponse.json(data);
}
