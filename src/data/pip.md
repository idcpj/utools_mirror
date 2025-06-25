# Pip 代理设置

## 代理

### 设置镜像源

#### 清华镜像
```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 阿里云镜像
```bash
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
```

#### 临时使用
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
```

## 还原

### 还原官方源
```bash
pip config unset global.index-url
``` 