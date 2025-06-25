import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProxyDetail from './components/ProxyDetail';

const App: React.FC = () => {
  // 从localStorage获取初始选中类型，如果没有则使用默认文件
  const [selectedFile, setSelectedFile] = useState<string>(
    localStorage.getItem('selected_file') || 'npm.md'
  );

  // 处理文件选择
  const handleFileSelect = (filename: string) => {
    console.log('选择文件:', filename);
    setSelectedFile(filename);
    localStorage.setItem('selected_file', filename);
  };

  // 设置子输入框
  useEffect(() => {
    if (window.utools && window.utools.setSubInput) {
      window.utools.setSubInput(({ text }) => {
        console.log('子输入框内容变化:', text);
        // 不再进行搜索过滤
      }, "搜索代理", true);
    }
  }, []);

  // 监听 uTools 插件进入事件
  useEffect(() => {
    if (window.utools && window.utools.onPluginEnter) {
      window.utools.onPluginEnter(({ payload }) => {
        console.log('uTools 插件进入事件触发，payload:', payload);
        // 不再处理 payload 作为搜索关键词
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <Sidebar 
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProxyDetail selectedFile={selectedFile} />
      </div>
    </div>
  );
};

export default App; 