# YUM 代理设置 (CentOS/RHEL)

## 代理

### 设置镜像源

#### 阿里云镜像
```bash
# 备份原始配置
sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak

# 下载阿里云镜像源配置
# CentOS 7
sudo wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

# CentOS 8
sudo wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo

# 清除缓存并生成新缓存
sudo yum clean all
sudo yum makecache
```

#### 清华镜像
```bash
# 备份原始配置
sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak

# 下载清华镜像源配置
# CentOS 7
sudo wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.tuna.tsinghua.edu.cn/help/centos/7/CentOS-Base-163.repo

# CentOS 8
sudo wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.tuna.tsinghua.edu.cn/help/centos/8/CentOS-Base-163.repo

# 清除缓存并生成新缓存
sudo yum clean all
sudo yum makecache
```

## 还原

### 还原官方源
```bash
# 恢复备份的配置文件
sudo cp /etc/yum.repos.d/CentOS-Base.repo.bak /etc/yum.repos.d/CentOS-Base.repo
sudo yum clean all
sudo yum makecache
``` 