"use client"
import { CalendarDays } from "lucide-react";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import React from 'react'

const PesertaPuskom = () => {
;
    const { data: session } = useSession();
    const [periodePuskom, setPeriodePuskom] = useState(null);
    const [tipeKelas, setTipeKelas] = useState(null);
    const [linkUjian, setLinkUjian] = useState(null);

    const getStatus = async () => {
        if (!session?.user?.id) return null;
        try {
            const res = await axios.post("/api/puskom/peserta/cek-status", {
                id: session?.user?.id,
            });
            const puskomPeserta = res.data.mahasiswa.peserta.find(item => item.divisi === "puskom");

            if (puskomPeserta?.kelas_peserta_kelasTokelas?.periode) {
                setPeriodePuskom(puskomPeserta.kelas_peserta_kelasTokelas.periode);
            };

            if (puskomPeserta?.kelas_peserta_kelasTokelas?.nama_kelas) {
                setTipeKelas(puskomPeserta.kelas_peserta_kelasTokelas.nama_kelas);
            };
            
            if (puskomPeserta?.kelas_peserta_kelasTokelas?.link_ujian) {
                setLinkUjian(puskomPeserta.kelas_peserta_kelasTokelas.link_ujian);
            };
        } catch (error) {
            console.error("Failed to fetch status:", error);
        };
    };

    useEffect(() => {
        getStatus();
    }, [session]);

    console.log(tipeKelas)

    return (
        <div className='flex sm:gap-6 gap-2 sm:flex-row flex-col sm:min-w-[580px] min-w-72 max-w-72 w-full bg-gradient-to-b shadow-xl from-blue-950 to-blue-900 sm:p-4 p-3 rounded-lg mb-10'>
            <h1 className='sm:text-6xl text-5xl font-bold font-radjdhani_bold sm:mb-2 block text-white sm:hidden md:text-left text-center'>PUSKOM</h1>
            <img src="/images/office.png" alt="pusbas image" className='lg:fit max-h-48 min-w-48 object-cover rounded-xl' />
            <div className='text-white text-nowrap w-full'>
                <h1 className='text-6xl font-bold font-radjdhani_bold sm:block hidden sm:-mt-1'>PUSKOM</h1>
                <p className='-mt-1 text-center text-lg sm:text-base'>Anda dalam masa pelatihan</p>
                <div className="flex w-full sm:justifty-left justify-center items-center gap-2 mb-1">
                    <CalendarDays className="w-6 h-6 text-white" />
                    <span className='sm:text-xl font-semibold'>{periodePuskom}</span>
                </div>
                <p className='font-radjdhani_semibold sm:text-2xl text-center text-xl mb-2'>{tipeKelas}</p>
                <div className="flex justify-center gap-3 ">
                    <a href="/jadwal" className='bg-yellow-500 px-3 py-2 font-semibold rounded-lg block w-fit'>Lihat Jadwal</a>
                    {
                        linkUjian && <a href={linkUjian} target="_blank" className='bg-yellow-500 px-3 py-2 font-semibold rounded-lg block w-fit'>Link Ujian</a>
                    }
                </div>
            </div>
        </div>
    )
}

export default PesertaPuskom;