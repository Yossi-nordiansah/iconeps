'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import { useDispatch } from "react-redux";
import { fetchPeriodes as fetchPeriodesPusbas } from "@/lib/features/kelasSlice";

export default function JadwalPusbas() {
    const { selectedPeriodePusbas } = useSelector((state) => state.kelas)
    const [jadwals, setJadwals] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchJadwal = async () => {
        if (!selectedPeriodePusbas) return;
        setLoading(true);
        try {
            const res = await axios.get(`/api/pusbas/jadwal?periode=${selectedPeriodePusbas}`);
            setJadwals(res.data);
        } catch (err) {
            console.error('Error fetching jadwal:', err);
        } finally {
            setLoading(false);
        }
    };

   useEffect(() => {
        dispatch(fetchPeriodesPusbas());
      }, []);

    useEffect(() => {
        if (selectedPeriodePusbas) {
            fetchJadwal();
        }
    }, [selectedPeriodePusbas]);

    const formatTanggal = (tanggal) => {
        const date = new Date(tanggal);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="relative">
            {loading ? (
                <Loading />
            ) : (
                jadwals
                    .filter((kelas) => kelas.jadwal && kelas.jadwal.length > 0)
                    .map((kelas) => (
                        <div key={kelas.id} className="bg-slate-100 rounded-2xl shadow-md lg:px-5 px-2 py-3 mb-4 hover:shadow-lg transition-shadow duration-300 w-full">
                            <h2 className="text-xl font-robotoBold text-center mb-1">{kelas.nama_kelas}</h2>
                            <p className="text-center text-gray-600 text-sm mb-2">{kelas.tipe_kelas}</p>
                            <table className="table-auto w-full text-sm text-center border border-gray-200">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th>Hari</th>
                                        <th>Tanggal</th>
                                        <th>Jam Mulai</th>
                                        <th>Jam Selesai</th>
                                        <th>Agenda</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kelas.jadwal.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                            <td>{item.hari}</td>
                                            <td>{formatTanggal(item.tanggal)}</td>
                                            <td>{item.jam_mulai}</td>
                                            <td>{item.jam_selesai}</td>
                                            <td>{item.agenda || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
            )}
        </div>
    );
}