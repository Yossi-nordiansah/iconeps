"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Loading';

const UbahKelas = ({ isOpen, close, selectedPeserta }) => { 

    const { selectedPeriode } = useSelector((state) => state.kelas);
    const [dataKelas, setDataKelas] = useState([]);
    const [loading, setLoading] = useState(false);

    const getDataKelas = async () => {
        try {
            const res = await axios.get(`/api/pusbas/kelas/periode?periode=${selectedPeriode}`);
            setDataKelas(res.data);
        } catch (err) {
            window.alert(`Gagal fetch data: ${err}`);
        }
    };

    useEffect(() => {
        if (selectedPeriode) {
            getDataKelas();
        }
    }, [selectedPeriode]);

    if (!isOpen) return null;

    const onCancel = () => {
        close();
    };

    const onAcceptHandle = async (id) => {
        setLoading(true);

        try {
            await axios.put(`/api/pusbas/peserta/pindah-kelas/${id}`, selectedPeserta);
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: `Pendaftar Berhasil ditambahkan ke Kelas`,
                timer: 3000
            });
            setTimeout(() => {
                onCancel();
            }, 3000);
        } catch (error) {
            console.log(error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal Menambahkan Pendaftar',
                text: error,
                timer: 3000
            })
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='inset-0 flex justify-center items-center bg-black/50 absolute z-50 h-screen'>
            {
                loading && <Loading />
            }
            <form className='p-4 bg-white rounded-xl w-80 space-y-3'>
                <h1 className='text-2xl font-robotoBold text-center mb-2'>Pindah Kelas Peserta</h1>
                <div className='flex flex-col'>
                    <div className='border border-black px-2 py-1 rounded-md w-full max-h-96 overflow-y-auto'>
                        <table className="divide-y divide-gray-200 w-full overflow-hidden">
                            <tbody className="divide-y divide-gray-200 w-56 overflow-x-auto">
                                {dataKelas.map((kls) => (
                                    <tr key={kls.id} className=''>
                                        <td className="px-3 min-w-20 py-4 whitespace-nowrap text-sm text-gray-700">{kls.nama_kelas}</td>
                                        <td className="px-3 min-w-32 w-44 py-4 whitespace-nowrap text-sm text-gray-700">{kls.tipe_kelas}</td>
                                        <td className="px-3 py-4  whitespace-nowrap text-sm text-gray-700">
                                            <button className="p-1 rounded bg-[#00e64d] hover:bg-[#009933] text-white" onClick={() => onAcceptHandle(kls.id)}>
                                                <CheckIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-end gap-6'>
                    <button
                        type="button"
                        onClick={onCancel}
                        className='py-1 px-2 bg-red-600 text-white font-radjdhani_bold rounded-md'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UbahKelas;