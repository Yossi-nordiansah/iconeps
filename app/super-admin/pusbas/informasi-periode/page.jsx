"use client"
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css'; // Import theme CSS
import Swal from 'sweetalert2';

const InformasiPeriode = () => {

    const [value, setValue] = useState('');

    const getDataText = async () => {
        try {
            const response = await axios.get('/api/pusbas/informasi-periode');
            setValue(response.data.keterangan);
        } catch (error) {
            window.alert(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        getDataText();
    }, []);

    const handleEditText = async () => {
        try {
            await axios.put('/api/pusbas/informasi-periode', { keterangan: value });
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Berhasil Memperbaharui Informasi Periode',
                timer: 2000
            })
        } catch (error) {
            console.error(error);
            alert("Gagal memperbarui informasi.");
        }
    };

    return (
        <div className="pl-52 pr-6 pt-20">
            <h1 className='font-radjdhani_bold text-3xl'>Informasi Periode</h1>
            <ReactQuill
                value={value}
                onChange={setValue}
                className="h-80 border mt-4"
            />
            <button
                onClick={handleEditText}
                className='mt-16 bg-blue-600 px-2 py-1 rounded-md text-md font-radjdhani_bold text-white'>
                Ubah Informasi
            </button>
        </div>
    );
};

export default InformasiPeriode;