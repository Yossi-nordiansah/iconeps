// app/api/pusbas/kelas/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // pastikan path prisma benar

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const periode = searchParams.get('periode');

    if (!periode) {
        return NextResponse.json({ error: 'Periode is required' }, { status: 400 });
    }
    try {
        const kelas = await prisma.kelas.findMany({
            where: { periode },
            include: {
                instruktur: true,
                _count: {
                    select: { peserta_peserta_kelasTokelas: true }
                }
            }
        });

        return NextResponse.json(kelas);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Gagal mengambil data kelas" }, { status: 500 });
    }
}
