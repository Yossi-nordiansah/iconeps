'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const LulusPuskom = () => {
    const { data: session } = useSession();
    const [linkSertificate, setLinkSertificate] = useState(null);

    useEffect(() => {
        const fetchSertifikatPath = async () => {
            if (!session?.user?.id) return null;

            try {
                const statusRes = await axios.post("/api/puskom/peserta/cek-status", {
                    id: session.user.id,
                });

                const puskomPeserta = statusRes.data.mahasiswa.peserta.find(item => item.divisi === "puskom");

                if (puskomPeserta?.kelas_peserta_kelasTokelas?.link_sertifikat_puskom) {
                    setLinkSertificate(puskomPeserta.kelas_peserta_kelasTokelas.link_sertifikat_puskom);
                };
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
                <p className=' text-center sm:text-base text-lg text-wrap'>Selamat Anda Dinyatakan Lulus Ujian</p>
                <img src="/images/certificate.png" alt="Certificate Icon" className='sm:w-16 w-20 mx-auto sm:mt-2 sm:mb-2 mt-3 mb-3' />
                {linkSertificate && (
                    <div className='flex justify-center gap-3'>
                        <a
                            href={linkSertificate}
                            target='_blank'
                            download
                            className='bg-yellow-500 flex cursor-pointer gap-2 items-center px-3 py-1 w-fit h-fit rounded-md font-radjdhani_bold text-white'
                        >
                            Download Sertifikat
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LulusPuskom;
