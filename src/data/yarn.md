# Yarn 代理设置

## 代理

### 设置镜像源

#### 淘宝镜像
```bash
# 临时使用
yarn add package-name --registry https://registry.npm.taobao.org

# 永久设置
yarn config set registry https://registry.npm.taobao.org
```

#### 华为云镜像
```bash
# 临时使用
yarn add package-name --registry https://mirrors.huaweicloud.com/repository/npm/

# 永久设置
yarn config set registry https://mirrors.huaweicloud.com/repository/npm/
```

## 还原

### 还原官方源
```bash
yarn config set registry https://registry.yarnpkg.com
``` 