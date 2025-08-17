'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import DetailNilaiPuskom from './DetailNilaiPuskom';

const RemidialPuskom = () => {
    const { data: session } = useSession();
    const [nilai, setNilai] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        const fetchSertifikatPath = async () => {
            if (!session?.user?.id) return null;

            try {
                // 1. Ambil ID peserta divisi pusbas
                const statusRes = await axios.post("/api/puskom/peserta/cek-status", {
                    id: session.user.id,
                });

                const pesertaPuskom = statusRes.data?.mahasiswa?.peserta?.find(
                    (item) => item.divisi === "puskom"
                );

                const pesertaId = pesertaPuskom?.id;
                if (!pesertaId) return null;
                const response = await axios.get(`/api/puskom/nilai/${pesertaId}`);
                setNilai(response.data)
            } catch (error) {
                console.error("Failed to fetch sertifikat:", error);
            }
        };

        fetchSertifikatPath();
    }, [session]);

    return (
        <div className='flex sm:gap-6 gap-2 sm:flex-row flex-col sm:min-w-[580px] min-w-72 max-w-72 w-full bg-gradient-to-b shadow-xl from-blue-950 to-blue-900 p-4 rounded-lg mb-10'>
            <h1 className='sm:text-6xl text-5xl font-bold font-radjdhani_bold sm:mb-2 block text-white sm:hidden md:text-left text-center'>PUSKOM</h1>
            <img src="/images/office.png" alt="pusbas image" className='lg:fit max-h-48 min-h-48 min-w-48 object-cover rounded-xl' />
            <div className='text-white text-nowrap w-full'>
                <h1 className='text-6xl font-bold font-radjdhani_bold sm:block hidden sm:-mt-1'>PUSKOM</h1>
                <p className='text-center sm:text-base text-lg'>Anda Tidak Lulus Dalam Ujian</p>
                <img src="/images/gagal.png" alt="Certificate Icon" className='sm:w-14 w-20 mx-auto sm:mt-2 sm:mb-4 mt-3 mb-3' />
                <div className='flex justify-center gap-3'>
                    <a href="https://wa.me/6285655230897" target="_blank" className='bg-wa flex cursor-pointer gap-2 items-center px-3 py-1  w-fit h-fit rounded-md font-radjdhani_bold text-white'>Hubungi Admin <img src="/icons/wa.svg" alt="" className='w-5' /></a>
                    <button className='bg-yellow-500 px-3 py-1 font-semibold rounded-lg block' onClick={() => setOpenDetail(true)}>Lihat Nilai</button>
                </div>
                <DetailNilaiPuskom isOpen={openDetail} close={() => setOpenDetail(false)} data={nilai} />
            </div>
        </div>
    );
};

export default RemidialPuskom;
