"use client"
import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import PopupLogin from './login';
import axios from 'axios';

const EditPendaftaran = ({ isOpen, close, segment, id }) => {

    const popupRef = useRef(null);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const [form, setForm] = useState({
        mahasiswa_id: session?.user?.id,
        bukti_pembayaran: "",
        divisi: segment,
        pilihan_kelas: null,
        tanggal_pembayaran: "",
        nominal_pembayaran: 0,
        loket_pembayaran: ""
    });

    const getDataPeserta = async () => {
        try {
            const response = await axios.get(`/api/pusbas/peserta/${id}`);
            const data = response.data;

            // Set ke form agar muncul di input
            setForm({
                mahasiswa_id: data.mahasiswa_id,
                bukti_pembayaran: data.bukti_pembayaran ? `${data.bukti_pembayaran}` : "", // file tidak bisa dimasukkan langsung
                divisi: data.divisi,
                pilihan_kelas: data.pilihan_kelas || "",
                tanggal_pembayaran: data.tanggal_pembayaran || "",
                nominal_pembayaran: data.nominal_pembayaran || 0,
                loket_pembayaran: data.loket_pembayaran || "",
            });
        } catch (error) {
            window.alert(`Gagal Fetch Data ${error.message}`);
        }
    };

    useEffect(() => {
        if (isOpen && id) {
            getDataPeserta();
        }
    }, [isOpen, id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("pilihan_kelas", form.pilihan_kelas);
        formData.append("nominal_pembayaran", form.nominal_pembayaran);
        formData.append("loket_pembayaran", form.loket_pembayaran);
        formData.append("tanggal_pembayaran", form.tanggal_pembayaran);
        formData.append("divisi", form.divisi);

        // hanya kirim file jika user upload baru
        if (form.bukti_pembayaran instanceof File) {
            formData.append("bukti_pembayaran", form.bukti_pembayaran);
        }

        try {
            await axios.put(`/api/pusbas/peserta/edit-peserta-client/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            Swal.fire({
                title: 'Berhasil!',
                text: 'Data berhasil diperbarui.',
                icon: 'success',
            });

            close();
        } catch (error) {
            Swal.fire({
                title: 'Gagal!',
                text: error.response?.data?.error || 'Terjadi kesalahan saat update.',
                icon: 'error',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !id) return null;
    console.log(`id: ${id}`);

    return (
        <div className="fixed inset-0 bg-black px-6 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div
                ref={popupRef}
                className="bg-white sm:px-6 p-3 rounded-lg shadow-lg w-fit border-2 border-yellow-300"
            >
                <h2 className="text-2xl sm:text-nowrap text-center font-robotoBold mb-2 text-blue-950">Edit Data Pendaftaran</h2>
                <form onSubmit={handleSubmit}>
                    {form.bukti_pembayaran && (
                        <div className="mb-2">
                            <a
                                href={form.bukti_pembayaran}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                Lihat Bukti Pembayaran
                            </a>
                        </div>
                    )}
                    <div className='mb-2'>
                        <label htmlFor="pilihan_kelas" className="block text-sm font-medium text-gray-700">
                            Ubah bukti pembayaran
                        </label>
                        <input
                            type="file"
                            id="bukti_pembayaran"
                            name="bukti_pembayaran"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleChange}
                            required={!form.bukti_pembayaran}
                        />
                    </div>
                    {
                        segment === 'pusbas' && <div className="mb-2">
                            <label htmlFor="pilihan_kelas" className="block text-sm font-medium text-gray-700">
                                Pilihan Kelas
                            </label>
                            <select
                                name="pilihan_kelas"
                                onChange={handleChange}
                                className={`w-full py-3 rounded-lg outline-none border`}
                                required
                                value={form.pilihan_kelas || ""}
                            >
                                <option value="" disabled>Pilih Kelas</option>
                                <option value="weekday_offline">Weekday Offline</option>
                                <option value="weekday_online">Weekday Online</option>
                                <option value="weekend_offline">Weekend Offline</option>
                            </select>
                        </div>
                    }
                    <div className="mb-2">
                        <label htmlFor="nominal_pembayaran" className="block text-sm font-medium text-gray-700">
                            Nominal Pembayaran
                        </label>
                        <input
                            type="number"
                            id="nominal_pembayaran"
                            name="nominal_pembayaran"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={form.nominal_pembayaran}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tanggal_pembayaran" className="block text-sm font-medium text-gray-700">
                            Tanggal Pembayaran
                        </label>
                        <input
                            type="date"
                            id="tanggal_pembayaran"
                            name="tanggal_pembayaran"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={form.tanggal_pembayaran}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loket_pembayaran" className="block text-sm font-medium text-gray-700">
                            Loket Pembayaran
                        </label>
                        <select
                            name="loket_pembayaran"
                            value={form.loket_pembayaran}
                            onChange={handleChange}
                            className={`w-full py-3 rounded-lg outline-none border`}
                            required
                        >   {
                                segment[0] === "Pusbas" ? (
                                    <>
                                        <option value="" disabled>Pilih Loket</option>
                                        <option value="BNI">BNI</option>
                                        <option value="BMT">BMT</option>
                                        <option value="lainnya">Lainnya..</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="" disabled>Pilih Loket</option>
                                        <option value="BNI">BNI</option>
                                        <option value="CPA / Bagian Keuangan">CPA / Bagian Keuangan</option>
                                        <option value="lainnya">Lainnya..</option>
                                    </>
                                )
                            }
                        </select>
                    </div>
                    <div className='flex gap-4'>
                        <button
                            onClick={close}
                            type="button"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex justify-center items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : null}
                            {loading ? 'Loading..' : 'Daftar'}
                        </button>
                    </div>
                </form>
            </div>
            {isOpenLogin && (
                <PopupLogin
                    isOpen={isOpenLogin}
                    close={() => setIsOpenLogin(false)}
                />
            )}
        </div>
    )
}

export default EditPendaftaran;