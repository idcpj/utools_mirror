import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProxyDetail from './components/ProxyDetail';
import { Mirror } from './types'; // 假设 types.d.ts 中定义了 Mirror 类型

const App: React.FC = () => {
  const [mirrors, setMirrors] = useState<Mirror[]>([]);
  const [selectedMirror, setSelectedMirror] = useState<Mirror | null>(null);

  useEffect(() => {
    // 从 preload 获取所有数据
    if (window.getAllData) {
      window.getAllData().then((allData: Mirror[]) => {
        setMirrors(allData);
         // 从 localStorage 获取上次选中的文件，或使用第一个作为默认值
      const lastSelectedId = localStorage.getItem('selected_mirror_id');
      const initialMirror = allData.find((m: Mirror) => m.id === lastSelectedId) || allData[0];
      if (initialMirror) {
        setSelectedMirror(initialMirror);
      }
      });

     
    }
  }, []);

  const handleMirrorSelect = (mirror: Mirror) => {
    setSelectedMirror(mirror);
    localStorage.setItem('selected_mirror_id', mirror.id);
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <Sidebar
        mirrors={mirrors}
        selectedMirror={selectedMirror}
        onMirrorSelect={handleMirrorSelect}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProxyDetail mirror={selectedMirror} />
      </div>
    </div>
  );
};

export default App;