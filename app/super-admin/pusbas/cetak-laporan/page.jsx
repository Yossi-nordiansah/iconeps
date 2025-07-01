'use client';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Download } from 'lucide-react';

export default function AdminCetakLaporan() {
    const [tahun, setTahun] = useState('');
    const [listTahun, setListTahun] = useState([]);
    const [previewData, setPreviewData] = useState([]);
    const [excelBlob, setExcelBlob] = useState(null); // Simpan blob untuk tombol download

    useEffect(() => {
        const fetchTahun = async () => {
            const res = await axios.get('/api/pusbas/laporan');
            const tahunArray = res.data.sort((a, b) => b - a);
            setListTahun(tahunArray);
        };

        fetchTahun();
    }, []);

    const handlePreviewLaporan = async () => {
        if (!tahun) {
            alert("Pilih tahun terlebih dahulu.");
            return null;
        }

        try {
            const res = await fetch('/api/pusbas/laporan/cetak', {
                method: 'POST',
                body: JSON.stringify({ tahun }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Gagal ambil laporan');

            const blob = await res.blob();
            setExcelBlob(blob); // Simpan blob untuk nanti diunduh

            // Parse Excel ke JSON untuk preview
            const arrayBuffer = await blob.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            setPreviewData(jsonData);
        } catch (err) {
            alert('Terjadi kesalahan saat membuat preview laporan.');
            console.error(err);
        }
    };

    const handleUnduhLaporan = () => {
        if (!excelBlob || !tahun) return null;

        const url = window.URL.createObjectURL(excelBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `laporan_${tahun}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
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
                    className='px-2 py-1 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition'
                    onClick={handlePreviewLaporan}
                >
                    Buat Laporan
                </button>
            </div>

            <div className='max-h-[350px] min-h-[350px] overflow-y-auto border p-2 rounded'>
                {previewData.length > 0 ? (
                    <div className="overflow-auto">
                        <h2 className="text-lg font-semibold mb-2">Preview Data:</h2>
                        <table className="table-auto border-collapse border w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    {Object.keys(previewData[0]).map((key) => (
                                        <th key={key} className="border p-2">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.map((row, idx) => (
                                    <tr key={idx}>
                                        {Object.values(row).map((val, i) => (
                                            <td key={i} className="border p-2">{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center mt-28">Belum ada preview, pilih tahun dan klik "Buat Laporan".</p>
                )}
            </div>

            <button
                onClick={handleUnduhLaporan}
                disabled={!excelBlob}
                className={`bg-[#39ac73] text-white font-semibold rounded-sm hover:bg-[#40bf80] px-3 py-2 mx-auto mt-4 flex items-center justify-center gap-2 transition ${
                    !excelBlob ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                <Download size={18} />
                Unduh Sebagai File Excel
            </button>
        </div>
    );
}

