# 版本更新检测功能 - 快速开始

## 🚀 快速开始

### 1. 构建项目
```bash
npm run build
```

构建完成后，`dist/version.json` 会自动生成。

### 2. 测试功能
```bash
npm run dev
```

访问 `http://localhost:5173/version-test` 测试版本检测功能。

### 3. 模拟更新
1. 修改 `package.json` 中的版本号：`"version": "1.0.1"`
2. 修改 `version.config.js` 中的更新内容
3. 重新构建：`npm run build`
4. 刷新浏览器，应该看到更新提示弹窗

## 📁 文件结构

```
vue3-naiveui/
├── build/
│   └── version-plugin.js          # Vite 插件：构建时生成版本文件
├── src/
│   ├── components/
│   │   └── UpdateModal.vue         # Neo-Brutalism 风格更新弹窗
│   ├── utils/
│   │   └── version.js              # 版本检测工具函数
│   ├── views/
│   │   └── VersionTest.vue         # 版本测试页面
│   └── App.vue                     # 集成版本检测逻辑
├── version.config.js               # 版本配置文件
└── vite.config.js                  # Vite 配置（包含版本插件）
```

## ⚙️ 配置版本信息

### 修改版本号
编辑 `package.json`：
```json
{
  "version": "1.0.1"
}
```

### 修改更新内容
编辑 `version.config.js`：
```javascript
export default {
  version: '1.0.1',
  force: false,
  changes: [
    '🐛 修复已知问题',
    '⚡ 性能优化',
    '✨ 新增功能'
  ]
}
```

## 🎯 工作流程

1. **开发阶段**: 正常开发功能
2. **准备发布**: 修改版本号和更新日志
3. **构建**: 运行 `npm run build` 生成版本文件
4. **部署**: 将 `dist` 目录部署到服务器
5. **用户检测**: 用户下次访问时会自动检测到更新

## 🧪 测试步骤

### 方法一：使用测试页面
1. 访问 `/version-test` 路由
2. 点击"清除本地版本"
3. 点击"检查更新"查看效果

### 方法二：手动模拟
1. 打开浏览器开发者工具
2. 在控制台执行：`localStorage.clear()`
3. 刷新页面，应该看到首次访问的版本检测

### 方法三：模拟强制更新
1. 修改 `version.config.js`：`force: true`
2. 重新构建项目
3. 清除本地缓存并刷新页面
4. 应该看到强制更新弹窗（无法跳过）

## 🔍 故障排除

### 版本文件未生成
- 检查 `vite.config.js` 是否正确引入插件
- 查看构建日志中是否有错误信息

### 更新弹窗不显示
- 检查浏览器控制台是否有错误
- 确认 `dist/version.json` 文件存在
- 检查网络请求是否成功

### 版本比较不正确
- 确认版本号格式正确（如：1.0.0）
- 检查版本号比较逻辑

## 📝 版本号规范

使用语义化版本号：

- **主版本** (Major): 重大更新，不兼容的修改
- **次版本** (Minor): 向后兼容的新功能
- **补丁版本** (Patch): 向后兼容的 bug 修复

示例：
- `1.0.0` → `1.0.1` (bug 修复)
- `1.0.1` → `1.1.0` (新增功能)
- `1.1.0` → `2.0.0` (重大更新)

## 🎨 自定义样式

更新弹窗使用 Neo-Brutalism 设计风格，可以在 `src/components/UpdateModal.vue` 中自定义样式：

```vue
<style>
/* 修改主题颜色 */
.neo-modal {
  background: #YOUR_COLOR; /* 修改背景色 */
}

/* 修改按钮样式 */
.neo-btn-primary {
  background: #YOUR_COLOR; /* 修改主按钮颜色 */
}
</style>
```

## 🔧 高级配置

### 修改检测频率
默认每次页面加载时检测，可以在 `App.vue` 中添加定时检测：

```javascript
// 每5分钟检测一次
setInterval(() => {
  checkVersionUpdate()
}, 5 * 60 * 1000)
```

### 自定义版本API
如果需要从自定义API获取版本信息，修改 `src/utils/version.js`：

```javascript
export const fetchRemoteVersion = async (baseUrl = '') => {
  const response = await fetch(`${baseUrl}/api/version`)
  return await response.json()
}
```

## 📞 获取帮助

如有问题，请查看详细文档：`VERSION_UPDATE_GUIDE.md`

---

**提示**: 首次使用建议先在测试环境中验证整个流程！
