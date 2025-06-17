import React from 'react';
import { CalendarDays } from "lucide-react";

const Pelatihan = () => {
  return (
    <div className='md:min-h-screen h-fit pt-20 sm:px-6 px-3 pb-10 bg-no-repeat' style={{backgroundImage: `url(${'/images/bg-pelatihan.png'})`, backgroundPosition: 'center'}}>
      <div className='flex gap-4 mb-7 items-center'>
        <img src="/images/practice.png" alt="" className='w-10' />
        <h1 className='text-xl font-robotoBold'>Pelatihan yang anda ikuti</h1>
      </div>

      <div className='flex lg:justify-between justify-center mx-auto gap-10 lg:gap-20'>
        {/* card */}
        <div className='w-fit'>
          <div className='flex sm:gap-6 gap-2 sm:flex-row flex-col w-fit bg-gradient-to-b shadow-xl from-blue-950 to-blue-900 p-4 rounded-lg mb-10'>
            <h1 className='sm:text-6xl text-5xl font-bold font-radjdhani_bold sm:mb-2 block text-white sm:hidden md:text-left text-center'>PUSKOM</h1>
            <img src="/images/pusbas2.jpg" alt="pusbas image" className='lg:fit h-48 min-w-48 object-cover rounded-xl' />
            <div className='text-white text-nowrap'>
              <h1 className='text-6xl font-bold md:mb-0 mb-2 font-radjdhani_bold sm:block hidden md:-mt-1'>PUSBAS</h1>
              <p className='md:-mt-1'>Anda dalam masa pelatihan</p>
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays className="w-6 h-6 text-white" />
                <span className='sm:text-xl font-semibold text-xl'>1 Januari - 2 Februari 2025</span>
              </div>
              <p className='font-radjdhani_semibold sm:text-2xl sm:text-left text-center text-xl mb-2'>Kelas C (Weekday Offline)</p>
              <button className='bg-yellow-500 px-3 py-2 font-semibold rounded-lg mx-auto block'>Lihat Jadwal</button>
            </div>
          </div>

          <div className='flex sm:gap-6 gap-2 sm:flex-row flex-col md:min-w-[400px] w-fit bg-gradient-to-b shadow-xl from-blue-950 to-blue-900 p-4 rounded-lg mb-10'>
            <h1 className='text-6xl rounded-md font-bold font-radjdhani_bold block sm:hidden text-white sm:mb-2 bg-green'>PUSKOM</h1>
            <img src="/images/office.png" alt="pusbas image" className='min-h-48 min-w-48 max-w-48 object-cover rounded-xl' />
            <div className='text-white text-nowrap'>
              <h1 className='text-6xl font-bold md:mb-0 mb-2 font-radjdhani_bold sm:block hidden md:-mt-1'>PUSKOM</h1>
              <p className='md:-mt-1'>Anda dalam masa pelatihan</p>
              <div className="flex items-center gap-2 mb-1 px-2 py-1 rounded-md">
                <CalendarDays className="w-7 h-7 text-white" />
                <span className='text-xl font-semibold'>Januari - Februari 2025</span>
              </div>
              <p className='font-radjdhani_semibold text-2xl mb-2 text-center'>Kelas C</p>
              <button className='bg-yellow-500 px-3 py-2 font-semibold rounded-lg mx-auto block'>Lihat Jadwal</button>
            </div>
          </div>
        </div>

        {/* ilustrasi */}
        <img src="/images/mhs-with-stroke.png" alt="" className='max-w-[560px] h-auto min-w-56 w-full object-contain lg:block hidden' />
      </div>
    </div>
  )
}

export default Pelatihan