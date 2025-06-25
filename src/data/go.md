# Go 代理设置

## 代理

### Linux/macOS
```bash
export GOPROXY=https://goproxy.io,direct
export GOPRIVATE=git.mycompany.com,github.com/my/private
```

### Windows
```bash
set GOPROXY=https://goproxy.io,direct
set GOPRIVATE=git.mycompany.com,github.com/my/private
```

### 配置命令
```bash
go env -w GOPROXY=https://goproxy.tuna.tsinghua.edu.cn,direct
```

## 还原

### Linux/macOS
```bash
export GOPROXY=https://proxy.golang.org,direct
unset GOPRIVATE
```

### Windows
```bash
set GOPROXY=https://proxy.golang.org,direct
set GOPRIVATE=
```

### 配置命令
```bash
go env -w GOPROXY=https://proxy.golang.org,direct
``` 