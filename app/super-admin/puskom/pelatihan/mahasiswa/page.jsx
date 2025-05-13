"use client"
import { Trash2, Pencil, Eye } from "lucide-react";
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState } from "react";

const mahasiswa = [
    {
        nim: "52104110023",
        nama: "Yossi Nordiansah",
        username: "Yossi",
        email: "yossi.nordiansah99@gmail.com",
        password: "87a8uyafaty"
    },
    {
        nim: "52104110001",
        nama: "Rudi Ardiansyah",
        username: "Rudi",
        email: "rudiardiansah@gmail.com",
        password: "89c9cjaI29ihf"
    },
    {
        nim: "52104110002",
        nama: "Imam Fatoni",
        username: "Imam",
        email: "imamfatoni@gmail.com",
        password: "hv eey8103u5 fq"
    }
];

export default function MahasiswaAdmin() {

    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    console.log(pathname)

    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];

    return (
        <div className="p-6">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={()=>router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <UserGroupIcon className="h-5" />
                        <span className="text-base font-semibold">Mahasiswa</span>
                        <span className="text-base font-semibold">40</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="rounded-xl border border-black overflow-hidden flex items-center">
                        <input
                            type="text"
                            placeholder="Cari Mahasiswa..."
                            className="outline-none px-3 py-1 w-64"
                        />
                        <button className="bg-gray-300 p-2">
                            <img src="/icons/search.svg" alt="Search" className="w-5" />
                        </button>
                    </div>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={()=>setIsOpen(true)}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                </div>
            </div>

            {/* Tabel */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mahasiswa.map((mhs, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nim}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nama}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.password}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Trash2 size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Pencil size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Eye size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EmailEditor isOpen={isOpen} segment={lastSegmetst} close={()=>setIsOpen(false)}/>
        </div>
    );
}
