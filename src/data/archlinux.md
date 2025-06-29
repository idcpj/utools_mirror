# Arch Linux (pacman) 镜像代理设置

Arch Linux 通过编辑 `/etc/pacman.d/mirrorlist` 文件来配置镜像源。同时，为了使用中文社区仓库，还需要在 `/etc/pacman.conf` 中添加 `archlinuxcn` 源。

## 1. 编辑 mirrorlist

打开 `/etc/pacman.d/mirrorlist` 文件 (需要 root 权限)，在文件最顶端添加你偏好的镜像服务器地址。

```
## China
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.aliyun.com/archlinux/$repo/os/$arch
```

## 2. 添加 archlinuxcn 社区源

编辑 `/etc/pacman.conf` 文件 (需要 root 权限)，在文件末尾添加以下内容：

```
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
# 也可以使用其他镜像，如 ustc
# Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

## 3. 安装 keyring 并刷新

完成上述配置后，执行以下命令来安装 `archlinuxcn-keyring` 包并刷新数据库。

```bash
sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring
```
