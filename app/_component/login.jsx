"use client"
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getSession } from "next-auth/react";
import Swal from 'sweetalert2';

const PopupLogin = ({ isOpen, close }) => {
  const popupRef = useRef(null);
  const [showPasswordButton, setShowPasswordButton] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
  e.preventDefault();

  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.ok) {
    const session = await getSession();
    Swal.fire({
      icon: "success",
      title: "Login Berhasil",
      text: `Selamat datang, ${session?.user?.name || "User"}!`,
    }).then(() => {
      close();
      if (session?.user.role === "admin_puskom") {
        router.push("/admin/pelatihan/puskom");
      } else if (session?.user.role === "admin_pusbas") {
        router.push("/admin/pelatihan/pusbas");
      } else if (session?.user.role === "super_admin") {
        router.push("/super-admin/pelatihan/puskom");
      } else if (session?.user.role === "mahasiswa") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    });
  } else {
    let errorMessage = "Login gagal!";
    if (res?.error === "EMAIL_NOT_FOUND") {
      errorMessage = "Email tidak ditemukan!";
    } else if (res?.error === "INVALID_PASSWORD") {
      errorMessage = "Password salah!";
    }

    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: errorMessage,
    });
  }
};

  return (
    <div className="fixed inset-0 bg-green px-3 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-yellow-300"
      >
        <h2 className="text-2xl text-center font-robotoBold mb-4 text-blue-950">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email..."
              className="w-full px-3 py-2 border rounded-lg pr-10 border-blue-500 outline-blue-400"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPasswordButton ? "text" : "password"}
                name="Password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg pr-10 border-blue-500 outline-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswordButton((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPasswordButton ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
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
