"use client"
import React, { useEffect, useState } from 'react';
import { CalendarDays } from "lucide-react";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Loading from '../_component/Loading';
import PendaftarPusbas from '../_component/pelatihan/PendaftarPusbas';
import PesertaPusbas from '../_component/pelatihan/PesertaPusbas';
import LulusPusbas from '../_component/pelatihan/LulusPusbas';
import RemidialPusbas from '../_component/pelatihan/RemidialPusbas';
import PendaftarPuskom from '../_component/pelatihan/PendaftarPuskom';
import PesertaPuskom from '../_component/pelatihan/PesertaPuskom';
import LulusPuskom from '../_component/pelatihan/LulusPuskom';
import RemidialPuskom from '../_component/pelatihan/RemidialPuskom';

const Pelatihan = () => {

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [statusPusbas, setStatusPusbas] = useState("");
  const [statusPuskom, setStatusPuskom] = useState("");

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
      <div className='min-h-screen h-fit pt-20 sm:px-6 px-3 pb-10 flex flex-col items-center justify-center text-center bg-no-repeat'>
        <h1 className="text-xl font-semibold mb-4">Anda Belum Registrasi dan Terdaftar Pada Pelatihan Apapun</h1>
        <img src="/images/unregistered.jpg" alt="" className='w-72'/>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
          onClick={() => window.location.href = "/registrasi"} 
        >
          Registrasi Sekarang
        </button>
      </div>
    );
  };

  if (!loading && statusPusbas === "" && statusPuskom === "") {
    return (
      <div className='min-h-screen h-fit pt-20 sm:px-6 px-3 pb-10 flex flex-col items-center justify-center text-center bg-no-repeat'>
        <h1 className="text-xl font-semibold mb-4">Anda Belum Terdaftar Pada Pelatihan Apapun</h1>
        <img src="/images/pelatihanimg.jpg" alt="" className='w-72'/>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
          onClick={() => window.location.href = "/#program"}
        >
          Daftar Sekarang
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
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

          {statusPusbas === 'pendaftar' && <PendaftarPusbas />}
          {statusPusbas === 'peserta' && <PesertaPusbas />}
          {statusPusbas === 'lulus' && <LulusPusbas />}
          {statusPusbas === 'remidial' && <RemidialPusbas />}

          {/* puskom */}
          {statusPuskom === 'pendaftar' && <PendaftarPuskom />}
          {statusPuskom === 'peserta' && <PesertaPuskom />}
          {statusPuskom === 'lulus' && <LulusPuskom />}
          {statusPuskom === 'remidial' && <RemidialPuskom />}

        </div>
        {/* ilustrasi */}
        <img src="/images/mhs-with-stroke.png" alt="" className='max-w-[560px] h-auto min-w-56 w-full object-contain lg:block hidden' />
      </div>
    </div>
  )
}

export default Pelatihan;