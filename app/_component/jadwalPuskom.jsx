'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import { useDispatch } from "react-redux";
import { fetchPeriodes as fetchPeriodesPuskom } from "@/lib/features/kelasPuskomSlice";

export default function JadwalPuskom() {
    const { selectedPeriodePuskom } = useSelector((state) => state.kelasPuskom);
    const [jadwals, setJadwals] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const fetchJadwal = async () => {
        if (!selectedPeriodePuskom) return;
        setLoading(true);
        try {
            const res = await axios.get(`/api/puskom/jadwal?periode=${selectedPeriodePuskom}`);
            setJadwals(res.data);
        } catch (err) {
            console.error('Error fetching jadwal:', err);
        } finally {
            setLoading(false);
        }
    };

      useEffect(() => {
        dispatch(fetchPeriodesPuskom());
      }, []);

    useEffect(() => {
        if (selectedPeriodePuskom) {
            fetchJadwal();
        }
    }, [selectedPeriodePuskom]);

    return (
        <div className="relative ">
            {
                loading ? (<Loading />) :
                    (
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
                                                <th>Jam Mulai</th>
                                                <th>Jam Selesai</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {kelas.jadwal.map((item, index) => (
                                                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                                    <td>{item.hari}</td>
                                                    <td>{item.jam_mulai}</td>
                                                    <td>{item.jam_selesai}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))
                    )
            }
        </div>
    );
}