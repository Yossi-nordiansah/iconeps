import PuskomPelatihanLayout from '@/app/_component/puskomPelatihanLayout';

export const metadata = {
  title: 'Pelatihan',
};

export default function Layout({ children }) {
  return (
    <PuskomPelatihanLayout>
        {children}
    </PuskomPelatihanLayout>
  );
}