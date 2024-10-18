import { useState } from 'react';
import { ProfileUser } from '../../../shared/components/ui/Profile';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <h1 className="text-2xl font-bold">Store</h1>
      <div className="flex items-center gap-2">
        <button className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center">
          <i className="fas fa-sign-in-alt mr-2"></i> Iniciar sesión
        </button>
        <ProfileUser />
        <button onClick={toggleMenu} className="md:hidden">
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md md:hidden">
          <button className="block px-4 py-2">Iniciar sesión</button>
        </div>
      )}
    </div>
  );
};
