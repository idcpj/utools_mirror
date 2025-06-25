# APT 代理设置 (Debian/Ubuntu)

## 代理

### 设置镜像源

#### 阿里云镜像 (Ubuntu)
```bash
# 备份原始配置
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 修改 sources.list
sudo sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
sudo apt update
```

#### 清华镜像 (Ubuntu)
```bash
# 备份原始配置
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 修改 sources.list
sudo sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
sudo apt update
```

#### 阿里云镜像 (Debian)
```bash
# 备份原始配置
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 修改 sources.list
sudo sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list
sudo apt update
```

## 还原

### 还原官方源
```bash
# 恢复备份的配置文件
sudo cp /etc/apt/sources.list.bak /etc/apt/sources.list
sudo apt update
``` 