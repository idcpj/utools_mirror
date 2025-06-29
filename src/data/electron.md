# Electron 镜像代理设置

Electron 在安装时需要下载二进制文件，可以通过设置环境变量来使用国内镜像。

## 临时配置 (推荐)

在 `npm install electron` 命令前加上环境变量即可。

```bash
# 使用淘宝镜像
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/" npm install electron
```

## 写入 .npmrc (项目级)

在你的项目根目录创建一个 `.npmrc` 文件，并写入以下内容：

```
electron_mirror = "https://npmmirror.com/mirrors/electron/"
```

## 全局配置

### npm

```bash
npm config set electron_mirror https://npmmirror.com/mirrors/electron/
```

### yarn

Yarn 会读取 npm 的全局配置，所以上述命令同样对 yarn 有效。

### 环境变量

你也可以将 `ELECTRON_MIRROR` 设置为系统级的永久环境变量，效果相同。
