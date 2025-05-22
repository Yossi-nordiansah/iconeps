"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Puskom = () => {

  const router = useRouter();

    return (
     <div className='flex sm:flex-row flex-col-reverse shadow-2xl overflow-hidden bg-white rounded-tl-[50px] rounded-br-[50px]'>
       <div className='sm:w-1/2'>
         <h1 className='hidden px-6 py-6 text-2xl text-white sm:inline-block font-montserrat_bold bg-blue-950 rounded-ee-3xl'>PUSKOM</h1>
         <div className='px-5 mt-3 sm:mt-10'>
           <p className='text-sm text-justify text-blue-950 sm:text-base sm:text-start font-montserrat_semibold drop-shadow-2xl'>
             PUSKOM adalah unit yang berkegiatan dalam bidang komputer. Pelatihan yang dimiliki oleh PUSKOM adalah pelatihan Microsoft Office yang bekerja sama dengan PT Trust Sebagai rekanan resmi Microsoft Office. Pelatihan ini lebih memusatkan mahasiswa bagaimana bisa membuat laporan, mengolah data, dan dapat mempresentasikan sebuah laporan.
           </p>
           <p className='mt-2 mb-3 text-xl sm:mb-6 sm:mt-6 sm:text-2xl text-blue-950 font-netflixsansbold'>Belajar Microsoft Office dan dapatkan <span className='text-[#ffcc00]'>Sertifikat berstandart Internasional resmi dari Microsoft</span>. Daftar sekarang dan tingkatkan peluangmu di dunia kerja!</p>
           <button onClick={() => router.push("/puskom")} className='px-5 py-3 mb-8 text-white rounded-full sm:mb-10 bg-blue-950 font-montserrat_bold'>
             Lihat Selengkapnya
           </button>
         </div>
       </div>
       <div className='sm:h-auto h-72 sm:w-1/2' style={{ backgroundImage: `url(/images/office.png)`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: "no-repeat" }}>
         <h1 className='inline-block px-6 py-6 text-2xl text-white float-end sm:hidden font-montserrat_bold bg-blue-950 rounded-bl-3xl'>PUSKOM</h1>
       </div>
     </div>
    )
}

export default Puskom