"use client"
import React, { useEffect, useState } from 'react';
import EditPendaftaran from '../EditDataPeserta';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeriodes } from '@/lib/features/kelasPuskomSlice'; // pastikan path sesuai

const PendaftarPuskom = () => {
  const { data: session } = useSession();
  const [segment, setSegment] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [puskomId, setPuskomId] = useState(null);
  const [pesertaId, setPesertaId] = useState(null);
  const [link, setLink] = useState("");
  const [tanggalDaftarPuskom, setTanggalDaftarPuskom] = useState();
  const dispatch = useDispatch();
  const { selectedPeriodePuskom } = useSelector((state) => state.kelasPuskom);

  useEffect(() => {
    if (!selectedPeriodePuskom) {
      dispatch(fetchPeriodes());
    }
  }, [selectedPeriodePuskom, dispatch]);

  const getStatus = async () => {
    if (!session?.user?.id) return null;
    try {
      const res = await axios.post("/api/puskom/peserta/cek-status", {
        id: session?.user?.id,
      });
      setPuskomId(res.data.mahasiswa.peserta.filter(item => item.divisi === "puskom").map(item => item.id));
      const isoString = res.data.mahasiswa.peserta.filter(item => item.divisi === "puskom").map(item => item.tanggal_pendaftaran)[0];
      setTanggalDaftarPuskom(isoString.substring(0, 10));
    } catch (error) {
      console.error("Failed to fetch status:", error);
    }
  };

  const getLinkGrupWa = async () => {
    if (!selectedPeriodePuskom) return;
    try {
      const dataLink = await axios.get(`/api/puskom/pendaftar/link-wa?periode=${selectedPeriodePuskom}`);
      if(dataLink.data.link_grup_wa.length > 0){
          setLink(dataLink.data.link_grup_wa || "");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    getLinkGrupWa();
  }, [selectedPeriodePuskom]);

  const handleEditPesertaPuskom = () => {
    setSegment('puskom');
    setPesertaId(puskomId);
    setOpenEdit(true);
  };

  const getKeteranganPendaftaran = () => {
    if (!tanggalDaftarPuskom) return "Menunggu Pelatihan Dimulai";

    const date = new Date(tanggalDaftarPuskom);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month === 11 || month === 12) {
      return `Anda terdaftar pada program periode I (April - Mei ${year + 1})`;
    }
    if (month === 1 || month === 3) {
      return `Anda terdaftar pada program periode I (April - Mei ${year})`;
    }
    if (month >= 4 && month <= 7) {
      return `Anda terdaftar pada program periode II (Agustus - September ${year})`;
    }
    if (month >= 8 && month <= 10) {
      return `Anda terdaftar pada program periode III (November - Desember ${year})`;
    }
    return "Menunggu Pelatihan Dimulai";
  };

  return (
    <div className='flex sm:gap-6 gap-2 sm:flex-row flex-col sm:min-w-[580px] min-w-72 max-w-72 w-full bg-gradient-to-b shadow-xl from-blue-950 to-blue-900 p-4 rounded-lg mb-10'>
      <h1 className='sm:text-6xl text-5xl font-bold font-radjdhani_bold sm:mb-2 block text-white sm:hidden md:text-left text-center'>PUSKOM</h1>
      <img src="/images/office.png" alt="pusbas image" className='lg:fit max-h-48 min-w-48 object-cover rounded-xl' />
      <div className='text-white text-nowrap w-full'>
        <h1 className='text-6xl font-bold font-radjdhani_bold sm:block hidden sm:-mt-1'>PUSKOM</h1>
        <div className='flex mx-auto justify-center items-center mb-2 sm:gap-2 gap-1'>
          <p className='sm:text-xl text-base sm:font-radjdhani_bold text-center'>Tunggu Waktu Pelatihan Dimulai</p>
          <img src="/images/stopwatch.png" alt="" className='w-7 block' />
        </div>
        <p className='-mt-1 text-center sm:text-base text-lg text-wrap mb-2 sm:px-2'>
          {getKeteranganPendaftaran()}
        </p>
        <div className='flex justify-center gap-3'>
          {link && <a href={link} target="_blank" className='bg-wa flex cursor-pointer gap-2 items-center px-3 py-1  w-fit h-fit rounded-md font-radjdhani_bold text-white'>Gabung grup <img src="/icons/wa.svg" alt="" className='w-5' /></a>}
          <button className='bg-yellow-500 px-3 py-1 font-semibold rounded-lg block' onClick={handleEditPesertaPuskom}>Edit Data</button>
        </div>
      </div>
      <EditPendaftaran isOpen={openEdit} close={() => setOpenEdit(false)} segment={segment} id={pesertaId} />
    </div>
  )
}

export default PendaftarPuskom;
