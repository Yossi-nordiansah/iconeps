"use client"
import React, { useEffect, useState } from 'react'
import FormPendaftaran from '../_component/formPendaftaran';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

const PusbasPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const path = pathname.split('/').filter(Boolean);
    const [divisi, setDivisi] = useState([]);
    const [listed, setListed] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const getStatus = async () => {
            if (!session?.user?.id) return;
            try {
                const res = await axios.post("/api/peserta/cek-status", {
                    id: session?.user?.id,
                });
                const divisi = res.data.mahasiswa.peserta.map((item) => item.divisi);
                setDivisi(divisi);
            } catch (error) {
                console.error("Failed to fetch status:", error);
            }
        };
        getStatus();
    }, [session]);

    const refreshDivisi = async () => {
        if (!session?.user?.id) return;
        try {
            const res = await axios.post("/api/peserta/cek-status", {
                id: session.user.id,
            });
            const divisiBaru = res.data.mahasiswa.peserta.map((item) => item.divisi);
            setDivisi(divisiBaru);
        } catch (error) {
            console.error("Failed to refresh status:", error);
        }
    };

    useEffect(() => {
        if (divisi.includes("pusbas")) {
            setListed(true);
        } else {
            setListed(false);
        }
    }, [divisi]);

    function capitalizeFirstLetter(string) {
        if (string.length === 0) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const segments = path.map(segment => capitalizeFirstLetter(segment));

    return (
        <div className='relative min-h-screen pt-24 pb-14 sm:px-10 px-3 bg-blue-950'>
            <div className='px-2'>
                <div className='relative border-4 border-yellow-300 shadow-2xl border-dashed rounded-3xl w-fit mx-auto h-fit py-4'>
                    <div className='flex justify-center items-start bg-blue-950 sm:p-4 p-2 w-fit h-fit absolute sm:-left-10 -left-6 -top-4'>
                        <img src="/images/period.png" alt="" className='sm:w-16 w-14' />
                    </div>
                    <div>
                        <h1 className='text-yellow-400 font-robotoBold sm:pl-16 pl-12 sm:text-2xl text-xl mb-3'>Periode Pelatihan :</h1>
                        <ol className='text-yellow-400 sm:pl-20 pl-10 pr-4 list-decimal selection:text-lg'>
                            <li>PERIODE 20 JAN- 16 FEB 2025 (Untuk pendaftaran yang diterima  pada 8 Agustus 2024 - 12 Januari 2025)</li>
                            <li>PERIODE 12 MEI- 8 JUNI 2025 (Untuk pendaftaran yang diterima pada 13 Januari 2025 - 4 Mei 2025)</li>
                            <li>PERIODE 11AGUSTUS- 7 SEPTEMBER 2025 (Untuk pendaftaran yang diterima pada 5 Mei 2025 - 4 Agustus 2025)</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className='border-4 border-white h-fit mt-10 flex md:flex-row flex-col rounded-xl overflow-hidden'>
                <div style={{ backgroundImage: `url(/images/pusbas2.jpg)` }} className='md:w-1/2 w-full bg-center md:h-auto bg-cover h-44'></div>
                <div className='py-4 md:px-6 px-3'>
                    <h1 className='text-white font-robotoBold sm:text-2xl text-xl mb-3'>Tahapan Dalam Pelatihan PUSBAS</h1>
                    <ol className='text-white md:pl-5 pl-4 pr-2 list-decimal selection:text-lg md:text-base text-sm'>
                        <li>Pastikan anda sudah melakukan pembayaran sebesar Rp 320.000,-. melalui rekening BNI 678-456-6887 a.n. Universitas Islam Majapahit - PUSBAS.</li>
                        <li>Simpan bukti pembayaran dalam bentuk gambar (difoto/screenshoot).</li>
                        <li>Klik tombol daftar dibawah, isi semua form dengan benar.</li>
                        <li>Setelah melakukan pendaftaran status anda akan muncul pada halaman pelatihan.</li>
                        <li>Pelatihan akan dimulai sesuai dengan periode yang ditentukan.</li>
                        <li>Jumlah pertemuan akan mengikuti kelas yang anda pilih (weekend/weekday).</li>
                        <li>Ujian akan dilakukan satu kali, bagi peserta yang tidak hadir akan dinyatakan gugur/gagal dalam ujian.</li>
                        <li>Peserta yang lulus ujian akan mendapatkan sertifikat yang dapat di download dari website ini.</li>
                        <li>Bagi peserta yang gagal akan mendapat kesempatan untuk remidi sebanyak satu kali.</li>
                        <li>Apabila ada pertanyaan lebih lanjut dapat klik tombol kontak dibawah.</li>
                    </ol>
                    <div className='flex items-start mt-6 flex-wrap justify-center md:gap-5 gap-3 h-fit'>
                        <a href='https://wa.me/6285655230897' target="_blank" className='bg-wa flex cursor-pointer gap-2 items-center px-3 py-2 w-fit h-fit rounded-md font-radjdhani_bold text-white'>Kontak <img src="/icons/wa.svg" alt="" className='w-5' /></a>
                        {
                            listed ? <Link href="/pelatihan" className='shadow-md bg-green px-3 py-2 rounded-md text-white font-radjdhani_bold text-nowrap'>
                                Cek Status
                            </Link>
                                :
                                <button className='shadow-md bg-green px-3 py-2 rounded-md text-white font-radjdhani_bold text-nowrap' onClick={() => setIsOpen(true)}>Daftar Sekarang</button>
                        }
                    </div>
                </div>
            </div>
            <FormPendaftaran isOpen={isOpen} close={() => setIsOpen(false)} segment={segments} onSubmitSuccess={refreshDivisi}/>
        </div>
    )
}

export default PusbasPage