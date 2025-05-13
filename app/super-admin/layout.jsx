"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const AdminLayout = ({ children }) => {

    const pathName = usePathname()
    const [segment, setSegment] = useState("puskom")

    return (
        <div>
            <div className='absolute z-20 w-full flex bg-secondary py-2 px-5 justify-between items-center'>
                <div className='flex items-center text-white gap-4'>
                    <img src="/images/iconeps_logo.png" alt="" className='w-11' />
                    <h1 className='text-3xl font-robotoBold'>Halaman Super Admin</h1>
                </div>
                <select
                    className='p-2 rounded'
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                >
                    <option value="puskom">PUSKOM</option>
                    <option value="pusbas">PUSBAS</option>
                </select>
            </div>
            {children}
        </div>
    )
}

export default AdminLayout