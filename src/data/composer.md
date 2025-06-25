# PHP Composer 代理设置

## 代理

### 设置镜像源

#### 阿里云镜像
```bash
# 全局配置
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

# 项目配置
composer config repo.packagist composer https://mirrors.aliyun.com/composer/
```

#### Packagist 中国镜像
```bash
# 全局配置
composer config -g repo.packagist composer https://packagist.phpcomposer.com

# 项目配置
composer config repo.packagist composer https://packagist.phpcomposer.com
```

## 还原

### 还原官方源
```bash
# 全局配置
composer config -g --unset repos.packagist

# 项目配置
composer config --unset repos.packagist
``` 