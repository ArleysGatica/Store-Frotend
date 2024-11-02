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
    {
      name: 'INICIO',
      path: '/',
      icon: '🏠',
    },
    ...(roleUsers === 'root'
      ? [{ name: 'SUCURSALES', path: '/branches', icon: '🏭' }]
      : []),
    { name: 'PRODUCTOS', path: '/products', icon: '📱' },
    { name: 'CATEGORÍAS', path: '/categories', icon: '🧮' },
    { name: 'Descuentos', path: '/DiscountManager', icon: '〽️' },
    { name: 'PEDIDOS', path: '/orders', icon: '📃' },
    ...(roleUsers === 'root' || roleUsers === 'admin'
      ? [{ name: 'USUARIOS', path: '/register', icon: '👤' }]
      : []),
  ];

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="hidden capitalize md:block" links={sidebarLinks} />

        <div className="container-Layout">{children}</div>
        <Toaster />
      </div>
    </div>
  );
};
