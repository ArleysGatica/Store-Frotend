import { Link } from 'react-router-dom';
import { useState } from 'react';
import './styles.scss';
import { PanelRightOpen } from 'lucide-react';

interface SidebarProps {
  links: { name: string; path: string; icon?: string }[];
  className?: string;
}

export const Sidebar = ({ links, className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`container-sidebar  ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 bg-white rounded shadow-md mb-4 transition-transform duration-200 transform hover:scale-105 justify-items-center w-full"
      >
        <PanelRightOpen />
      </button>
      <h2
        className={`text-xl font-bold p-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}
      >
        Lorem ipsum
      </h2>
      <ul
        className={`flex flex-col gap-4 p-4 ${isCollapsed ? 'hidden' : 'flex'}`}
      >
        {links.map((link) => (
          <li
            className="h-10 border-b border-border w-full flex items-center justify-between p-2 hover:bg-gray-200 transition-colors duration-200"
            key={link.name}
          >
            <Link
              className="text-lg font-medium text-black flex items-center gap-2"
              to={link.path}
            >
              {link.icon && <span className="text-xl">{link.icon}</span>}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {isCollapsed && (
        <ul className="flex flex-col gap-2 p-2">
          {links.map((link) => (
            <li key={link.name} className="flex items-center justify-center">
              <Link to={link.path}>{link.icon}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
