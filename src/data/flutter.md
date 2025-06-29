# Flutter 镜像代理设置

Flutter 使用环境变量来配置镜像。推荐使用由 Flutter 中国开发者社区维护的官方镜像。

## 临时配置 (当前终端有效)

### macOS / Linux

```bash
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

### Windows (PowerShell)

```powershell
$env:PUB_HOSTED_URL="https://pub.flutter-io.cn"
$env:FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
```

## 永久配置

为了让配置永久生效，你需要将上述命令添加到你的终端配置文件中。

- **macOS / Linux**: 添加到 `~/.bashrc`, `~/.zshrc` 或其他对应的 shell 配置文件中，然后执行 `source ~/.bashrc` (或对应文件)使其生效。
- **Windows**: 通过 "编辑系统环境变量" 界面，手动添加或修改 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL` 这两个系统变量。

配置完成后，执行 `flutter doctor` 来验证配置是否成功。
