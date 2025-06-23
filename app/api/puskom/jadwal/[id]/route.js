import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req, { params }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        await prisma.jadwal.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Jadwal berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting jadwal:', error);
        return NextResponse.json({ error: 'Gagal menghapus jadwal' }, { status: 500 });
    }
}

export async function PUT(req, context) {
    const params = await context.params;
    const id_kelas = parseInt(params.id);
    const body = await req.json();
    const jadwalList = body.jadwal;

    if (!Array.isArray(jadwalList) || jadwalList.length === 0) {
        return NextResponse.json({ error: 'Jadwal list missing or invalid' }, { status: 400 });
    }

    try {
        await prisma.jadwal.deleteMany({
            where: { id_kelas }
        });

        const newJadwal = jadwalList.map((item) => ({
            id_kelas,
            hari: item.hari,
            jam_mulai: item.jamMulai,
            jam_selesai: item.jamSelesai,
        }));

        await prisma.jadwal.createMany({
            data: newJadwal
        });

        return NextResponse.json({ message: 'Jadwal berhasil diperbarui' }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Failed to replace jadwal', details: err.message },
            { status: 500 }
        );
    }
}
