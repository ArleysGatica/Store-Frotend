import { Link } from 'react-router-dom';
import { useState } from 'react';
import './styles.scss';

interface SidebarProps {
  links: { name: string; path: string; icon?: string }[];
  className?: string;
}

export const Sidebar = ({ links }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`w-${isCollapsed ? '' : '[280px]'} container-sidebar `}>
      <button onClick={toggleSidebar} className="p-2 bg-white">
        {isCollapsed ? 'Expandir' : 'Colapsar'}
      </button>
      {!isCollapsed && (
        <>
          <h2 className="text-2xl font-bold p-4">Lorem ipsum</h2>
          <ul className="flex flex-col gap-4 p-4 w-full justify-center items-center place-content-center">
            {links.map((link) => (
              <li
                className="h-9 border-b border-border w-[215px] flex items-center justify-center"
                key={link.name}
              >
                <Link
                  className="text-2xl font-bold mb-4 text-black"
                  to={link.path}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {isCollapsed && (
        <ul className="flex flex-col gap-4 p-4 ">
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link?.icon}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
