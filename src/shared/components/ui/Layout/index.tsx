import { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import './styles.scss';
import { Header } from '../../../../ui/components/header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          className="hidden md:block"
          links={[
            {
              name: 'Home',
              path: '/',
              icon: '🏠',
            },
            { name: 'dashboard', path: '/dashboard', icon: '🔗' },
            { name: 'tabla', path: '/tabla', icon: '🔗' },
            { name: 'Sucursales', path: '/warehouse', icon: '🔗' },
            { name: 'Tablabranches', path: '/branches', icon: '🔗' },
            { name: 'Usuarios', path: '/Login', icon: '🔗' },
          ]}
        />
        <div className="container-Layout">{children}</div>
      </div>
    </div>
  );
};
