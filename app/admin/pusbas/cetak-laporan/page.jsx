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
        if (!tahun) {
            alert("Pilih tahun terlebih dahulu.");
            return;
        }

        try {
            const res = await fetch('/api/pusbas/laporan/cetak', {
                method: 'POST',
                body: JSON.stringify({ tahun }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Gagal unduh laporan');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `laporan_${tahun}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Terjadi kesalahan saat membuat laporan.');
            console.error(err);
        }
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
        </div>
    );
}
