"use client"
import { useRef, useState } from 'react';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getSession } from "next-auth/react";
import Swal from 'sweetalert2';
import Loading from './Loading';

const roleRedirectMap = {
  admin_puskom: "/admin/puskom/pelatihan",
  admin_pusbas: "/admin/pusbas/pelatihan",
  super_admin: "/super-admin/puskom/pelatihan",
  mahasiswa: "/",
};

const PopupLogin = ({ isOpen, close }) => {
  const popupRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      const session = await getSession();
      const user = session?.user;
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang, ${user?.name || "User"}!`,
        timer: 2000
      }).then(() => {
        setIsRedirecting(true);
        close();
        const redirectPath = user?.role === "mahasiswa" ? pathname : roleRedirectMap[user?.role] || "/dashboard";
        router.push(redirectPath);
      });
    } else {
      let errorMessage = "Login gagal!";
      if (res?.error === "EMAIL_NOT_FOUND") errorMessage = "Email tidak ditemukan!";
      else if (res?.error === "INVALID_PASSWORD") errorMessage = "Password salah!";

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: errorMessage,
      });
      setIsLoading(false);
    }
  };

  if (isRedirecting) {
    return (
      <Loading />
    );
  }

  return (
    <div className="fixed inset-0 bg-green bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-yellow-300"
      >
        <h2 className="text-2xl text-center font-robotoBold mb-4 text-blue-950">Login</h2>
        <form onSubmit={handleLogin}>
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordField
            label="Password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
            required
          />

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
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : null}
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <p className='text-sm text-center mt-5'>
            Belum punya akun?{' '}
            <Link href="/registrasi" onClick={close} className='cursor-pointer text-blue-900 font-robotoBold'>
              Registrasi Sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div className="mb-4">
    <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      className="w-full px-3 py-2 border rounded-lg pr-10 border-blue-500 outline-blue-400"
      {...props}
    />
  </div>
); 

const PasswordField = ({ label, value, onChange, showPassword, toggleShowPassword, ...props }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg pr-10 border-blue-500 outline-blue-400"
        {...props}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  </div>
);

export default PopupLogin;
