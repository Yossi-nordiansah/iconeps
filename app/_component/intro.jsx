"use client"
import React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Intro = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className='relative sm:h-[490px] h-[650px]' data-aos="fade-up">
      <div className='absolute bottom-0 block w-full h-64 md:h-72 md:bg-gradient-to-b from-secondary to-primary'>
        <div className='absolute bottom-0 flex flex-wrap-reverse items-center justify-start md:flex-nowrap'>
          <div className='px-4 py-4 mx-auto xs:px-4 sm:px-10 md:bg-none bg-gradient-to-b from-secondary to-primary md:py-0 lg:mt-44 md:mt-36 sm:mt-0'>
            <h1 className='mb-4 text-2xl text-center text-white xs:text-3xl sm:pt-6 sm:text-left sm:text-4xl text-nowrap md:mb-2 lg:mb-4 font-montserrat_extrabold drop-shadow-2xl'>Apa itu ICONEPS ??</h1>
            <p className='font-bold text-justify text-white lg:text-xl drop-shadow-2x font-montserrat_semibold'>ICONEPS (Institute for Continuing Education and Professional Services) adalah lembaga yang berada dibawah naungan Universitas Islam Majapahit yang memiliki tujuan untuk menciptakan Mahasiswa yang memiliki Soft Skill maupun Hard Skill dibidang bahasa maupun teknologi. ICONEPS sendiri memiliki 2 unit untuk menunjang tujuan dari ICONEPS, yaitu PUSBAS DAN PUSKOM.</p>
          </div>
          <img src='/images/penasaran.png' className='block pr-10 mx-auto w-60 lg:w-[400px] md:w-96 drop-shadow-2xl' alt="montase iconeps" />
        </div>
      </div>
    </div>
  )
}

export default Intro
