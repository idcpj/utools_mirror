import React from 'react';

interface SidebarProps {
  onFileSelect: (filename: string) => void;
  selectedFile: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onFileSelect, selectedFile }) => {
  // 文件列表
  const files = [
    { id: 'npm.md', name: 'NPM' },
    { id: 'pip.md', name: 'PIP' },
    { id: 'go.md', name: 'Go' },
    { id: 'cargo.md', name: 'Rust Cargo' },
    { id: 'maven.md', name: 'Java Maven' },
    { id: 'gradle.md', name: 'Gradle' },
    { id: 'apt.md', name: 'APT (Debian/Ubuntu)' },
    { id: 'yum.md', name: 'YUM (CentOS/RHEL)' },
    { id: 'brew.md', name: 'Homebrew' },
    { id: 'gem.md', name: 'Ruby Gem' },
    { id: 'composer.md', name: 'PHP Composer' },
    { id: 'nuget.md', name: '.NET NuGet' },
    { id: 'docker.md', name: 'Docker' },
    { id: 'yarn.md', name: 'Yarn' }
  ];

  return (
    <aside className="max-w-[200px] h-full bg-gray-800 text-white p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">代理设置</h2>
      <ul className="w-full">
        {files.map(file => (
          <li 
            key={file.id}
            className={`
              mb-2 p-2 rounded cursor-pointer w-full
              ${selectedFile === file.id ? 'bg-blue-600' : 'hover:bg-gray-700'}
            `}
            onClick={() => onFileSelect(file.id)}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar; 