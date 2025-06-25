# Docker 代理设置

## 代理

### 设置镜像源

#### 阿里云镜像
```json
// Linux: 在 /etc/docker/daemon.json 中添加
// Windows: 在 Docker Desktop 设置中添加
{
  "registry-mirrors": [
    "https://registry.cn-hangzhou.aliyuncs.com"
  ]
}
```

#### 腾讯云镜像
```json
// Linux: 在 /etc/docker/daemon.json 中添加
// Windows: 在 Docker Desktop 设置中添加
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com"
  ]
}
```

#### 中科大镜像
```json
// Linux: 在 /etc/docker/daemon.json 中添加
// Windows: 在 Docker Desktop 设置中添加
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

## 还原

### 还原官方源
```json
// Linux: 在 /etc/docker/daemon.json 中修改
// Windows: 在 Docker Desktop 设置中修改
{
  "registry-mirrors": []
}
``` 