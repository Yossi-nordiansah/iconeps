"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UploadJadwalRemidial({ isOpen, close }) {
    const [jadwal, setJadwal] = useState("");
    const [openEdit, setOpenEdit] = useState(false);

    const fetchjadwal = async () => {
        try {
            const res = await axios.get(`/api/pusbas/peserta/remidial/jadwal`);
            if (res.data && res.data.jadwal_remidial !== null) {
                setJadwal(res.data.jadwal_remidial);
                setOpenEdit(true);
            } else {
                setOpenEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchjadwal();
    }, [!!isOpen]);

    const handleSubmit = async () => {
        try {
            await axios.post(`/api/pusbas/peserta/remidial/jadwal`, { jadwal });
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Mengunggah Link Grup WA',
                timer: 2000
            })
            // onSuccess();
            close();
        } catch (error) {
            console.error("Gagal simpan link Grup WA:", error);
            alert("Gagal menyimpan link Grup WA");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-[400px] shadow">
                <h2 className="text-lg font-bold mb-4 text-center">
                    {openEdit ? "Edit Jadwal" : "Buat Jadwal"}
                </h2>
                <input
                    type="text"
                    value={jadwal}
                    onChange={(e) => setJadwal(e.target.value)}
                    placeholder="Masukkan Jadwal"
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={close} className="px-3 py-2 bg-gray-300 rounded">Batal</button>
                    <button onClick={handleSubmit} className="px-3 py-2 bg-blue-500 text-white rounded">
                        {openEdit ? "Edit Jadwal" : 'Unggah Jadwal'}
                    </button>
                </div>
            </div>
        </div>
    );
}
