// components/EditMahasiswa.tsx
"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function EditMahasiswa({ isOpen, close, data, onSave }) {
    const [formData, setFormData] = useState({
        id: "",
        nim: "",
        nama: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id,
                nim: data.mahasiswa?.nim || "",
                nama: data.mahasiswa?.nama || "",
                email: data.email || "",
                password: data.password || "",
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log("Simpan diklik"); // ✅ Cek apakah tombol merespon
        await onSave(formData);
        console.log("Data form:", formData);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
                <Dialog.Panel className="bg-white rounded p-6 w-full max-w-md space-y-4">
                    <Dialog.Title className="text-lg font-semibold">Edit Mahasiswa</Dialog.Title>
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="nim"
                            value={formData.nim}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="NIM"
                        />
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nama"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={close} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Simpan</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
