"use client"
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import PopupLogin from '../_component/login';

const Registrasi = () => {
    const router = useRouter()
    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [isOpen, setIsopen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        nama: "",
        email: "", 
        telepon: "",
        fakultas: "",
        prodi: "",
        semester: "",
        nim: "",
        password: "",
        confirmPassword: "",
    });

    const fakultasProdi = {
        "Fakultas Teknik": ["Informatika", "Teknik Sipil", "Teknik Mesin", "Teknik Industri"],
        "Fakultas Ekonomi": ["Manajemen", "Akuntansi"],
        "Fakultas Ilmu Sosial Dan Ilmu Politik": ["Ilmu Pemerintahan", "Ilmu Komunikasi"],
        "Fakultas Agama Islam": ["Pendidikan Agama Islam"],
        "Fakultas Keguruan dan Ilmu Pendidikan": ["Pendidikan Bahasa Indonesia", "Pendidikan Bahasa Inggris", "Pendidikan Matematika", "Pendidikan Kepelatihan Olahraga"],
    };

    const [prodiList, setProdiList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "fakultas") {
            setProdiList(fakultasProdi[value] || []);
            setForm((prev) => ({ ...prev, prodi: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password dan Konfirmasi Password tidak cocok!',
            });
            return null;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/registrasi', {
                nama: form.nama,
                email: form.email,
                telepon: form.telepon,
                fakultas: form.fakultas,
                prodi: form.prodi,
                semester: form.semester,
                nim: form.nim,
                password: form.password,
            });

            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil!',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                router.push("/?showLogin=true");
            });
        } catch (error) {
            console.error("Registrasi error:", error.response.data.message);
            if (error.response && error.response.data && error.response.data.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registrasi Gagal',
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
            setIsSubmitting(false);
        }
    };

    return (

        <div className='lg:min-h-screen pt-20 pb-8 shadow-2xl lg:px-12 md:px-8 px-3 flex justify-between gap-10 items-center'>
            <img src="/images/registrasi.png" alt="" className='min-w-52 lg:w-[420px] drop-shadow-2xl mx-auto sm:block hidden' />
            <div className='lg:max-w-[520px] md:max-w-[450px] w-full md:min-w-96 min-w-64 rounded-xl border-4 border-yellow-300 bg-blue-500/50 px-5 py-3 shadow-xl mx-auto'>
                <h1 className='text-3xl font-robotoBold text-blue-950 mb-3 sm:text-left text-center'>Registrasi</h1>
                <form onSubmit={handleSubmit} className="space-y-3 w-full ">
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama Lengkap"
                        value={form.nama}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Aktif"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                        required
                    />
                    <input
                        type="tel"
                        name="telepon"
                        placeholder="Nomor Telepon / WA"
                        value={form.telepon}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                        required
                        pattern="[0-9]{10,15}"
                    />
                    <div className='flex gap-4'>
                        <div className='bg-white w-full border border-blue-500 px-1 outline-blue-400 rounded-lg'>
                            <select
                                name="fakultas"
                                value={form.fakultas}
                                onChange={handleChange}
                                className={`w-full py-2 rounded-lg outline-none ${form.fakultas ? 'text-black' : 'text-gray-400'}`}
                                required
                            >
                                <option className='px-2'>Fakultas</option>
                                {Object.keys(fakultasProdi).map((fakultas) => (
                                    <option className='text-black px-2' key={fakultas} value={fakultas}>
                                        {fakultas}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='bg-white w-full border border-blue-500 px-1 outline-blue-400 rounded-lg'>
                            <select
                                name="prodi"
                                value={form.prodi}
                                onChange={handleChange}
                                className={`w-full py-2 rounded-lg outline-none ${form.fakultas ? 'text-black' : 'text-gray-400'}`}
                                required
                                disabled={!form.fakultas}
                            >
                                <option value="">Prodi</option>
                                {prodiList.map((prodi) => (
                                    <option className='text-black' key={prodi} value={prodi}>
                                        {prodi}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="number"
                            name="semester"
                            placeholder="Semester"
                            value={form.semester}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                            required
                            min="1"
                        />
                        <input
                            type="text"
                            name="nim"
                            placeholder="NIM"
                            value={form.nim}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                            required
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPasswordButton ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg pr-10 border-blue-500 outline-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordButton((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showPasswordButton ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirmPasswordButton ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg pr-10 border-blue-500 outline-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPasswordButton((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showConfirmPasswordButton ? <FaEye /> : <FaEyeSlash />}
                        </button> 
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 font-robotoBold text-white font-bold py-2 rounded-lg disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Memproses..." : "Registrasi"}
                    </button>
                    <p className="text-center">
                        Sudah punya akun?{" "}
                        <span onClick={() => setIsopen(true)} className="text-blue-700 hover:underline cursor-pointer font-semibold">
                            Login
                        </span>
                    </p>
                </form>
            </div>
            <PopupLogin isOpen={isOpen} close={() => setIsopen(false)} />
        </div>
    )
}

export default Registrasi


