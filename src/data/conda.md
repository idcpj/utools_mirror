# Conda 镜像代理设置

Conda 通过修改 `.condarc` 配置文件来管理 channel。推荐使用清华大学或中科大的镜像源。

## 清华大学镜像源

```bash
# 添加清华镜像 channel
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/

# 设置搜索时显示 channel 地址
conda config --set show_channel_urls yes
```

## 中科大镜像源

```bash
# 添加中科大镜像 channel
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/

# 设置搜索时显示 channel 地址
conda config --set show_channel_urls yes
```

## 验证和还原

```bash
# 查看当前配置
conda config --show channels

# 清理索引缓存，确保使用的是新 channel
conda clean -i

# 还原到默认配置
conda config --remove-key channels
```
