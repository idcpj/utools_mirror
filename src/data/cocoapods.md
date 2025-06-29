# CocoaPods 镜像代理设置

CocoaPods 的镜像设置主要通过修改 `Podfile` 或直接替换 `spec` 仓库源来实现。

## 推荐方式 (编辑 Podfile)

对于 CocoaPods 1.8.0 及以上版本，推荐在项目的 `Podfile` 文件顶部添加 `source` 指向。

```ruby
# 清华大学镜像源
source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'

# platform :ios, '9.0'
target 'MyApp' do
  # ... other pods
end
```

## 替换全局 Spec 仓库

这种方式会修改全局的配置，对所有项目生效。

```bash
# 1. 移除官方源
pod repo remove master

# 2. 添加清华大学镜像源
pod repo add master https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git

# 3. 更新本地仓库
pod repo update
```

## 手动替换 (备用)

如果 `pod repo add` 命令失败，可以尝试手动克隆。

```bash
cd ~/.cocoapods/repos
pod repo remove master
git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master
```
