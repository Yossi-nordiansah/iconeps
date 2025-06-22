import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
    try {
        const data = await prisma.mahasiswa.findMany({
            where: {
                peserta: {
                    some: {
                        status: 'remidial',
                        divisi: 'puskom'
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
                        status: 'remidial',
                        divisi: 'puskom'
                    },
                    select: {
                        pilihan_kelas: true,
                        tanggal_pendaftaran: true,
                        loket_pembayaran: true,
                        nominal_pembayaran: true,
                        tanggal_pembayaran: true,
                        nilai: {
                            select: {
                                excel_2016_e: true,
                                powerpoint_2016_e: true,
                                word_2016_e: true,
                                total: true
                            }
                        },
                        kelas_peserta_kelasTokelas: {
                            select: {
                                nama_kelas: true,
                                periode: true
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
                Tanggal_Daftar: peserta.tanggal_pendaftaran?.toISOString().split('T')[0] || '',
                Loket_Pembayaran: peserta.loket_pembayaran || '',
                Nominal_Pembayaran: peserta.nominal_pembayaran || 0,
                Tanggal_Pembayaran: peserta.tanggal_pembayaran || '',
                Nama_Kelas: peserta.kelas_peserta_kelasTokelas.nama_kelas,
                Periode: peserta.kelas_peserta_kelasTokelas.periode,
                excel_2016_e: nilai.excel_2016_e ?? '',
                powerpoint_2016_e: nilai.powerpoint_2016_e ?? '',
                word_2016_e: nilai.word_2016_e ?? '',
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