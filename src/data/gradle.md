# Gradle 代理设置

## 代理

### 设置镜像源

#### 阿里云镜像
```groovy
// 在项目的 build.gradle 文件中添加
repositories {
    maven {
        url 'https://maven.aliyun.com/repository/public'
    }
    mavenCentral()
}
```

#### 全局配置
```groovy
// 在 ~/.gradle/init.gradle 文件中添加
allprojects {
    repositories {
        maven {
            url 'https://maven.aliyun.com/repository/public'
        }
        mavenCentral()
    }
}
```

## 还原

### 还原官方源
```groovy
// 使用默认的 Maven Central 配置
repositories {
    mavenCentral()
}
``` 