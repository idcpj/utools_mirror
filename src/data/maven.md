# Maven 代理设置

## 代理

### 设置镜像源

#### 阿里云镜像
```xml
<!-- 在 ~/.m2/settings.xml 中添加 -->
<mirrors>
  <mirror>
    <id>aliyun</id>
    <name>Aliyun Maven Repository</name>
    <url>https://maven.aliyun.com/repository/public</url>
    <mirrorOf>central</mirrorOf>
  </mirror>
</mirrors>
```

#### 华为云镜像
```xml
<!-- 在 ~/.m2/settings.xml 中添加 -->
<mirrors>
  <mirror>
    <id>huaweicloud</id>
    <name>Huaweicloud Maven Repository</name>
    <url>https://repo.huaweicloud.com/repository/maven/</url>
    <mirrorOf>central</mirrorOf>
  </mirror>
</mirrors>
```

## 还原

### 还原官方源
```bash
# 删除 ~/.m2/settings.xml 中的 mirrors 配置
# 或使用默认的 Maven Central 配置
``` 