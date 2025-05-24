"use client"
import React, { useState } from 'react';
import "../globals.css";

const Jadwal = () => {
  const [jadwalKelasA, setJadwalKelasA] = useState([
    {
      hari: "Senin",
      tanggal: "01 Januari 2025",
      jamMulai: "13.00",
      jamSelesai: "16.00",
      agenda: "Pelatihan"
    },
    {
      hari: "Selasa",
      tanggal: "02 Januari 2025",
      jamMulai: "13.00",
      jamSelesai: "16.00",
      agenda: "Pelatihan"
    },
    {
      hari: "Rabu",
      tanggal: "03 Januari 2025",
      jamMulai: "13.00",
      jamSelesai: "16.00",
      agenda: "Ujian"
    },
  ]);

  return (
    <div className='min-h-screen py-20 px-6'>
      <div>
        <div className='flex gap-4 mb-7 items-center'>
          <img src="/images/calendar.png" alt="" className='w-10' />
          <h1 className='sm:text-xl text-lg font-robotoBold'>Periode Januari - Februari 2025</h1>
        </div>
        <div className='flex lg:flex-row flex-col lg:px-0 md:px-3 px-2 md:justify-between justify-center gap-4'>
          <div className='w-fit lg:mx-0 mx-auto mb-4'>
            <h1 className='text-2xl font-robotoBold text-center mb-2'>Jadwal Pusbas</h1>
            <div>
              <h1 className='font-semibold bg-yellow-400 px-2 py-1'>Kelas A (Weekend Online)</h1>
              {/* table */}
              <table className='table h-fit w-fit text-center lg:text-nowrap'>
                <thead>
                  <tr className='bg-blue-500 text-white'>
                    <th className='text-center sm:text-base text-[10px]'>Hari</th>
                    <th className='text-center sm:text-base text-[10px]'>Tanggal</th>
                    <th className='text-center sm:text-base text-[10px] lg:px-7'>Jam Mulai</th>
                    <th className='text-center sm:text-base text-[10px] lg:px-7'>Jam Selesai</th>
                    <th className='text-center sm:text-base text-[10px] lg:px-7'>Agenda</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalKelasA.map((item, index) => (
                    <tr key={index}>
                      <td className='text-center sm:text-base text-[10px]'>{item.hari}</td>
                      <td className='text-center sm:text-base text-[10px]'>{item.tanggal}</td>
                      <td className='text-center sm:text-base text-[10px]'>{item.jamMulai}</td>
                      <td className='text-center sm:text-base text-[10px]'>{item.jamSelesai}</td>
                      <td className='text-center sm:text-base text-[10px]'>{item.agenda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className='text-2xl font-robotoBold text-center mb-2'>Jadwal Puskom</h1>
            <div className='w-fit lg:mx-0 mx-auto'>
              <h1 className='font-semibold bg-[#00ff00] px-2 py-1'>Kelas A (Weekend Online)</h1>
              {/* table */}
              <table className='table h-fit w-fit text-center lg:text-nowrap'>
                <thead>
                  <tr className='bg-blue-500 text-white'>
                    <th className='text-center sm:text-base text-[10px]'>Hari</th>
                    <th className='text-center sm:text-base text-[10px] sm:px-7'>Jam Mulai</th>
                    <th className='text-center sm:text-base text-[10px] sm:px-7'>Jam Selesai</th>
                    <th className='text-center sm:text-base text-[10px] sm:px-7'>Agenda</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalKelasA.map((item, index) => (
                    <tr key={index}>
                      <td className='text-center sm:text-base text-[10px]'>{item.hari}</td>
                      <td className='text-center sm:text-base text-[10px]'>{item.jamMulai}</td>
                      <td className='text-center sm:text-base text-[10px]'>{item.jamSelesai}</td>
                      <td className='text-center sm:text-base text-[10px]'>{item.agenda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jadwal;
