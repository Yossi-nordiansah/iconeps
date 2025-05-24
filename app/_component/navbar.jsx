"use client"
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PopupLogin from './login';
import { useSession, signOut } from 'next-auth/react';
import Swal from 'sweetalert2';
import EditProfile from './editProfile';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDesktopMenuAccount, setShowDesktopMenuAccount] = useState(false);
  const [showMobileMenuAccount, setShowMobileMenuAccount] = useState(false);
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null)
  const [openEditProfile, setopenEditProfile] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name.charAt(0));
    }

    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  const handleToggle = (setter) => () => setter((prev) => !prev);

  useEffect(() => {
    if (!session && showDesktopMenuAccount) {
      setIsOpen(true);
      setShowDesktopMenuAccount(false);
    }
  }, [session, showDesktopMenuAccount]);

  useEffect(() => {
    const changeBackground = () => setChangeNavbarColor(window.scrollY >= 50);
    window.addEventListener('scroll', changeBackground);

    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  const handleAccount = () => {
    if (!session) {
      setIsOpen(true)
    } else {
      setShowDesktopMenuAccount(!showDesktopMenuAccount)
    }
  };

  const handleMobileAccount = () => {
    if (!session) {
      setIsOpen(true)
    } else {
      setShowMobileMenuAccount(!showMobileMenuAccount)
    }
  }

  return (
    <div className={`fixed z-20 flex items-center justify-between w-full px-5 sm:py-1 py-3 overflow-visible 
      ${pathname != '/' ? 'bg-secondary' : changeNavbarColor ? 'bg-secondary' : 'bg-transparent'}`}>
      <div className='flex items-center gap-2'>
        <img src="/images/iconeps_logo.png" alt="ICONEPS Logo" className='w-8 sm:w-11' />
        <h1 className='text-2xl text-white sm:text-4xl font-robotoBold'>ICONEPS</h1>
      </div>

      <div className='hidden sm:flex items-center text-white font-roboto'>
        {['/', '/jadwal', '/pelatihan'].map((path, index) => (
          <Link key={index} href={path} className={`${pathname === path ? 'text-yellow-400 font-bold' : ""} relative px-4 py-4 group`}>
            <p>{['Home', 'Jadwal', 'Pelatihan'][index]}</p>
            <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 bg-green group-hover:w-full"></div>
          </Link>
        ))}

        {session ? <div className='mx-4 bg-yellow-500 cursor-pointer rounded-full w-[30px] flex justify-center items-center text-xl h-[30px] font-roboto' onClick={handleAccount}>
          {name}
        </div>
          : <button onClick={handleAccount} className="px-4 py-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30px" height="30px" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </button>}

        {/* Desktop Dropdown Menu */}
        {
          session && (
            <div className={`absolute top-16 shadow-2xl z-20 bg-white right-0 transition-transform duration-200 ${showDesktopMenuAccount ? 'translate-x-0' : 'translate-x-40'}`}>
              <div href="/edit-profile" className='flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-200' onClick={() => setopenEditProfile(true)}>
                <img src="/icons/setting.svg" className='w-5' alt="Edit Profil" />
                <p className='text-sm text-black'>Edit Profil</p>
              </div>
              <div className='flex items-center cursor-pointer gap-1 px-4 py-2 hover:bg-gray-200'
                onClick={async () => {
                  const result = await Swal.fire({
                    title: "Keluar dari akun?",
                    text: "Anda akan keluar dari sesi login.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Ya, logout",
                    cancelButtonText: "Batal",
                  });

                  if (result.isConfirmed) {
                    await signOut({ callbackUrl: "/" });
                  }
                }}>
                <img src="/icons/logout.svg" className='w-5' alt="Logout" />
                <p className='text-sm text-black'>Logout</p>
              </div>
            </div>
          )
        }

      </div>

      <img src="/icons/burgerIcon.svg" className='sm:hidden w-8 cursor-pointer' alt="menu icon" onClick={handleToggle(setShowMenu)} />

      <div className={`fixed overflow-x-hidden top-0 right-0 bg-white pt-3 items-center shadow-2xl z-30 duration-500 rounded-bl-3xl ${showMenu ? 'w-44' : 'w-0'}`}>
        <img src="/icons/close.svg" className='w-10 mb-2 ml-4 cursor-pointer' alt="close icon" onClick={handleToggle(setShowMenu)} />

        {['/', '/jadwal', '/pelatihan'].map((path, index) => (
          <Link key={index} href={path} className="px-5 block py-4 text-2xl border-b-2 font-semibold" onClick={handleToggle(setShowMenu)}>
            {['Home', 'Jadwal', 'Pelatihan'][index]}
          </Link>
        ))}

        <div className='font-semibold flex items-baseline gap-2 px-5 py-4 text-2xl cursor-pointer' onClick={handleMobileAccount}>
          {session ? <div className='bg-yellow-500 cursor-pointer rounded-full w-[40px] flex justify-center items-center text-xl h-[40px] font-roboto' onClick={handleAccount}>
            {name}
          </div> : <p>Login</p>}
          <img src="/icons/arrow.svg" className={`w-4 ${showMobileMenuAccount ? 'rotate-180' : 'rotate-90'} duration-100`} alt="arrow icon" />
        </div>

        {/* mobiledropdownmenu */}
        {
          session &&
          <div className={`text-xl overflow-hidden ${showMobileMenuAccount ? 'max-h-96' : 'max-h-0'} duration-200`}>
            <div className='flex items-center gap-1 px-6 py-4 border-y-2' onClick={() => setopenEditProfile(true)}>
              <img src="/icons/setting.svg" alt="Edit Profil" />
              <p className='text-black text-nowrap'>Edit Profil</p>
            </div>
            <div
              onClick={async () => {
                const result = await Swal.fire({
                  title: "Keluar dari akun?",
                  text: "Anda akan keluar dari sesi login.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Ya, logout",
                  cancelButtonText: "Batal",
                });

                if (result.isConfirmed) {
                  await signOut({ callbackUrl: "/" });
                }
              }}
              className='flex items-center gap-1 px-6 py-4'>
              <img src="/icons/logout.svg" alt="Logout" />
              <p className='text-black'>Logout</p>
            </div>
          </div>
        }
      </div>
      <PopupLogin isOpen={isOpen} close={() => setIsOpen(false)} />
      <EditProfile isOpen={openEditProfile} close={() => setopenEditProfile(false)} id={userId} />
    </div>
  );
};

export default Navbar; 
