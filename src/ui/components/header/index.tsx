import { useState } from 'react';
import { ProfileUser } from '../../../shared/components/ui/Profile';
import { store } from '../../../app/store';
import { logout } from '../../../app/slices/login';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <h1 className="text-2xl font-bold">Store</h1>
      <div className="flex items-center gap-2">
        <ProfileUser />
        <button onClick={toggleMenu} className="md:hidden">
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute bg-white rounded-md shadow-lg top-16 right-4 md:hidden">
          <button className="block px-4 py-2">Iniciar sesión</button>
        </div>
      )}
    </div>
  );
};
