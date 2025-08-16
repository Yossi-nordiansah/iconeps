"use client";
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Swal from 'sweetalert2';

export default function LinkUjianForm({ isOpen, data, openEdit, close, onSuccess, segment }) {
    const [link, setLink] = useState("");
    console.log(data)

    useEffect(() => {
        if (data && openEdit) {
            setLink(data.link_ujian || "");
        } else {
            setLink("");
        }
    }, [data, openEdit]);

    const handleSubmit = async () => {
        try {
            if (openEdit) {
                await axios.patch(`/api/${segment}/kelas/${data.id}/ujian`, { link_ujian: link });
            } else {
                await axios.post(`/api/${segment}/kelas/${data.id}/ujian`, { link_ujian: link });
            }
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Mengunggah Link Ujian',
                timer: 2000
            })
            onSuccess();
            close();
        } catch (error) {
            console.error("Gagal simpan link ujian:", error);
            alert("Gagal menyimpan link ujian");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-[400px] shadow">
                <h2 className="text-lg font-bold mb-4">
                    {openEdit ? "Edit Link Ujian" : "Tambah Link Ujian"}
                </h2>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Masukkan link ujian"
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={close} className="px-3 py-2 bg-gray-300 rounded">Batal</button>
                    <button onClick={handleSubmit} className="px-3 py-2 bg-blue-500 text-white rounded">
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
