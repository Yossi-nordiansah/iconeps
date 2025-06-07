import React from 'react';
import PusbasPelatihanLayout from '@/app/_component/PusbasPelatihanLayout';

export const metadata = {
  title: 'Pelatihan',
};

export default function Layout({ children }) {
  return (
    <PusbasPelatihanLayout>
        {children}
    </PusbasPelatihanLayout>
  );
}