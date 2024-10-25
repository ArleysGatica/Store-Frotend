import { ReactNode } from 'react';
import './styles.scss';
import { Header } from '../../../../ui/components/header';
import { Sidebar } from '../Sidebar/index';
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          className="hidden capitalize md:block"
          links={[
            {
              name: 'INICIO',
              path: '/',
              icon: '🏠',
            },
            { name: 'USUARIOS', path: '/register', icon: '👤' },
            { name: 'SUCURSALES', path: '/warehouse', icon: '🏭' },
            { name: 'PRODUCTOS', path: '/branches', icon: '📱' },
            { name: 'PEDIDOS', path: '/orders', icon: '📃' },
          ]}
        />

        <div className="container-Layout">{children}</div>
      </div>
    </div>
  );
};
