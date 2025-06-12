// import { NextResponse } from 'next/server';
// import * as XLSX from 'xlsx';
// import prisma from '@/lib/prisma';

// export async function POST(req) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get('file');

//         if (!file) {
//             return NextResponse.json({ error: 'File tidak ditemukan.' }, { status: 400 });
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const workbook = XLSX.read(buffer, { type: 'buffer' });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const studentData = XLSX.utils.sheet_to_json(sheet);

//         // Ambil peserta yang sudah ada
//         const existingPeserta = await prisma.peserta.findMany({
//             include: {
//                 mahasiswa: { select: { nim: true } }
//             }
//         });

//         const pesertaMap = new Map(
//             existingPeserta.map(p => [p.mahasiswa.nim, p])
//         );

//         console.log(pesertaMap);

//         const results = [];

//         for (const student of studentData) {
//             const nim = String(student.nim); // ubah ke string
//             const { reading, listening, structure } = student;

//             if (!pesertaMap.has(nim)) {
//                 console.log(`NIM tidak ditemukan: ${nim}`);
//                 continue;
//             }

//             const peserta = pesertaMap.get(nim);
//             const totalScore = reading + listening + structure;
//             const status = totalScore >= 30 ? 'lulus' : 'remidial';

//             await prisma.peserta.update({
//                 where: { id: peserta.id },
//                 data: { status }
//             });

//             await prisma.nilai.create({
//                 data: {
//                     id_peserta: peserta.id,
//                     reading,
//                     listening,
//                     structure,
//                     total: totalScore,
//                 }
//             });

//             results.push({ nim, status });
//         }


//         return NextResponse.json({
//             message: 'Upload dan update nilai berhasil.',
//             updated: results.length,
//             detail: results
//         });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Terjadi kesalahan saat memproses data.' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const studentData = XLSX.utils.sheet_to_json(sheet);

    const existingPeserta = await prisma.peserta.findMany({
      include: {
        mahasiswa: { select: { nim: true } }
      }
    });

    const pesertaMap = new Map(
      existingPeserta.map(p => [p.mahasiswa.nim, p])
    );

    const results = [];
    const notFound = [];

    for (const student of studentData) {
      const nim = String(student.nim); // ubah ke string
      const { nama, reading, listening, structure } = student;

      if (!pesertaMap.has(nim)) {
        notFound.push({ nim, nama }); // tambahkan nim dan nama
        continue;
      }

      const peserta = pesertaMap.get(nim);
      const totalScore = reading + listening + structure;
      const status = totalScore >= 30 ? 'lulus' : 'remidial';

      await prisma.peserta.update({
        where: { id: peserta.id },
        data: { status }
      });

      await prisma.nilai.create({
        data: {
          id_peserta: peserta.id,
          reading,
          listening,
          structure,
          total: totalScore,
        }
      });

      results.push({ nim, nama, status });
    }

    return NextResponse.json({
      message: 'Upload dan update nilai selesai.',
      updated: results.length,
      notFoundCount: notFound.length,
      updatedData: results,
      notFoundData: notFound
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat memproses data.' }, { status: 500 });
  }
}

