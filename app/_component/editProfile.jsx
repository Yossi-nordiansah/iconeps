import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';

const EditProfile = ({ isOpen, close, id }) => {

    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-green bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-yellow-300"
            >
                <h1 className='text-3xl font-robotoBold text-blue-950 mb-3 text-center'>Edit Profile</h1>
                <form className="space-y-3 w-full ">
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
                        placeholder="Email"
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
                            disabled={isLoading}
                            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : null}
                            {isLoading ? 'Editing...' : 'Ubah Data'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile