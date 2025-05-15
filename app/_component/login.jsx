"use client"
import { useRef, useEffect } from 'react';
import Link from 'next/link';

const PopupLogin = ({ isOpen, close }) => {
  const popupRef = useRef(null);
 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-green px-3 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-yellow-300"
      >
        <h2 className="text-2xl text-center font-robotoBold mb-4 text-blue-950">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className='flex gap-4'>
            <button
              onClick={close}
              type="button"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </div>
          <p className='text-sm text-center mt-5'>Belum punya akun? <Link href={"/registrasi"} onClick={close} className='cursor-pointer text-blue-900 font-robotoBold'>Registrasi Sekarang</Link></p>
        </form>
      </div>
    </div>
  );
};

export default PopupLogin;
