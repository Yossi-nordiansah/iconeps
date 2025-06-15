"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { fetchPeriodes } from '../../../lib/features/kelasPusbasSlice'

const KelasForm = ({ isOpen, close, segment, onSuccess, openEdit, selectedKelas }) => {

    const dispatch = useDispatch();
    const [instrukturs, setInstrukturs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama_kelas: "",
        id_instruktur: "",
        divisi: segment,
        periode: ""
    });

    useEffect(() => {
        if (openEdit && selectedKelas) {
            setFormData({
                nama_kelas: selectedKelas.nama_kelas,
                id_instruktur: selectedKelas.instruktur.id,
                tipe_kelas: selectedKelas.tipe_kelas,
                periode: selectedKelas.periode
            })
        };
    }, [openEdit, selectedKelas])

    const getDataInstruktur = async () => {
        try {
            const response = await axios.get("/api/puskom/instruktur");
            console.log(response.data)
            setInstrukturs(response.data);
        } catch (error) {
            console.log(error);
            window.alert(`Gagal mendapatkan data ${error}`)
        }
    };

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        getDataInstruktur();
    }, []);

    if (!isOpen) {
        return null;
    };

    const onCancel = () => {
        setFormData({
            nama_kelas: "",
            id_instruktur: "",
            tipe_kelas: "",
            divisi: "",
            periode: ""
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
            if (formData.id_instruktur === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Instruktur Belum Dipilih",
                    text: "Silakan pilih instruktur terlebih dahulu."
                });
                return null;
            }

            if (segment === "pusbas" && formData.tipe_kelas === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Tipe Kelas Belum Dipilih",
                    text: "Silakan pilih tipe kelas terlebih dahulu."
                });
                return null;
            }

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
                    id_instruktur: "",
                    tipe_kelas: "",
                    divisi: "",
                    periode: ""
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
                <div className='flex flex-col'>
                    <label>Instruktur</label>
                    <div className='border border-black px-2 py-1 rounded-md w-full'>
                        <select className='outline-none w-full' name='id_instruktur' value={formData.id_instruktur} onChange={handleOnChange} required>
                            <option value="">-- Pilih Instruktur --</option>
                            {
                                instrukturs.map((instruktur, index) => (
                                    <option key={index} value={instruktur.id}>{instruktur.nama}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {
                    segment === "pusbas" && <div className='flex flex-col'>
                        <label>Tipe Kelas</label>
                        <div className='border border-black px-2 py-1 rounded-md w-full'>
                            <select className='outline-none w-full' name="tipe_kelas" value={formData.tipe_kelas} onChange={handleOnChange} required>
                                <option value="">-- Pilih Tipe Kelas --</option>
                                <option value="weekend_offline">Weekend (Offline)</option>
                                <option value="weekday_online">Weekday (Online)</option>
                                <option value="weekday_offline">Weekday (Offline)</option>
                            </select>
                        </div>
                    </div>
                }
                <div className='flex flex-col'>
                    <label>Periode</label>
                    <input type="text"
                        value={formData.periode}
                        name="periode"
                        className='border border-black py-1 px-2 rounded-md w-full'
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
