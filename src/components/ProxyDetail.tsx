import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Mirror } from '../types';

interface ProxyDetailProps {
  mirror: Mirror | null;
}

const ProxyDetail: React.FC<ProxyDetailProps> = ({ mirror }) => {

  const copyToClipboard = (code: string) => {
    if (window.utools && window.utools.copyText) {
      window.utools.copyText(code);
      window.utools.showNotification('已复制到剪贴板');
    } else {
      navigator.clipboard.writeText(code);
      alert('已复制到剪贴板');
    }
  };

  if (!mirror) {
    return (
      <section className="flex-1 h-full p-8 flex items-center justify-center text-gray-500">
        <div>请从左侧选择一个镜像类型</div>
      </section>
    );
  }

  return (
    <section className="flex-1 h-full p-4 md:p-8 overflow-y-auto bg-white">
      <div className="prose prose-indigo dark:prose-invert max-w-4xl mx-auto">
        <Markdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeContent = String(children).replace(/\n$/, '');
              return !inline && match ? (
                <div className="relative my-4">
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}>
                    {codeContent}
                  </SyntaxHighlighter>
                  <button
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-50 hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(codeContent)}>
                    复制
                  </button>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}>
          {mirror.content}
        </Markdown>
      </div>
    </section>
  );
};

export default ProxyDetail;