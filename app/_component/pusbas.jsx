"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Pusbas = () => {

  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up" className='flex sm:flex-row flex-col-reverse shadow-2xl overflow-hidden bg-white rounded-tr-[50px] rounded-bl-[50px]'>
      <div className='sm:w-1/2'>
        <h1 className='hidden px-6 py-6 text-2xl text-white sm:inline-block font-montserrat_bold bg-blue-950 rounded-ee-3xl'>PUSBAS</h1>
        <div className='px-5 mt-3 sm:mt-10'>
          <p className='text-sm text-justify text-blue-950 sm:text-base sm:text-start font-montserrat_semibold drop-shadow-2xl'>
            PUSBAS adalah unit yang berkegiatan di bidang bahasa. Pelatihan yang dimiliki oleh PUSBAS adalah pelatihan bahasa Inggris. PUSBAS memiliki tugas agar Mahasiswa di lingkup Universitas Islam Majapahit dapat memiliki kemampuan baik berbicara dalam bahasa Inggris maupun dalam memahami bahasa Inggris
          </p>
          <p className='mt-2 mb-3 text-xl sm:mb-6 sm:mt-6 sm:text-2xl text-blue-950 font-netflixsansbold'>Belajar <span className='text-[#ffcc00]'>dari mana saja</span> dengan  <span className='text-[#ffcc00]'>Mentor berpengalaman</span>. Daftar sekarang dan tingkatkan kemampuan bahasa Inggrismu!</p>
          <button onClick={() => router.push("/pusbas")} className='px-5 py-3 mb-8 text-white rounded-full sm:mb-10 bg-blue-950 font-montserrat_bold'>
            Lihat Selengkapnya
          </button>
        </div>
      </div>
      <div className='sm:h-auto h-72 sm:w-1/2' style={{ backgroundImage: `url(/images/pusbas2.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: "no-repeat" }}>
        <h1 className='inline-block px-6 py-6 text-2xl text-white sm:hidden font-montserrat_bold bg-blue-950 rounded-ee-3xl'>PUSBAS</h1>
      </div>
    </div>
  )
}

export default Pusbas
