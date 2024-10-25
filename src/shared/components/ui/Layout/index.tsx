import { ReactNode } from 'react';
import './styles.scss';
import { Header } from '../../../../ui/components/header';
import { Sidebar } from '../Sidebar/index';
import { useAppSelector } from '@/app/hooks';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const roleUsers = useAppSelector((state) => state.auth.signIn.user?.role);

  const sidebarLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'dashboard', path: '/dashboard', icon: '🔗' },
    { name: 'tabla', path: '/tabla', icon: '🔗' },
    { name: 'Sucursales', path: '/warehouse', icon: '🔗' },
    { name: 'Categorias', path: '/categories', icon: '🔗' },
    ...(roleUsers === 'root'
      ? [{ name: 'register', path: '/register', icon: '🔗' }]
      : []),
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" links={sidebarLinks} />
        <div className="container-Layout">{children}</div>
        <Toaster />
      </div>
    </div>
  );
};
