# Ruby Gem 代理设置

## 代理

### 设置镜像源

#### Ruby-China 镜像
```bash
# 移除默认源
gem sources --remove https://rubygems.org/

# 添加 Ruby-China 镜像
gem sources -a https://gems.ruby-china.com/

# 查看当前源
gem sources -l
```

#### 清华镜像
```bash
# 移除默认源
gem sources --remove https://rubygems.org/

# 添加清华镜像
gem sources -a https://mirrors.tuna.tsinghua.edu.cn/rubygems/

# 查看当前源
gem sources -l
```

## 还原

### 还原官方源
```bash
# 移除镜像源
gem sources --remove https://gems.ruby-china.com/
# 或
gem sources --remove https://mirrors.tuna.tsinghua.edu.cn/rubygems/

# 添加官方源
gem sources -a https://rubygems.org/

# 查看当前源
gem sources -l
``` 