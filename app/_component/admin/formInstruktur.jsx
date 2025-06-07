"use client"
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Loading';

const InstrukturForm = ({ isOpen, close, segments, onSuccess, openEdit, selectedInstruktur }) => {

    const popupRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        nama: "",
        kontak: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (openEdit && selectedInstruktur) {
            setForm({
                nama: selectedInstruktur.nama || "",
                kontak: selectedInstruktur.kontak || ""
            });
        }
    }, [openEdit, selectedInstruktur]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if (openEdit && selectedInstruktur) {
                await axios.put(`/api/pusbas/instruktur/${selectedInstruktur.id}`, {
                    nama: form.nama,
                    kontak: form.kontak,
                    divisi: segments
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Instruktur Berhasil Diperbarui',
                    showConfirmButton: false,
                    timer: 2000,
                });
                setForm({
                    nama: "",
                    kontak: ""
                });
            } else {
                // TAMBAH
                await axios.post('/api/pusbas/instruktur', {
                    nama: form.nama,
                    kontak: form.kontak,
                    divisi: segments
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Instruktur Berhasil Ditambahkan',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
            onSuccess()
            close();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Instruktur Gagal ditambahkan',
                    text: error.response.data.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registrasi Gagal',
                    text: 'Terjadi kesalahan saat registrasi.',
                });
            }
        } finally {
            setForm({
                nama: "",
                kontak: ""
            });
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        close();
        setForm({
            nama: "",
            kontak: ""
        });
    }

    if (!isOpen) {
        return null;
    };

    return (
        <div className="fixed inset-0 bg-green bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            {
                isSubmitting && <Loading />
            }
            <div
                ref={popupRef}
                className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-yellow-300"
            >
                <h2 className="text-2xl text-center font-robotoBold mb-4 text-blue-950">{openEdit ? 'Edit' : "Tambah"} Instruktur</h2>
                <form onSubmit={handleSubmit} className="space-y-3 w-full ">
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama Lengkap..."
                        value={form.nama}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="kontak"
                        placeholder="Kontak..."
                        value={form.kontak}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                        required
                    />
                    {/* Confirm Password */}
                    <div className='flex gap-4'>
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstrukturForm;

