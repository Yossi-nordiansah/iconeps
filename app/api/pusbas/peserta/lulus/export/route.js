import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
    try {
        const data = await prisma.mahasiswa.findMany({
            where: {
                peserta: {
                    some: {
                        status: 'lulus',
                        divisi: 'pusbas'
                    }
                }
            },
            select: {
                nama: true,
                fakultas: true,
                prodi: true,
                nomor_telepon: true,
                semester: true,
                nim: true,
                peserta: {
                    where: {
                        status: 'lulus',
                        divisi: 'pusbas'
                    },
                    select: {
                        pilihan_kelas: true,
                        tanggal_pendaftaran: true,
                        loket_pembayaran: true,
                        nominal_pembayaran: true,
                        tanggal_pembayaran: true,
                        nilai: {
                            select: {
                                listening: true,
                                structure: true,
                                reading: true,
                                total: true
                            }
                        }
                    }
                }
            }
        });

        const flatData = data.map((mhs) => {
            const peserta = mhs.peserta[0] || {};
            const nilai = peserta.nilai?.[0] || {};

            return {
                Nama: mhs.nama,
                Fakultas: mhs.fakultas,
                Prodi: mhs.prodi,
                NIM: mhs.nim,
                Telepon: mhs.nomor_telepon,
                Semester: mhs.semester,
                Pilihan_Kelas: peserta.pilihan_kelas || '',
                Tanggal_Daftar: peserta.tanggal_pendaftaran?.toISOString().split('T')[0] || '',
                Loket_Pembayaran: peserta.loket_pembayaran || '',
                Nominal_Pembayaran: peserta.nominal_pembayaran || 0,
                Tanggal_Pembayaran: peserta.tanggal_pembayaran || '',
                Listening: nilai.listening ?? '',
                Structure: nilai.structure ?? '',
                Reading: nilai.reading ?? '',
                Total: nilai.total ?? '',
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(flatData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Lulus");

        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename=pendaftar_pusbas_lulus.xlsx'
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Terjadi kesalahan saat ekspor data.' }, { status: 500 });
    }
}
