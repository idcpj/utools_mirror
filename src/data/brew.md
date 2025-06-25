# Homebrew 代理设置

## 代理

### 设置镜像源

#### 清华镜像
```bash
# 替换 brew.git
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

# 替换 homebrew-core.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# 替换 homebrew-bottles
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

#### 中科大镜像
```bash
# 替换 brew.git
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git

# 替换 homebrew-core.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

# 替换 homebrew-bottles
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

## 还原

### 还原官方源
```bash
# 还原 brew.git
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

# 还原 homebrew-core.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

# 还原 homebrew-bottles
# 删除 ~/.bash_profile 中的 HOMEBREW_BOTTLE_DOMAIN 配置
# 或执行
unset HOMEBREW_BOTTLE_DOMAIN
``` 