'use client'
import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import JadwalForm from '@/app/_component/admin/jadwalForm';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdminJadwal() {
  const [isOpen, setIsOpen] = useState(false);
  const [jadwals, setJadwals] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const res = await axios.get('/api/pusbas/jadwal');
      setJadwals(res.data);
    } catch (err) {
      console.error('Error fetching jadwal:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data jadwal yang dihapus tidak bisa dikembalikan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/pusbas/jadwal/${id}`);
        fetchJadwal();
        Swal.fire('Terhapus!', 'Jadwal berhasil dihapus.', 'success');
      } catch (err) {
        console.error('Failed to delete:', err);
        Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus.', 'error');
      }
    }
  };


  const handleEditKelas = (kelas) => {
    setDataToEdit(kelas);
    setIsOpen(true);
  };

  const onSuccess = () => {
    fetchJadwal();
  }

  return (
    <div className="relative pl-52 pr-6 pt-20">
      <h1 className="text-2xl font-semibold mb-4">Jadwal</h1>
      <button className="bg-green text-white text-xl font-radjdhani_bold border rounded px-3 py-1 mb-4 flex items-center gap-2" onClick={() => setIsOpen(true)}>
        Buat Jadwal <Plus size={16} />
      </button>
      <div className='max-h-[390px] overflow-y-auto'>
        {jadwals
          .filter((kelas) => kelas.jadwal && kelas.jadwal.length > 0)
          .map((kelas) => (
            <div key={kelas.id} className="mb-6">
              <div className="mb-2 flex items-center gap-2 w-11/12 mx-auto">
                <h1 className="font-radjdhani_bold text-xl">
                  {kelas.nama_kelas} ({kelas.tipe_kelas})
                </h1>
                <button
                  onClick={() => handleEditKelas(kelas)}
                  className="text-white px-2 rounded-md py-1 bg-[#00b33c] hover:bg-[#00cc44] text-sm"
                >Edit Jadwal</button>
              </div>
              <div className="bg-white rounded-lg shadow overflow-hidden w-11/12 mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hari</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jam Mulai</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jam Selesai</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agenda</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kelas.jadwal
                      .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                      .map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.hari}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{new Date(item.tanggal).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.jam_mulai}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.jam_selesai}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.agenda}</td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <button className="bg-green-500 hover:bg-green-400 text-white px-2 py-1 rounded text-xs mr-2">
                              <Pencil size={14} className="inline mr-1" /> Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded text-xs">
                              <Trash2 size={14} className="inline mr-1" /> Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>

      <JadwalForm isOpen={isOpen} close={() => {
        setIsOpen(false);
        setDataToEdit(null);
      }} data={dataToEdit}
      onSuccess={onSuccess} />
    </div>
  );
}