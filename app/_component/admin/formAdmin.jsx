import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminForm = ({ isOpen, close, role, data }) => {

    const router = useRouter()
    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const popupRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        nama: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: role
    });

    useEffect(() => {
        if (data) {
            setForm({
                nama: data.admin[0]?.nama || "",
                email: data.email || "",
                password: data.password || "",
                confirmPassword: "",
                role: role
            });
            console.log(data);
        }
    }, [data]);

    useEffect(() => {
        if (isOpen && !data) {
            setForm({
                nama: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: role,
            });
        }
    }, [isOpen, data, role]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data) {
            try {
                await axios.put(`/api/admin/${data.id}`, form)
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Data Berhasil diperbaharui",
                    timer: 2000
                })
                onCancel()
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: `Terjadi Error ${error.message}`,
                    timer: 3000
                })
            }

        } else {
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
                const response = await axios.post('/api/admin/create', {
                    nama: form.nama,
                    email: form.email,
                    password: form.password,
                    role: form.role
                });

                setForm({
                    nama: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: role
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Admin Berhasil Ditambahkan',
                    showConfirmButton: false,
                    timer: 2000,
                });

                close();
            } catch (error) {
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
        }
    };

    const onCancel = () => {
        setForm({
            nama: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        });
        close();
    }

    if (!isOpen) {
        return null;
    };

    console.log(data);

    return (
        <div className="fixed inset-0 bg-green bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div
                ref={popupRef}
                className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-yellow-300"
            >
                <h2 className="text-2xl text-center font-robotoBold mb-4 text-blue-950">{data ? "Edit Data Admin" : "Tambah Admin"}</h2>
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
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg border-blue-500 outline-blue-400"
                        required
                    />
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
                    {
                        !data && <div className="relative">
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
                    }
                    <div className='flex gap-4'>
                        <button
                            onClick={onCancel}
                            type="button"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            {data ? "Edit" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminForm;

