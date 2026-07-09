# 版本更新检测功能说明

## 功能概述

这个版本更新检测功能可以自动检测 H5 应用是否有新版本发布，并提供用户友好的更新提示。

## 核心特性

- ✅ **自动检测**: 页面加载时自动检查版本更新
- 🎨 **Neo-Brutalism 设计**: 符合项目设计风格的更新弹窗
- 🔄 **智能更新**: 支持普通更新和强制更新两种模式
- 📝 **更新日志**: 显示详细的版本更新内容
- 🛠️ **易于配置**: 通过配置文件管理版本信息
- 📦 **自动生成**: 构建时自动生成 version.json 文件

## 工作原理

### 1. 构建时生成版本文件

当运行 `npm run build` 时，Vite 插件会自动在 `dist` 目录生成 `version.json` 文件：

```json
{
  "version": "1.0.0",
  "buildTime": "2024-01-01T00:00:00.000Z",
  "buildDate": "2024/1/1 00:00:00",
  "gitHash": "abc123",
  "gitBranch": "main",
  "environment": "production",
  "changes": [
    "性能优化",
    "界面更新",
    "功能增强"
  ],
  "force": false
}
```

### 2. 运行时版本检测

应用启动时会：
1. 读取本地存储的版本信息
2. 请求服务器上的 `version.json?t={timestamp}`
3. 比较版本号，判断是否需要更新
4. 根据配置显示更新提示或强制更新

### 3. 用户交互

- **普通更新**: 用户可以选择"稍后更新"或"立即更新"
- **强制更新**: 用户必须更新才能继续使用应用

## 配置说明

### version.config.js

管理应用版本信息和更新内容：

```javascript
export default {
  // 版本号（会从 package.json 读取，也可手动指定）
  version: '1.0.0',

  // 是否强制更新
  force: false,

  // 更新内容描述
  changes: [
    '🎉 首次发布',
    '✨ Neo-Brutalism 设计风格',
    '🚀 虚拟列表高性能组件'
  ]
}
```

### vite.config.js

配置版本生成插件：

```javascript
import versionPlugin from './build/version-plugin.js'
import versionConfig from './version.config.js'

export default defineConfig({
  plugins: [
    versionPlugin({
      outputDir: 'dist',
      fileName: 'version.json',
      versionInfo: {
        version: versionConfig.version,
        changes: versionConfig.changes,
        force: versionConfig.force
      }
    })
  ]
})
```

## 使用方法

### 1. 修改版本号

编辑 `package.json` 或 `version.config.js`：

```json
// package.json
{
  "version": "1.0.1"
}
```

### 2. 添加更新日志

编辑 `version.config.js`：

```javascript
export default {
  version: '1.0.1',
  changes: [
    '🐛 修复已知问题',
    '⚡ 性能优化',
    '✨ 新增功能'
  ]
}
```

### 3. 构建部署

```bash
# 构建应用
npm run build

# 部署 dist 目录到服务器
# version.json 会自动生成在 dist 目录中
```

## 测试功能

### 1. 访问测试页面

访问 `/version-test` 路由查看版本检测测试页面。

### 2. 模拟更新流程

1. **清除本地版本**: 点击"清除本地版本"按钮
2. **修改版本号**: 在 `package.json` 中修改版本号
3. **重新构建**: 运行 `npm run build`
4. **刷新页面**: 应该看到更新提示弹窗

### 3. 测试强制更新

在 `version.config.js` 中设置 `force: true`，用户必须更新才能继续使用。

## API 参考

### 版本检测工具

```javascript
import {
  getLocalVersion,      // 获取本地版本
  saveLocalVersion,     // 保存本地版本
  fetchRemoteVersion,   // 获取远程版本
  compareVersions,      // 比较版本号
  checkForUpdates,      // 检查更新
  clearLocalVersion     // 清除本地版本
} from '@/utils/version'
```

### 手动检查更新

```javascript
// 在任何组件中都可以调用
window.checkForAppUpdate()
```

## 部署注意事项

### 1. 确保版本文件可访问

确保服务器上的 `version.json` 文件可以被正常访问：

```
https://yourdomain.com/version.json
```

### 2. 设置缓存策略

建议对 `version.json` 设置较短的缓存时间，但添加时间戳参数可以避免缓存问题。

### 3. 版本号规范

使用语义化版本号（Semantic Versioning）：

- `1.0.0` - 主版本.次版本.补丁版本
- 主版本变化：重大更新或不兼容的修改
- 次版本变化：向后兼容的新功能
- 补丁版本变化：向后兼容的 bug 修复

## 故障排除

### 1. 版本文件获取失败

**问题**: 无法获取远程版本信息

**解决方案**:
- 检查服务器上是否存在 `version.json` 文件
- 确认文件路径正确
- 检查网络请求是否被 CORS 阻止

### 2. 更新弹窗不显示

**问题**: 检测到更新但弹窗不显示

**解决方案**:
- 检查浏览器控制台是否有错误
- 确认 `UpdateModal.vue` 组件正确导入
- 检查 `App.vue` 中的版本检测逻辑

### 3. 强制更新不生效

**问题**: 设置了强制更新但用户仍可跳过

**解决方案**:
- 确认 `force: true` 已正确设置
- 检查版本号比较逻辑是否正确
- 确认主版本号发生了变化

## 最佳实践

1. **定期更新**: 每次发布新版本时更新版本号和更新日志
2. **测试流程**: 在测试环境中验证版本检测功能
3. **用户沟通**: 在更新日志中清晰说明更新内容
4. **渐进式更新**: 小版本使用普通更新，大版本使用强制更新
5. **监控反馈**: 监控用户的更新率和反馈

## 扩展功能

### 自定义更新策略

可以根据需求修改 `src/utils/version.js` 中的比较逻辑：

```javascript
// 自定义版本比较逻辑
export const compareVersions = (v1, v2) => {
  // 自定义比较逻辑
  // 比如：只比较主版本号
  const major1 = parseInt(v1.split('.')[0])
  const major2 = parseInt(v2.split('.')[0])

  if (major1 > major2) return 1
  if (major1 < major2) return -1
  return 0
}
```

### 添加版本详情页面

可以创建一个专门的页面显示详细的版本信息和历史记录。

## 维护建议

1. **定期检查**: 定期检查版本检测功能是否正常工作
2. **更新日志**: 保持更新日志的准确性和完整性
3. **用户反馈**: 收集用户对更新流程的反馈
4. **性能监控**: 监控版本检测对应用性能的影响

---

如有问题或建议，请联系开发团队。
