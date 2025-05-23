"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Ganti useNavigate
import axios from 'axios';

const Login = () => {
    const router = useRouter(); // ✅ Ganti useNavigate

    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                email,
                password,
            });
            alert(response.data.message);

            // ✅ Ganti navigate dengan router.push
            router.push('/admin');
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                alert(error.response.data.message);
            } else {
                alert("Terjadi kesalahan: " + error.message);
            }
        }
    };

    return (
        <div className='fixed inset-0 px-6 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='w-80 bg-white px-3 rounded-xl py-4 shadow-2xl'>
                <h1 className='text-2xl text-center font-bold mb-2'>Login</h1>
                <form onSubmit={handleLogin} className='mx-auto mb-4'>
                    <div className='mx-auto mb-3'>
                        <label htmlFor="email" className='mb-1 block font-semibold'>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id='email'
                            className='w-full px-2 py-1 rounded-md outline-none shadow-2xl border-blue-300 border text-black'
                            required
                        />
                    </div>
                    <div className='mx-auto mb-4'>
                        <label className='mb-1 block font-semibold' htmlFor="password">Password</label>
                        <div className='flex justify-between rounded-md border border-blue-300 overflow-hidden bg-white shadow-2xl'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPasswordButton ? 'text' : 'password'}
                                id='password'
                                required
                                className='w-[85%] px-2 py-1 outline-none bg-transparent text-black'
                            />
                            <div
                                className='w-[15%] cursor-pointer flex justify-center px-2 py-1'
                                onClick={() => setShowPasswordButton(!showPasswordButton)}
                            >
                                <img
                                    className='block'
                                    src={showPasswordButton ? "/icons/showPassword.svg" : "/icons/hidePassword.svg"}
                                    alt="show password"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center gap-5'>
                        <button className='bg-red-700 w-full py-1 rounded font-semibold text-white' type='submit'>Cancel</button>
                        <button className='bg-gradient-to-r from-blue-600 to-blue-900 w-full py-1 rounded font-semibold text-white' type='submit'>Login</button>
                    </div>
                </form>
                <p className='text-sm text-center'>
                    Belum punya akun?{' '}
                    <span
                        className='text-blue-600 font-semibold cursor-pointer'
                        onClick={() => router.push('/registrasi')}
                    >
                        Daftar Sekarang
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
