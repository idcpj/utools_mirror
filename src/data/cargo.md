# Rust Cargo 代理设置

## 代理

### 设置镜像源

#### 中国科学技术大学镜像
```bash
# 编辑 ~/.cargo/config 文件
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

#### 清华大学镜像
```bash
# 编辑 ~/.cargo/config 文件
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

## 还原

### 还原官方源
```bash
# 删除 ~/.cargo/config 中的 replace-with 配置
# 或者直接删除 ~/.cargo/config 文件
``` 