import React from 'react';
import { Mirror } from '../types';

interface SidebarProps {
  mirrors: Mirror[];
  selectedMirror: Mirror | null;
  onMirrorSelect: (mirror: Mirror) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mirrors, selectedMirror, onMirrorSelect }) => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">镜像源设置</h1>
      <nav>
        <ul>
          {mirrors.map(mirror => (
            <li key={mirror.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onMirrorSelect(mirror);
                }}
                className={`block px-4 py-2 rounded-md transition-colors duration-200 ${selectedMirror?.id === mirror.id
                    ? 'bg-blue-600 font-semibold'
                    : 'hover:bg-gray-700'
                  }`}>
                {mirror.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;