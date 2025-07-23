"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { fetchPeriodes } from '../../../lib/features/kelasPuskomSlice'

const KelasForm = ({ isOpen, close, segment, onSuccess, openEdit, selectedKelas }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama_kelas: "",
        divisi: segment,
    });

    useEffect(() => {
        if (openEdit && selectedKelas) {
            setFormData({
                nama_kelas: selectedKelas.nama_kelas,
            })
        };
    }, [openEdit, selectedKelas])

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (!isOpen) {
        return null;
    };

    const onCancel = () => {
        setFormData({
            nama_kelas: "",
            divisi: "",
        });
        close();
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (openEdit && selectedKelas) {
            try {
                await axios.put(`/api/puskom/kelas/${selectedKelas.id}`, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Edit Data Kelas Berhasil',
                    timer: 2000
                })
                onSuccess?.();
                onCancel();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Error',
                    text: error,
                    timer: 2000
                });
                onCancel();
            } finally {
                setLoading(false)
            }
        } else {
            try {
                await axios.post("/api/puskom/kelas", formData);
                Swal.fire({
                    icon: "success",
                    title: "Berhasil membuat Kelas",
                    timer: 2000
                });
                dispatch(fetchPeriodes());
                setFormData({
                    nama_kelas: "",
                    divisi: "",
                })
                onSuccess?.();
                close()
            } catch (error) {
                console.log(error);
                window.alert(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className='inset-0 flex justify-center items-center bg-black/50 absolute z-50 h-screen'>
            {
                loading && <Loading />
            }
            <form className='p-4 bg-white rounded-xl w-80 space-y-3' onSubmit={handleOnSubmit}>
                <h1 className='text-2xl font-robotoBold text-center mb-2'>{openEdit ? "Edit" : "Buat"} Kelas</h1>
                <div className='flex flex-col'>
                    <label>Nama Kelas</label>
                    <input
                        type="text"
                        className='border border-black py-1 px-2 rounded-md w-full'
                        value={formData.nama_kelas}
                        name="nama_kelas" 
                        onChange={handleOnChange}
                        required />
                </div>
                <div className='flex justify-end gap-6'>
                    <button
                        type="button"
                        onClick={onCancel}
                        className='py-1 px-2 bg-red-600 text-white font-radjdhani_bold rounded-md'
                    >
                        Cancel
                    </button>
                    <button type='submit' className='py-1 px-2 bg-blue-600 text-white font-radjdhani_bold rounded-md'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KelasForm;
