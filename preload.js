console.log('preload.js script started'); // 确认脚本加载

const fs = require('fs');
const path = require('path');

/**
 * 从本地插件包内读取数据
 * @returns {{files: string[], dataDir: string}}
 */
function getData() {
    let dataJson;
    const dataDir = path.join(__dirname, 'src/data'); // Always read from plugin package

    try {
        const defaultDataJsonPath = path.join(dataDir, 'data.json');
        if (!fs.existsSync(defaultDataJsonPath)) {
           throw new Error('未找到 data.json 文件！');
        }
        dataJson = JSON.parse(fs.readFileSync(defaultDataJsonPath, 'utf-8'));
        console.log('从插件目录加载数据成功');
    } catch (e) {
         console.error('加载 data.json 失败:', e);
         utools.showNotification('加载 data.json 失败:'+ e.message);
    }
    
    // 最终兜底
    if (!dataJson) {
        console.error('未找到任何有效的数据源！');
        utools.showNotification('未找到任何有效的数据源！');
        return { files: [], dataDir: '' };
    }
    
    return { files: dataJson.files.map(f => f.file), dataDir };
}


// --- uTools 插件入口 ---

window.exports = {
  "mirrors": {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        console.log('插件 enter 事件触发'); // 确认 enter 被调用

        const { files: mdFiles } = getData();

        const list = mdFiles.map(file => {
            const title = file.replace(/\.md$/, '');
            return {
                title,
                description: `${title} 代理设置`,
                icon: "",
                data: { file }
            };
        });
        callbackSetList(list);

        utools.setSubInput(({ text }) => {
          const keyword = text.toLowerCase();
          const filteredFiles = mdFiles.filter(file =>
            file.toLowerCase().includes(keyword)
          );

          const filteredList = filteredFiles.map(file => {
            const title = file.replace(/\.md$/, '');
            return {
              title,
              description: `${title} 代理设置`,
              icon: "",
              data: { file }
            };
          });
          callbackSetList(filteredList);
        }, "搜索代理", true);
      },

      select: (action, itemData, callbackSetList) => {
        if (itemData.data && itemData.data.file) {
          const mirrorId = itemData.data.file.replace(/\.md$/, '');
          localStorage.setItem('selected_mirror_id', mirrorId);
          utools.redirect('代理镜像', '');
        }
      },

      placeholder: "搜索代理",
    },
  },
};

// --- 暴露给渲染进程的 API ---

window.readMarkdownFile = (filename) => {
  try {
    const dataDir = path.join(__dirname, 'src/data'); // Always read from plugin package
    const filePath = path.join(dataDir, filename);
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`读取文件 ${filename} 失败:`, error);
    return `# 无法读取文件 ${filename}`;
  }
};

window.getAllData = async () => {
    console.log('React app 请求数据...');
    const { files, dataDir } = getData();
    return files.map(file => {
        const title = file.replace(/\.md$/, '');
        const content = window.readMarkdownFile(file);
        return {
            id: title,
            title: title,
            content: content
        };
    });
};