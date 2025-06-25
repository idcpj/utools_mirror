const fs = require('fs');
const path = require('path');

window.exports = {
    "mirrors": {
      mode: "list",
      args: {
        // 进入插件应用时调用（可选）
        enter: (action, callbackSetList) => {
          // 读取src/data目录下的所有.md文件
          const dataDir = path.join(__dirname, 'src/data');
          let mdFiles = [];
          
          try {
            // 读取目录
            const files = fs.readdirSync(dataDir);
            // 过滤出.md文件
            mdFiles = files.filter(file => file.endsWith('.md'));
            console.log('找到Markdown文件:', mdFiles);
          } catch (error) {
            console.error('读取目录失败:', error);
          }
          
          // 设置子输入框，让用户可以继续在主搜索框中搜索
          window.utools.setSubInput(({ text }) => {
            // 当用户在子输入框中输入内容时，更新搜索结果
            if (text) {
              // 保存搜索关键词到本地存储，以便在React应用中使用
              localStorage.setItem('utools_search_keyword', text);
              
              // 触发自定义事件，通知React应用更新搜索关键词
              const event = new Event('storage');
              event.key = 'utools_search_keyword';
              event.newValue = text;
              window.dispatchEvent(event);
              
              // 也可以设置全局变量，供React组件使用
              window.searchKeyword = text;
              window.dispatchEvent(new Event('searchKeywordChange'));
              
              // 过滤文件列表
              const keyword = text.toLowerCase();
              const filteredFiles = mdFiles.filter(file => 
                file.toLowerCase().includes(keyword)
              );
              
              // 显示过滤后的列表
              const list = filteredFiles.map(file => {
                // 提取文件名（不含扩展名）作为标题
                const title = file.replace(/\.md$/, '');
                // 高亮显示匹配的文本
                const highlightTitle = title.replace(
                  new RegExp(text, 'gi'),
                  match => `<span style="color: #ff6b00; font-weight: bold;">${match}</span>`
                );
                
                return {
                  title: highlightTitle,
                  description: `${title} 代理设置`,
                  icon: "", // 图标(可选)
                  data: { file }
                };
              });
              
              callbackSetList(list);
            } else {
              // 如果搜索词为空，显示所有文件
              const list = mdFiles.map(file => {
                const title = file.replace(/\.md$/, '');
                return {
                  title,
                  description: `${title} 代理设置`,
                  icon: "", // 图标(可选)
                  data: { file }
                };
              });
              
              callbackSetList(list);
            }
          }, "搜索代理", true);
          
          // 如果有payload，则设置为初始搜索词
          if (action.type === 'over' && action.payload) {
            window.utools.setSubInputValue(action.payload);
            localStorage.setItem('utools_search_keyword', action.payload);
            window.searchKeyword = action.payload;
          }
          
          // 显示所有文件的列表
          const list = mdFiles.map(file => {
            const title = file.replace(/\.md$/, '');
            return {
              title,
              description: `${title} 代理设置`,
              icon: "", // 图标(可选)
              data: { file }
            };
          });
          
          callbackSetList(list);
        },
        
        
        // 用户选择列表中某个条目时被调用
        select: (action, itemData, callbackSetList) => {
          console.log('选择列表项:', itemData);
          
          // 进入插件UI界面，并传递选中的文件
          if (itemData.data && itemData.data.file) {
            // 保存选中的文件到localStorage
            localStorage.setItem('selected_file', itemData.data.file);
            
            // 进入插件UI界面
            window.location.href = 'index.html';
          }
        },
        
        // 子输入框为空时的占位符
        placeholder: "搜索代理",
      },
    },
  };

// 添加一个全局函数，用于从文件系统读取Markdown文件内容
window.readMarkdownFile = (filename) => {
  try {
    const filePath = path.join(__dirname, 'src/data', filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('读取文件失败:', error);
    return `# 无法读取文件 ${filename}\n\n错误信息: ${error.message}`;
  }
};