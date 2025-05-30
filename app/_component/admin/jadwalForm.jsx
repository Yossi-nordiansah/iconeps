import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const JadwalForm = ({ isOpen, close }) => {
  const [jadwalList, setJadwalList] = useState([
    { hari: '', tanggal: '', jamMulai: '', jamSelesai: '', agenda: '' },
  ]);

  const handleAddJadwal = () => {
    setJadwalList([
      ...jadwalList,
      { hari: '', tanggal: '', jamMulai: '', jamSelesai: '', agenda: '' },
    ]);
  };

  const handleRemoveJadwal = () => {
    if (jadwalList.length > 1) {
      setJadwalList(jadwalList.slice(0, -1)); // hapus elemen terakhir
    }
  };

  if(!isOpen){
    return;
  }

  return (
    <div className='inset-0 flex justify-center items-center bg-black/50 fixed z-50 h-screen'>
      <form className='p-4 bg-white rounded-xl'>
        <h1 className='text-2xl font-robotoBold text-center mb-4'>Buat Jadwal</h1>

        <label>Kelas</label>
        <div className='border border-black w-fit px-2 py-1 rounded-md mb-3'>
          <select className='outline-none'>
            <option value="">Kelas A (Weekend Online)</option>
            <option value="">Kelas B (Weekday Offline)</option>
          </select>
        </div>

        <div className='max-h-60 overflow-y-auto'>
          <div className='flex flex-col gap-4 mb-3'>
            {jadwalList.map((_, index) => (
              <div key={index} className='flex gap-3'>
                <div>
                  <label>Hari</label>
                  <div className='border border-black w-fit px-2 py-1 rounded-md'>
                    <select className='outline-none'>
                      <option value="">Senin</option>
                      <option value="">Selasa</option>
                      <option value="">Rabu</option>
                      <option value="">Kamis</option>
                      <option value="">Jum'at</option>
                      <option value="">Sabtu</option>
                      <option value="">Minggu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className='block'>Tanggal</label>
                  <input type="date" className='border border-black py-1 px-2 rounded-md max-w-44' />
                </div>
                <div>
                  <label className='block'>Jam Mulai</label>
                  <input type="text" className='border border-black py-1 px-2 rounded-md max-w-24' />
                </div>
                <div>
                  <label className='block'>Jam Selesai</label>
                  <input type="text" className='border border-black py-1 px-2 rounded-md max-w-24' />
                </div>
                <div>
                  <label>Agenda</label>
                  <div className='border border-black px-2 py-1 rounded-md w-fit'>
                    <select className='outline-none'>
                      <option value="">Pelatihan</option>
                      <option value="">Ujian</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex gap-2 mb-3'>
          <button
            type="button"
            onClick={handleAddJadwal}
            className='p-1 text-white bg-green rounded-lg'
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            onClick={handleRemoveJadwal}
            className='p-1 text-white bg-red-600 rounded-lg'
          >
            <Minus size={16} />
          </button>
        </div>

        <div className='flex justify-end gap-6'>
          <button
            type="button"
            onClick={close}
            className='py-1 px-2 bg-red-600 text-white font-radjdhani_bold rounded-md'
          >
            Cancel
          </button>
          <button className='py-1 px-2 bg-blue-600 text-white font-radjdhani_bold rounded-md'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default JadwalForm;
