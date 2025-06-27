"use client"
import React, { useEffect, useState } from 'react';
import { CalendarDays } from "lucide-react";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Loading from '../_component/Loading';
import PendaftarPusbas from '../_component/pelatihan/PendaftarPusbas';
import PesertaPusbas from '../_component/pelatihan/PesertaPusbas';
import LulusPusbas from '../_component/pelatihan/LulusPusbas';

const Pelatihan = () => {

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [statusPusbas, setStatusPusbas] = useState("");
  const [statusPuskom, setStatusPuskom] = useState("");
  const [segment, setSegment] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [puskomId, setPuskomId] = useState(null);
  const [pusbasId, setPusbasId] = useState(null);

  const getStatus = async () => {
    setLoading(true);
    if (!session?.user?.id) return null;
    try {
      const res = await axios.post("/api/pusbas/peserta/cek-status", {
        id: session?.user?.id,
      });
      const pusbasStatus = res.data.mahasiswa.peserta.filter(item => item.divisi === "pusbas").map(item => item.status);
      const puskomStatus = res.data.mahasiswa.peserta.filter(item => item.divisi === "puskom").map(item => item.status);
      setStatusPusbas(`${pusbasStatus}`);
      setStatusPuskom(`${puskomStatus}`);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatus();
  }, [session]);

  if (!session) {
    return (
      <div className='md:min-h-screen h-fit pt-20 sm:px-6 px-3 pb-10 flex flex-col items-center justify-center text-center bg-no-repeat'>
        <h1 className="text-xl font-semibold mb-4">Anda Belum Registrasi dan Terdaftar Pada Pelatihan Apapun</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
          onClick={() => window.location.href = "/#program"} // ganti ke halaman pendaftaran yang sesuai
        >
          Daftar Sekarang
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!loading && statusPusbas === "" && statusPuskom === "") {
    return (
      <div className='md:min-h-screen h-fit pt-20 sm:px-6 px-3 pb-10 flex flex-col items-center justify-center text-center bg-no-repeat'>
        <h1 className="text-xl font-semibold mb-4">Anda Belum Terdaftar Pada Pelatihan Apapun</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
          onClick={() => window.location.href = "/#program"} // ganti ke halaman pendaftaran yang sesuai
        >
          Daftar Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className='md:min-h-screen h-fit pt-20 sm:px-6 px-3 pb-10 bg-no-repeat sm:bg-center bg-bottom' style={{ backgroundImage: `url(${'/images/bg-pelatihan.png'})` }}>
      {
        loading && <Loading />
      }
      <div className='flex gap-4 mb-7 items-center'>
        <img src="/images/practice.png" alt="" className='w-10' />
        <h1 className='text-xl font-robotoBold'>Pelatihan yang anda ikuti</h1>
      </div>

      <div className='flex lg:justify-between justify-center mx-auto gap-10 lg:gap-20'>
        <div className='w-fit'>
          { statusPusbas === 'pendaftar' && <PendaftarPusbas/> }
          { statusPusbas === 'peserta' && <PesertaPusbas /> }
          { statusPusbas === 'lulus' && <LulusPusbas /> }

          {/* puskom */}
          {/* <div className='flex sm:gap-6 gap-2 sm:flex-row flex-col md:min-w-[400px] w-fit bg-gradient-to-b shadow-xl from-blue-950 to-blue-900 p-4 rounded-lg mb-10'>
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
          </div> */}
        </div>


        {/* ilustrasi */}
        <img src="/images/mhs-with-stroke.png" alt="" className='max-w-[560px] h-auto min-w-56 w-full object-contain lg:block hidden' />
      </div>
    </div>
  )
}

export default Pelatihan;