// components/EditMahasiswa.tsx
"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function EditPendaftar({ isOpen, close, data, onSave }) {
    const [formData, setFormData] = useState({
        id: "",
        pilihan_kelas: "",
        nominal_pembayaran: "",
        loket_pembayaran: "",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data?.id || "",
                pilihan_kelas: data?.peserta[0].pilihan_kelas || "",
                nominal_pembayaran: data?.peserta[0].nominal_pembayaran || "",
                loket_pembayaran: data?.peserta[0].loket_pembayaran || "",
            });
        };
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await onSave(formData);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
                <Dialog.Panel className="bg-white rounded p-6 w-full max-w-md space-y-4">
                    <Dialog.Title className="text-lg font-semibold">Edit Pendaftar</Dialog.Title>
                    <div className="space-y-3">
                        <select
                            name="pilihan_kelas"
                            value={formData.pilihan_kelas}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="weekend_offline">Weekend Offline</option>
                            <option value="weekday_online">Weekday Online</option>
                            <option value="weekday_offline">Weekday Offline</option>
                        </select>
                        <input
                            type="text"
                            name="nominal_pembayaran"
                            value={formData.nominal_pembayaran}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nominal Pembayaran"
                        />
                        <select
                            name="loket_pembayaran"
                            value={formData.loket_pembayaran}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="BNI">BNI</option>
                            <option value="BMT">BMT</option>
                            <option value="Lainnya">Lainnya..</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={close} className="px-4 py-2 bg-red-500 text-white rounded">Batal</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Ubah Data</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
