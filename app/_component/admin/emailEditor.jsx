"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2';
import Loading from '../Loading';

const EmailEditor = ({ isOpen, close, segment, recipients }) => {

    const [value, setValue] = useState('');
    const [subject, setSubject] = useState('');
    const [emails, setEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEmails(recipients)
    }, [recipients])

    if (!isOpen) {
        return;
    };

    const sendEmail = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/send-email", {
                penerima: emails || "gagal",
                htmlContent: value,
                subject
            });
            Swal.fire({
                icon: "success",
                title: "Email Berhasil dikirim",
                showConfirmButton: false,
                timer: 2000
            });
            close();
            console.log(emails);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal mengirim Email',
                text: `Terjadi kesalahan saat mengirim email ${error}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='inset-0 bg-black/50 absolute h-screen flex justify-center items-center z-[100]'>
            {
                isLoading && <Loading/>
            }
            <div className='bg-white px-3 py-2 w-[60%] rounded-lg'>
                <h1 className='font-radjdhani_bold text-2xl text-center my-3'>Kirim Email Ke Seluruh {(segment === 'lulus' || segment === 'remidial') ? "Peserta Yang" : ""} {capitalizeFirstLetter(segment)}</h1>
                <input
                    type="text"
                    placeholder='Subject...'
                    className='border border-black px-3 py-2 w-full rounded-md'
                    name='subject'
                    onChange={(e) => setSubject(e.target.value)}
                />
                <ReactQuill
                    value={value}
                    onChange={setValue}
                    className="h-64 border mt-2"
                />
                <div className='flex justify-end gap-3 mt-14'>
                    <button onClick={close} className='bg-red-500 hover:bg-red-400 px-2 py-1 text-white font-radjdhani_bold rounded-md text-lg'>Cancel</button>
                    <button
                        onClick={sendEmail}
                        disabled={isLoading}
                        className={`px-2 py-1 rounded-md text-lg font-radjdhani_bold text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                            }`}
                    >
                        {isLoading ? 'Mengirim...' : 'Kirim'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailEditor;