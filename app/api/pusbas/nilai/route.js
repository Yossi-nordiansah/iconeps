import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

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

    // Ambil hanya peserta dengan divisi 'pusbas'
    const existingPeserta = await prisma.peserta.findMany({
      where: {
        divisi: 'pusbas',
        status: { in: ['peserta', 'lulus', 'remidial'] }
      },
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
      const nim = String(student.nim).trim();
      const { nama, reading, listening, structure, total } = student;

      if (!pesertaMap.has(nim)) {
        notFound.push({ nim, nama });
        continue;
      }

      const peserta = pesertaMap.get(nim);
      const totalScore = total;
      const status = totalScore >= 400 ? 'lulus' : 'remidial';

      // Hanya generate sertifikat jika lulus
      if (status === 'lulus') {
        const templatePath = path.join(process.cwd(), 'public/template/sertifikat-template.pdf');
        const existingPdfBytes = fs.readFileSync(templatePath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const [page] = pdfDoc.getPages();

        const fontPathRegular = path.join(process.cwd(), 'public/fonts/times-new-roman.ttf');
        let fontRegular;
        if (fs.existsSync(fontPathRegular)) {
          const fontRegularBytes = fs.readFileSync(fontPathRegular);
          fontRegular = await pdfDoc.embedFont(fontRegularBytes);
        } else {
          fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
        }

        const fontPathBold = path.join(process.cwd(), 'public/fonts/times-new-roman-bold.ttf');
        let font;
        if (fs.existsSync(fontPathBold)) {
          const fontBytes = fs.readFileSync(fontPathBold);
          font = await pdfDoc.embedFont(fontBytes);
        } else {
          font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        }

        const { width } = page.getSize();

        // Nomor sertifikat (optional)
        if (student.no !== undefined) {
          const nomorText = `Number: ${student.no}/ILLC-UNIM/III/2025`;
          const nomorWidth = fontRegular.widthOfTextAtSize(nomorText, 18);
          page.drawText(nomorText, {
            x: (width - nomorWidth) / 2,
            y: 435,
            size: 18,
            font: fontRegular,
            color: rgb(0, 0, 0),
          });
        }

        // Nama Mahasiswa
        const namaUpper = nama.toUpperCase();
        const namaWidth = font.widthOfTextAtSize(namaUpper, 24);
        page.drawText(namaUpper, {
          x: (width - namaWidth) / 2,
          y: 374,
          size: 24,
          font,
          color: rgb(0, 0, 0),
        });

        // Skor
        page.drawText(`${reading}`, { x: 494, y: 255, size: 16, font, color: rgb(0, 0, 0) });
        page.drawText(`${listening}`, { x: 494, y: 233, size: 16, font, color: rgb(0, 0, 0) });
        page.drawText(`${structure}`, { x: 494, y: 212, size: 16, font, color: rgb(0, 0, 0) });
        page.drawText(`${totalScore}`, { x: 564, y: 231, size: 31, font, color: rgb(0, 0, 0) });

        // Tanggal sekarang
        const now = new Date();
        const tanggalFormatted = now.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        page.drawText(tanggalFormatted, {
          x: 660,
          y: 169,
          size: 15,
          font: fontRegular,
          color: rgb(0, 0, 0),
        });

        // Simpan sertifikat
        const pdfBytes = await pdfDoc.save();
        const outputDir = path.join(process.cwd(), 'public/sertifikat');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

        const fileName = `sertifikat_${nim}.pdf`;
        fs.writeFileSync(path.join(outputDir, fileName), pdfBytes);

        await prisma.sertifikat.create({
          data: {
            jenis: 'pusbas',
            id_peserta: peserta.id,
            nomor_sertifikat: student.no !== undefined ? `${student.no}` : null,
            path: `/public/sertifikat/${fileName}`,
          }
        });
      }

      // Update status peserta
      await prisma.peserta.update({
        where: { id: peserta.id },
        data: { status },
      });

      // Simpan nilai
      const existingNilai = await prisma.nilai.findFirst({
        where: { id_peserta: peserta.id }
      });

      if (existingNilai) {
        // Kalau sudah ada, lakukan update
        await prisma.nilai.update({
          where: { id: existingNilai.id },
          data: {
            reading,
            listening,
            structure,
            total: totalScore,
          }
        });
      } else {
        // Kalau belum ada, buat baru
        await prisma.nilai.create({
          data: {
            id_peserta: peserta.id,
            reading,
            listening,
            structure,
            total: totalScore,
          }
        });
      }


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
    return NextResponse.json({ error }, error.message, { status: 500 });
  }
}
