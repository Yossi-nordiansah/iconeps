import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminForm = ({ isOpen, close, role }) => {

    const router = useRouter()
    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        nama: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password dan Konfirmasi Password tidak cocok!',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/registrasi', {
                nama: form.nama,
                email: form.email,
                role: form.role
            });

            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil!',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                router.push("/");
            });
        } catch (error) {
            console.error("Registrasi error:", error.response.data.message);

            // Jika ada response dari server (validasi error)
            if (error.response && error.response.data && error.response.data.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registrasi Gagal',
                    text: error.response.data.message, // tampilkan pesan dari server
                });
            } else {
                // Error lain (network, dll)
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

    if (!isOpen) {
        return;
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
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminForm;
