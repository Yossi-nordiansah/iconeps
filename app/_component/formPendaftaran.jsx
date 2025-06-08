"use client"
import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import PopupLogin from './login';
import axios from 'axios';

const FormPendaftaran = ({ isOpen, close, segment, onSubmitSuccess }) => {

    const popupRef = useRef(null);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const [form, setForm] = useState({
        mahasiswa_id: session?.user?.id,
        status: "pendaftar",
        bukti_pembayaran: "",
        divisi: segment[0].toLowerCase(),
        pilihan_kelas: null, 
        tanggal_pembayaran: "",
        nominal_pembayaran: 0,
        loket_pembayaran: ""
    });

    useEffect(() => {
        if (session?.user?.id) {
            setForm(prev => ({
                ...prev,
                mahasiswa_id: session.user.id
            }));
        }
    }, [session]);

    useEffect(() => {
        if (!session && isOpen) {
            Swal.fire({
                icon: 'warning',
                title: 'Anda Belum Login',
                text: 'Silakan login terlebih dahulu sebelum mendaftar.',
                confirmButtonText: 'Login',
            }).then(() => {
                setIsOpenLogin(true);
                close();
            });
        }
    }, [session, isOpen]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value)
        });

        try {
            await axios.post("/api/pusbas/peserta/create", formData);
            Swal.fire({
                title: 'Pendaftaran Berhasil!',
                text: 'Data berhasil diupload.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            onSubmitSuccess();
            close()
        } catch (error) {
            Swal.fire({
                title: 'Gagal!',
                text: error.response?.data?.error || 'Terjadi kesalahan saat upload.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false)
        }

    }

    if (!isOpen && !isOpenLogin) return null;

    return (
        <div className="fixed inset-0 bg-black px-6 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div
                ref={popupRef}
                className="bg-white sm:p-6 p-3 rounded-lg shadow-lg w-fit border-2 border-yellow-300"
            >
                <h2 className="text-2xl sm:text-nowrap text-center font-robotoBold mb-4 text-blue-950">Form Pendaftaran {segment[0]}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Bukti Pembayaran
                        </label>
                        <input
                            type="file"
                            id="bukti_pembayaran"
                            className="w-full sm:px-4 px-2 py-2 border border-gray-300 rounded-lg"
                            accept=".jpg, .jpeg, .png"
                            required
                            name="bukti_pembayaran"
                            onChange={handleChange}
                        />
                    </div>
                    {
                        segment[0] === 'Pusbas' && <div className="mb-3">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
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

export default FormPendaftaran