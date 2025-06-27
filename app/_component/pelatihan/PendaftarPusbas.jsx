'use client'
import React, { useEffect } from 'react';
import EditPendaftaran from '../EditDataPeserta';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const PendaftarPusbas = () => {

    const { data: session } = useSession();
    const [segment, setSegment] = useState("");
    const [openEdit, setOpenEdit] = useState(false);
    const [pusbasId, setPusbasId] = useState(null);
    const [pesertaId, setPesertaId] = useState(null);

    const getStatus = async () => {
        if (!session?.user?.id) return null;
        try {
            const res = await axios.post("/api/pusbas/peserta/cek-status", {
                id: session?.user?.id,
            });
            setPusbasId(res.data.mahasiswa.peserta.filter(item => item.divisi === "pusbas").map(item => item.id));
        } catch (error) {
            console.error("Failed to fetch status:", error);
        }
    };

    useEffect(() => {
        getStatus();
    }, [])

    const handleEditPesertaPusbas = () => {
        setSegment('pusbas');
        setPesertaId(pusbasId);
        setOpenEdit(true);
    };

    return (
        <div className='flex sm:gap-6 gap-2 sm:flex-row flex-col sm:min-w-[580px] min-w-72 max-w-72 w-full bg-gradient-to-b shadow-xl from-blue-950 to-blue-900 p-4 rounded-lg mb-10'>
            <h1 className='sm:text-6xl text-5xl font-bold font-radjdhani_bold sm:mb-2 block text-white sm:hidden md:text-left text-center'>PUSBAS</h1>
            <img src="/images/pusbas2.jpg" alt="pusbas image" className='lg:fit max-h-48 min-w-48 object-cover rounded-xl' />
            <div className='text-white text-nowrap w-full'>
                <h1 className='text-6xl font-bold font-radjdhani_bold sm:block hidden sm:-mt-1'>PUSBAS</h1>
                <p className='-mt-1 text-center sm:text-base text-lg'>Menunggu Pelatihan Dimulai</p>
                <img src="/images/wait.png" alt="" className='sm:w-16 w-20 mx-auto sm:mt-2 sm:mb-2 mt-3 mb-3' />
                <div className='flex justify-center gap-3'>
                    <a href='https://wa.me/6285655230897' target="_blank" className='bg-wa flex cursor-pointer gap-2 items-center px-3 py-1  w-fit h-fit rounded-md font-radjdhani_bold text-white'>Kontak <img src="/icons/wa.svg" alt="" className='w-5' /></a>
                    <button className='bg-yellow-500 px-3 py-1 font-semibold rounded-lg block' onClick={handleEditPesertaPusbas}>Edit Data</button>
                </div>
            </div>
            <EditPendaftaran isOpen={openEdit} close={() => setOpenEdit(false)} segment={segment} id={pesertaId} />
        </div>
    )
}

export default PendaftarPusbas