# .NET NuGet 代理设置

## 代理

### 设置镜像源

#### 全局配置
```bash
# 添加 NuGet 中国镜像
dotnet nuget add source https://nuget.cdn.azure.cn/v3/index.json -n nuget.cn

# 添加华为云镜像
dotnet nuget add source https://repo.huaweicloud.com/repository/nuget/v3/index.json -n huaweicloud
```

#### 配置文件方式
```xml
<!-- 在 %AppData%\NuGet\NuGet.Config (Windows) 或 ~/.nuget/NuGet/NuGet.Config (Mac/Linux) 中添加 -->
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="nuget.cn" value="https://nuget.cdn.azure.cn/v3/index.json" protocolVersion="3" />
  </packageSources>
</configuration>
```

## 还原

### 还原官方源
```bash
# 移除自定义源
dotnet nuget remove source nuget.cn
dotnet nuget remove source huaweicloud

# 确保官方源存在
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
``` 