"use client"
import React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Keunggulan = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div data-aos="fade-up" className='flex flex-wrap -mt-2 relative z-10 items-center justify-center gap-4 px-2 py-5 lg:gap-10 bg-gradient-to-b from-secondary to-primary'>
            <div className=''>
                <img src="/icons/flexible.svg" className='block h-16 mx-auto' alt="" />
                <p className='w-48 text-sm font-semibold text-center text-white md:w-fit'>Waktu Fleksibel</p>
            </div>
            <div>
                <img src="/icons/materi_terupdate.svg" className='block h-16 mx-auto' alt="" />
                <p className='text-sm font-semibold text-white'>Materi Terupdate</p>
            </div>
            <div className=''>
                <img src="/icons/work.svg" className='block h-16 mx-auto' alt="" />
                <p className='text-sm font-semibold text-center text-white'>Relevan Dengan Dunia Kerja</p>
            </div>
            <div>
                <img src="/icons/fasilitas.svg" className='block h-16 mx-auto' alt="" />
                <p className='text-sm font-semibold text-white'>Fasilitas Lengkap</p>
            </div>
            <div>
                <img src="/icons/certificate.svg" className='block h-16 mx-auto' alt="" />
                <p className='text-sm font-semibold text-white'>Sertifikat Resmi Microsoft</p>
            </div>
        </div>
    )
}

export default Keunggulan