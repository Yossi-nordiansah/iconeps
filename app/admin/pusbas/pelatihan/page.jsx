"use client"
import React from 'react';
import { UserGroupIcon, PencilSquareIcon, PresentationChartBarIcon, AcademicCapIcon, CheckBadgeIcon, ArrowPathIcon, DocumentCheckIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const PelatihanAdminPage = () => {

  const router = useRouter();

  const cards = [
    { title: 'Mahasiswa', value: 40, icon: <UserGroupIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/mahasiswa' },
    { title: 'Kelas', value: 3, icon: <PresentationChartBarIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/kelas' },
    { title: 'Pendaftar', value: 30, icon: <PencilSquareIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/pendaftar' },
    { title: 'Peserta', value: 35, icon: <UsersIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/peserta' },
    { title: 'Nilai', value: 0, icon: <AcademicCapIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/nilai' },
    { title: 'Lulus', value: 0, icon: <CheckBadgeIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/lulus' },
    { title: 'Remidial', value: 0, icon: <ArrowPathIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/remidial' },
    { title: 'Sertifikat', value: 0, icon: <DocumentCheckIcon className="h-20 w-20" />, path: '/admin/pusbas/pelatihan/sertifikat' },
  ];
  return (
    <div className=''>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 mt-8">
        {cards.map((card, index) => (
          <div key={index} onClick={()=>router.push(card.path)} className="flex cursor-pointer items-center justify-between bg-gray-300 rounded-md p-4 shadow-md hover:scale-110 duration-200">
            <div className="text-gray-800">
              {card.icon}
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-2xl font-radjdhani_bold">{card.title}</div>
              {
                card.title === 'Nilai' ? null : (<div className="text-3xl font-radjdhani_bold">{card.value}</div>)
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PelatihanAdminPage