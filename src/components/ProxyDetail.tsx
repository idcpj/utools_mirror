import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProxyDetailProps {
  selectedFile: string;
}

const ProxyDetail: React.FC<ProxyDetailProps> = ({ selectedFile }) => {
  const [markdown, setMarkdown] = useState<string>('');
  
  // 当选中的文件变化时，加载对应的Markdown内容
  useEffect(() => {
    if (!selectedFile) {
      setMarkdown('');
      return;
    }
    
    console.log('加载文件:', selectedFile);
    
    // 使用preload.js中定义的readMarkdownFile函数读取文件内容
    if (window.readMarkdownFile) {
      try {
        const content = window.readMarkdownFile(selectedFile);
        setMarkdown(content);
      } catch (error) {
        console.error('读取文件失败:', error);
        setMarkdown(`# 读取文件失败\n\n无法读取文件 ${selectedFile}`);
      }
    } else {
      // 如果readMarkdownFile函数不可用，则使用fetch
      fetch(`/src/data/${selectedFile}`)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`无法加载文件: ${selectedFile}`);
          }
        })
        .then(content => {
          setMarkdown(content);
        })
        .catch(error => {
          console.error('加载文件出错:', error);
          setMarkdown(`# 加载文件出错\n\n${error.message}`);
        });
    }
  }, [selectedFile]);
  
  // 复制代码到剪贴板
  const copyToClipboard = (code: string) => {
    if (window.utools && window.utools.copyText) {
      window.utools.copyText(code);
      window.utools.showNotification('已复制到剪贴板');
    } else {
      navigator.clipboard.writeText(code);
      alert('已复制到剪贴板');
    }
  };
  
  // 改进的Markdown渲染函数
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    
    return (
      <Markdown 
        components={{
          code({className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeContent = String(children).replace(/\n$/, '');
            
            if (!props.inline && language) {
              return (
                <div className="relative">
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                  >
                    {codeContent}
                  </SyntaxHighlighter>
                  <button 
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-70 hover:opacity-100"
                    onClick={() => copyToClipboard(codeContent)}
                  >
                    复制
                  </button>
                </div>
              );
            }
            return <code className={className} {...props}>{children}</code>;
          }
        }}
      >
        {text}
      </Markdown>
    );
  };
  
  if (!selectedFile) {
    return <section className="flex-1 h-full p-8 text-gray-400">请选择左侧代理类型</section>;
  }
  
  return (
    <section className="flex-1 h-full p-4 md:p-8 overflow-auto">
      {markdown ? (
        <div className="markdown-content max-w-4xl mx-auto">
          {renderMarkdown(markdown)}
        </div>
      ) : (
        <div className="text-gray-500 flex items-center justify-center h-full">
          <div className="animate-pulse">加载中...</div>
        </div>
      )}
    </section>
  );
};

export default ProxyDetail; 