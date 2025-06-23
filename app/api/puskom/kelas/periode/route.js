import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const periode = searchParams.get('periode');

    if (!periode) {
        return NextResponse.json({ error: 'Periode is required' }, { status: 400 });
    }
    try {
        const kelas = await prisma.kelas.findMany({
            where: { periode,
                divisi: 'puskom'
             }, 
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
