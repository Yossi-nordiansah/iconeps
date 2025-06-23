'use client'
import React, { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { fetchPeriodes, setSelectedPeriodePuskom } from '../../../lib/features/kelasPuskomSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const JadwalFormPuskom = ({ isOpen, close, data, onSuccess }) => {

  const dispatch = useDispatch()
  const [datakelas, setDataKelas] = useState([]);
  const { selectedPeriodePuskom } = useSelector((state) => state.kelasPuskom);
  const [kelasDipilih, setKelasDipilih] = useState("");

  const getDataKelas = async () => {
    try {
      const res = await axios.get(`/api/puskom/kelas/periode?periode=${selectedPeriodePuskom}`);
      setDataKelas(res.data);
    } catch (err) {
      window.alert(`Gagal fetch data: ${err}`);
      console.log(`selected periode : ${selectedPeriodePuskom}`);
    }
  };

  useEffect(() => {
    dispatch(fetchPeriodes()).then((res) => {
      const periodes = res.payload;
      if (!selectedPeriodePuskom && periodes?.length > 0) {
        dispatch(setSelectedPeriodePuskom(periodes[periodes.length - 1]));
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      setKelasDipilih(data.id);
      setJadwalList(data.jadwal.map(j => ({
        hari: j.hari, 
        jamMulai: j.jam_mulai,
        jamSelesai: j.jam_selesai,
      })));
    }
  }, [data]);

  useEffect(() => {
    if (selectedPeriodePuskom) {
      getDataKelas();
    }
  }, [selectedPeriodePuskom]);

  const [jadwalList, setJadwalList] = useState([
    { hari: '', jamMulai: '', jamSelesai: '' },
  ]);

  const handleAddJadwal = () => {
    setJadwalList([
      ...jadwalList,
      { hari: '', jamMulai: '', jamSelesai: '' },
    ]);
  };

  const handleRemoveJadwal = () => {
    if (jadwalList.length > 1) {
      setJadwalList(jadwalList.slice(0, -1)); 
    }
  };

  if (!isOpen) {
    return null;
  };

  const handleCancel = () => {
    setKelasDipilih("");
    setJadwalList([{ hari: '', jamMulai: '', jamSelesai: ''}]);
    close(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data) {
        await axios.put(`/api/puskom/jadwal/${data.id}`, {
          jadwal: jadwalList
        });
        Swal.fire({ icon: 'success', title: 'Jadwal berhasil diperbarui' });
        onSuccess();
      } else {
        await axios.post('/api/puskom/jadwal', {
          kelasId: kelasDipilih,
          jadwal: jadwalList
        });
        Swal.fire({ icon: 'success', title: 'Jadwal berhasil disimpan' });
      };
      onSuccess();
      handleCancel();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Gagal menyimpan jadwal' });
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...jadwalList];
    updated[index][field] = value;
    setJadwalList(updated);
  };

  return (
    <div className='inset-0 flex justify-center items-center bg-black/50 fixed z-50 h-screen'>
      <form className='p-4 bg-white rounded-xl' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-robotoBold text-center mb-4'>Buat Jadwal</h1>
        <label>Kelas</label>
        <div className='border border-black w-fit px-2 py-1 rounded-md mb-3'>
          <select
            className='outline-none'
            onChange={(e) => setKelasDipilih(e.target.value)}
            value={kelasDipilih}
            disabled={!!data}
          >
            <option value="">Pilih Kelas</option>
            {
              datakelas.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {`${kelas.nama_kelas}`}
                </option>
              ))
            }
          </select>
        </div>

        <div className='max-h-60 overflow-y-auto'>
          <div className='flex flex-col gap-4 mb-3'>
            {jadwalList.map((item, index) => (
              <div key={index} className='flex gap-3'>
                <div>
                  <label>Hari</label>
                  <div className='border border-black w-fit px-2 py-1 rounded-md'>
                    <select
                      className='outline-none px-2 py-1 rounded-md'
                      value={item.hari}
                      onChange={(e) => {
                        const updated = [...jadwalList];
                        updated[index].hari = e.target.value;
                        setJadwalList(updated);
                      }}
                    >
                      <option value="">Pilih Hari</option>
                      <option value="Senin">Senin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Kamis">Kamis</option>
                      <option value="Jum'at">Jum'at</option>
                      <option value="Sabtu">Sabtu</option>
                      <option value="Minggu">Minggu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className='block'>Jam Mulai</label>
                  <input type="text" value={item.jamMulai} className='border border-black py-1 px-2 rounded-md max-w-24' onChange={(e) => handleChange(index, 'jamMulai', e.target.value)} />
                </div>
                <div>
                  <label className='block'>Jam Selesai</label>
                  <input type="text" value={item.jamSelesai} className='border border-black py-1 px-2 rounded-md max-w-24' onChange={(e) => handleChange(index, 'jamSelesai', e.target.value)} />
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
            onClick={handleCancel}
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

export default JadwalFormPuskom;
