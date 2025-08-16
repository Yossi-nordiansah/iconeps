"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UploadLinkGrupWa({ isOpen, periode, close }) {
    const [link, setLink] = useState("");
    const [openEdit, setOpenEdit] = useState(false);

    const fetchLink = async () => {
        try {
            const dataLink = await axios.get(`/api/puskom/pendaftar/link-wa?periode=${periode}`);
            if (dataLink.data.link_grup_wa.length > 0) {
                setOpenEdit(true);
                setLink(dataLink.data.link_grup_wa)
            } else if (dataLink.data.link_grup_wa.length === 0){
                setOpenEdit(false);
                setLink("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLink();
    }, [!!isOpen]);

    const handleSubmit = async () => {
        try {
            await axios.post(`/api/puskom/pendaftar/link-wa?periode=${periode}`, { link });
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
                    {openEdit ? "Edit Link Grup WA" : "Tambah Link Grup WA"}
                </h2>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Masukkan link Grup WA"
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={close} className="px-3 py-2 bg-gray-300 rounded">Batal</button>
                    <button onClick={handleSubmit} className="px-3 py-2 bg-blue-500 text-white rounded">
                        {openEdit ? "Edit Link" : 'Unggah Link'}
                    </button>
                </div>
            </div>
        </div>
    );
}
