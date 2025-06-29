console.log('preload.js script started'); // 确认脚本加载

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 远程数据源URL
const REMOTE_BASE_URL = 'https://raw.githubusercontent.com/idcpj/utools_mirror/refs/heads/master/src/data/';
const REMOTE_DATA_JSON_URL = `${REMOTE_BASE_URL}data.json`;

// 本地数据存储路径
const USER_DATA_PATH = utools.getPath('userData');
const LOCAL_DATA_DIR = path.join(USER_DATA_PATH, 'data');
const LOCAL_DATA_JSON_PATH = path.join(LOCAL_DATA_DIR, 'data.json');

// 确保本地数据目录存在
if (!fs.existsSync(LOCAL_DATA_DIR)) {
  console.log('本地数据目录不存在，创建之。');
  fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
}

/**
 * 检查并从远程更新数据
 */
async function checkAndUpdateData() {
  console.log('开始检查远程数据更新...');
  try {
    // 1. 获取远程 data.json
    const response = await axios.get(REMOTE_DATA_JSON_URL, { timeout: 10000 });
    const remoteDataJson = response.data;
    console.log('成功获取远程 data.json');

    // 2. 读取本地 data.json (进行健壮性处理)
    let localDataJson = null;
    if (fs.existsSync(LOCAL_DATA_JSON_PATH)) {
      try {
        const localDataContent = fs.readFileSync(LOCAL_DATA_JSON_PATH, 'utf-8');
        if(localDataContent) { // 确保文件内容不为空
            localDataJson = JSON.parse(localDataContent);
            console.log('成功解析本地 data.json');
        } else {
            console.log('本地 data.json 为空。');
        }
      } catch (e) {
        console.error('解析本地 data.json 失败:', e);
        localDataJson = null; // 解析失败则视同不存在
      }
    } else {
      console.log('本地 data.json 不存在。');
    }

    // 3. 比较更新时间 (增加兼容性判断)
    const needsUpdate = !localDataJson || !localDataJson.updatetime || remoteDataJson.updatetime > localDataJson.updatetime;

    if (needsUpdate) {
      console.log('发现新版本或本地数据不完整，开始更新...');
      // 4. 下载所有远程文件
      fs.writeFileSync(LOCAL_DATA_JSON_PATH, JSON.stringify(remoteDataJson, null, 2));
      console.log('已保存最新的 data.json');

      const downloadPromises = remoteDataJson.files.map(async (fileInfo) => {
        try {
            const mdUrl = `${REMOTE_BASE_URL}${fileInfo.file}`;
            const mdResponse = await axios.get(mdUrl, { timeout: 10000 });
            const localMdPath = path.join(LOCAL_DATA_DIR, fileInfo.file);
            fs.writeFileSync(localMdPath, mdResponse.data);
            console.log(`已下载并保存 ${fileInfo.file}`);
        } catch (downloadError) {
            console.error(`下载文件 ${fileInfo.file} 失败:`, downloadError);
        }
      });

      await Promise.all(downloadPromises);
      console.log('所有远程文件更新完毕！');
      utools.showNotification('镜像源数据已更新到最新版本！');
    } else {
      console.log('本地数据已是最新，无需更新。');
    }
  } catch (error) {
    console.error('检查或更新数据时发生严重错误:', error.message);
    utools.showNotification('检查更新失败，请检查网络连接'+ error.message);
  }
}

/**
 * 从本地存储或插件包内读取数据
 * @returns {{files: string[], dataDir: string}}
 */
function getData() {
    let dataJson;
    let dataDir;

    // 优先从用户数据目录读取
    if (fs.existsSync(LOCAL_DATA_JSON_PATH)) {
        try {
            const content = fs.readFileSync(LOCAL_DATA_JSON_PATH, 'utf-8');
            if (content) {
                dataJson = JSON.parse(content);
                dataDir = LOCAL_DATA_DIR;
                console.log('从 userData 加载数据成功');
            }
        } catch (e) {
            console.error('从 userData 加载数据失败，将使用默认数据:', e);
        }
    }

    // 如果 userData 读取失败或不存在，则回退到插件包内数据
    if (!dataJson) {
        console.log('从插件目录加载默认数据');
        try {
            const defaultDataJsonPath = path.join(__dirname, 'src/data/data.json');
            if (fs.existsSync(defaultDataJsonPath)) {
                dataJson = JSON.parse(fs.readFileSync(defaultDataJsonPath, 'utf-8'));
                dataDir = path.join(__dirname, 'src/data');
            }
        } catch (e) {
             console.error('加载默认 data.json 也失败了:', e);
        }
    }
    
    // 最终兜底
    if (!dataJson) {
        console.error('未找到任何有效的数据源！');
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
        checkAndUpdateData();

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
    const { dataDir } = getData();
    const filePath = path.join(dataDir, filename);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    const fallbackPath = path.join(__dirname, 'src/data', filename);
    return fs.readFileSync(fallbackPath, 'utf-8');
  } catch (error) {
    console.error(`读取文件 ${filename} 失败:`, error);
    return `# 无法读取文件 ${filename}`;
  }
};

window.getAllData = async () => {
    console.log('React app 请求数据...');
    await checkAndUpdateData();
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