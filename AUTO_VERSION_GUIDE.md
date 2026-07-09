# 🚀 自动化版本管理系统

## ❌ 不再需要手动设置！

现在版本号和更新信息都会**自动管理**，你只需要专注于写代码和提交 Git 记录。

## ✨ 自动化功能

### 1. **版本号自动递增**
- 每次构建时自动递增版本号
- 支持三种递增模式：
  - `patch`: 1.0.0 → 1.0.1 → 1.0.2（修复bug）
  - `minor`: 1.0.0 → 1.1.0 → 1.2.0（新增功能）
  - `major`: 1.0.0 → 2.0.0 → 3.0.0（重大更新）

### 2. **更新日志自动生成**
- 从 Git 提交记录自动提取更新内容
- 智能分类：功能、修复、优化
- 自动添加 emoji 图标
- 自动去重和优先级排序

### 3. **智能强制更新判断**
- 检测 Git 提交中的关键词
- 包含"安全"、"漏洞"、"breaking"等自动设为强制更新

### 4. **Git 信息自动获取**
- 自动获取 Git hash、分支名
- 自动获取提交次数和最近提交内容
- 构建时间和环境信息

## 🔧 配置方式

### 在 vite.config.js 中配置：

```javascript
smartVersionPlugin({
  autoIncrement: 'patch',     // 版本号递增方式
  updatePackageJson: true,     // 自动更新 package.json
  maxCommits: 10,              // 获取最近10次提交
  updatePublic: true           // 同时更新 public 目录
})
```

### 版本递增策略选择：

```javascript
// 小修复/bug修复 (推荐日常使用)
autoIncrement: 'patch'   // 1.0.0 → 1.0.1

// 新增功能 (功能发布时)
autoIncrement: 'minor'   // 1.0.0 → 1.1.0

// 重大更新 (不兼容更改)
autoIncrement: 'major'  // 1.0.0 → 2.0.0

// 手动管理 (完全手动控制)
autoIncrement: false    // 不自动递增
```

## 📝 Git 提交规范

为了获得更好的更新日志，建议使用规范的提交信息：

### 推荐的提交格式：

```bash
# 功能新增
git commit -m "feat: 添加用户登录功能"

# Bug修复
git commit -m "fix: 修复页面加载缓慢的问题"

# 性能优化
git commit -m "optimize: 优化图片加载性能"

# 代码重构
git commit -m "refactor: 重构组件结构"

# 文档更新
git commit -m "docs: 更新README文档"

# 样式调整
git commit -m "style: 统一按钮样式"
```

### 中文提交也支持：

```bash
git commit -m "新增：添加虚拟列表组件"
git commit -m "修复：修复版本检测bug"
git commit -m "优化：优化页面加载速度"
```

## 🎯 实际使用流程

### 日常开发流程：

```bash
# 1. 修改代码
vim src/components/MyComponent.vue

# 2. 提交代码
git add .
git commit -m "feat: 添加新功能"

# 3. 构建项目（版本号自动递增，更新日志自动生成）
npm run build

# 4. 部署（一切都已经自动处理好了）
# 直接部署 dist 目录即可
```

### 功能发布流程：

```bash
# 1. 修改 vite.config.js
# autoIncrement: 'patch' → 'minor'

# 2. 构建项目
npm run build

# 3. 版本号从 1.0.0 自动变为 1.1.0
# 更新日志自动生成
```

## 📊 生成的版本信息示例

```json
{
  "version": "1.0.1",
  "buildTime": "2024-07-09T10:30:00.000Z",
  "buildDate": "2024/7/9 10:30:00",
  "environment": "production",
  "changes": [
    "✨ feat: 添加虚拟列表组件",
    "🐛 fix: 修复版本检测bug",
    "⚡ optimize: 优化页面加载性能"
  ],
  "force": false,
  "git": {
    "hash": "abc123",
    "branch": "main",
    "commitCount": 5,
    "lastCommit": "feat: 添加新功能"
  }
}
```

## 🔍 更新日志生成规则

### 自动分类：

1. **功能类** (✨)
   - 包含 `feat`、`新增`、`添加`
   - 优先级最高

2. **修复类** (🐛)
   - 包含 `fix`、`修复`、`bug`
   - 优先级次之

3. **优化类** (⚡)
   - 包含 `优化`、`改进`、`optimize`
   - 优先级第三

4. **其他类** (📝)
   - 其他类型的提交
   - 优先级最后

### 自动限制：

- 最多显示 5 条更新内容
- 优先显示重要更新
- 自动去除重复内容

## ⚠️ 强制更新触发条件

以下情况会自动触发强制更新：

- 提交信息包含 "breaking"
- 提交信息包含 "安全"
- 提交信息包含 "漏洞"
- 提交信息包含 "critical"
- 提交信息包含 "重要"

```bash
# 这些提交会触发强制更新
git commit -m "fix: 修复安全漏洞"
git commit -m "feat: 添加新功能 (breaking change)"
```

## 🛠️ 高级配置

### 自定义更新规则：

如果默认规则不符合你的需求，可以修改 `build/smart-version-plugin.js` 中的 `generateChangelog` 函数。

### 关闭自动递增：

```javascript
smartVersionPlugin({
  autoIncrement: false  // 完全手动管理版本号
})
```

### 只读取 Git 信息：

```javascript
smartVersionPlugin({
  autoIncrement: false,      // 不自动递增版本号
  updatePackageJson: false,  // 不修改 package.json
  maxCommits: 5               // 只获取最近5次提交
})
```

## 📋 对比：之前 vs 现在

### ❌ 之前的手动方式：

```bash
# 每次发布都要手动做这些：
1. 修改 package.json 版本号
2. 修改 version.config.js 更新内容
3. 构建项目
4. 检查 version.json 是否正确
```

### ✅ 现在的自动方式：

```bash
# 只需要做这些：
1. 正常提交代码
2. 构建项目
3. 完成！所有版本信息都已自动生成
```

## 🎉 总结

### 主要优势：

1. **完全自动化**：版本号、更新日志、Git 信息全部自动生成
2. **基于 Git**：从真实的代码提交记录生成更新内容
3. **智能分类**：自动识别功能、修复、优化等不同类型
4. **灵活配置**：可以自定义递增策略和更新规则
5. **减少错误**：不再需要手动同步版本信息

### 你只需要：

- ✅ 正常写代码
- ✅ 规范的 Git 提交
- ✅ 运行构建命令

### 系统会自动：

- 🤖 递增版本号
- 📝 生成更新日志
- 🔖 获取 Git 信息
- ⚠️ 判断强制更新
- 📦 生成版本文件

---

**现在你可以专注于写代码，版本管理完全自动化！**
