'use client';
import { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import axios from 'axios';
import fontkit from '@pdf-lib/fontkit';

export default function AdminCetakLaporan() {
    const [tahun, setTahun] = useState('');
    const [listTahun, setListTahun] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchTahun = async () => {
            const res = await axios.get('/api/pusbas/laporan');
            const tahunArray = res.data.sort((a, b) => b - a);
            setListTahun(tahunArray);
        };

        fetchTahun();
    }, []);

    const handleBuatLaporan = async () => {
        if (!tahun) return alert("Pilih tahun terlebih dahulu!");

        const res = await axios.get(`/api/pusbas/laporan/${tahun}`);
        const data = res.data;

        // Gabungkan data yang memiliki periode sama
        const mapPeriode = {};
        data.forEach(item => {
            const periode = item.periode;
            if (!mapPeriode[periode]) {
                mapPeriode[periode] = {
                    periode: item.periode,
                    peserta: item.peserta,
                    lulus: item.lulus,
                    remidi: item.remidi,
                };
            } else {
                mapPeriode[periode].peserta += item.peserta;
                mapPeriode[periode].lulus += item.lulus;
                mapPeriode[periode].remidi += item.remidi;
            }
        });
        const laporanUnik = Object.values(mapPeriode);
        console.log(laporanUnik);

        // Ambil font
        const fontBytes = await fetch('/fonts/times-new-roman.ttf').then(res => res.arrayBuffer());

        // Buat PDF
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes);

        const page = pdfDoc.addPage([595, 842]); // A4
        const { height } = page.getSize();
        const fontSize = 12;
        const startX = 50;
        const columnWidths = [200, 100, 100, 100];
        const rowHeight = 20;
        let y = height - 50;

        // Judul
        page.drawText(`Laporan Tahun ${tahun}`, {
            x: startX,
            y,
            size: 18,
            font: customFont,
            color: rgb(0, 0, 0.8),
        });
        y -= 30;

        // Keterangan kolom
        const descriptions = [
            ['Periode', 'Waktu pelaksanaan pelatihan'],
            ['Jumlah Peserta', 'Total peserta dalam periode tersebut'],
            ['Lulus', 'Jumlah peserta yang dinyatakan lulus'],
            ['Remidi', 'Jumlah peserta yang harus mengikuti remedial'],
        ];

        descriptions.forEach(desc => {
            page.drawText(`${desc[0]}: ${desc[1]}`, {
                x: startX,
                y,
                size: 10,
                font: customFont,
                color: rgb(0.3, 0.3, 0.3),
            });
            y -= 14;
        });

        y -= 10; // Spasi sebelum tabel

        // Header tabel
        const headers = ['Periode', 'Jumlah Peserta', 'Lulus', 'Remidi'];
        headers.forEach((text, i) => {
            const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

            // Gambar kotaknya dulu (posisi dari y - rowHeight)
            page.drawRectangle({
                x,
                y: y - rowHeight,
                width: columnWidths[i],
                height: rowHeight,
                borderWidth: 0.5,
                color: rgb(1, 1, 1),
                borderColor: rgb(0, 0, 0),
            });

            // Gambar teksnya di tengah kotak
            page.drawText(text, {
                x: x + 5,
                y: y - rowHeight + 6, // posisikan teks agar berada dalam kotak
                size: fontSize,
                font: customFont,
                color: rgb(0, 0, 0),
            });
        });

        y -= rowHeight;

        // Data isi tabel
        laporanUnik.forEach(row => {
            const values = [row.periode, row.peserta, row.lulus, row.remidi];
            values.forEach((text, i) => {
                const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

                // Gambar kotak terlebih dahulu
                page.drawRectangle({
                    x,
                    y: y - rowHeight,
                    width: columnWidths[i],
                    height: rowHeight,
                    borderWidth: 0.5,
                    color: rgb(1, 1, 1),
                    borderColor: rgb(0, 0, 0),
                });

                // Gambar teks di tengah kotak
                page.drawText(text.toString(), {
                    x: x + 5,
                    y: y - rowHeight + 6, // offset ke bawah agar teks ada di tengah
                    size: fontSize,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
            });
            y -= rowHeight;
        });

        // Total baris
        const totalPeserta = laporanUnik.reduce((a, b) => a + b.peserta, 0);
        const totalLulus = laporanUnik.reduce((a, b) => a + b.lulus, 0);
        const totalRemidi = laporanUnik.reduce((a, b) => a + b.remidi, 0);
        const totalValues = ['TOTAL', totalPeserta, totalLulus, totalRemidi];

        totalValues.forEach((text, i) => {
            const x = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);

            page.drawRectangle({
                x,
                y: y - rowHeight,
                width: columnWidths[i],
                height: rowHeight,
                borderWidth: 0.5,
                color: rgb(1, 1, 1),
                borderColor: rgb(0, 0, 0),
            });

            page.drawText(text.toString(), {
                x: x + 5,
                y: y - rowHeight + 6,
                size: fontSize + 1,
                font: customFont,
                color: rgb(0.2, 0.2, 0.2),
            });
        });
        const fileName = `laporan_${tahun}.pdf`;
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl({ url, fileName });
    };

    return (
        <div className="relative pl-52 pr-6 pt-20">
            <h1 className="text-2xl font-semibold mb-4">Cetak Laporan</h1>
            <div className='flex items-center gap-3 mb-4'>
                <label>Tahun:</label>
                <div className="px-2 py-1 border rounded cursor-pointer w-fit">
                    <select
                        className="bg-transparent outline-none"
                        value={tahun}
                        onChange={(e) => setTahun(e.target.value)}
                    >
                        <option value="">Pilih Tahun</option>
                        {listTahun.map((t, idx) => (
                            <option key={idx} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <button
                    className='px-2 py-1 bg-blue-700 text-white font-semibold rounded'
                    onClick={handleBuatLaporan}
                >
                    Buat Laporan
                </button>
            </div>

            {pdfUrl ? (
                <iframe
                    src={pdfUrl.url}
                    title="Preview PDF"
                    width="100%"
                    height="400px"
                    className="border"
                />
            ) : (
                <div className='h-96 flex items-center justify-center text-xl font-bold'>
                    Tidak Ada Laporan
                </div>
            )}
        </div>
    );
}
