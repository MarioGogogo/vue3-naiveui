# 🎯 版本号递增配置 - 快速参考

> **忘记怎么设置版本号？看这个就够了！**

## 📍 配置位置

文件：`vite.config.js` 第14行

```javascript
autoIncrement: 'patch'  // 👈 修改这里
```

## 🔧 四种模式

| 模式 | 效果 | 适用场景 | 示例 |
|------|------|----------|------|
| `'patch'` | 小版本递增 | **日常开发、bug修复** (推荐) | 1.0.0 → 1.0.1 → 1.0.2 |
| `'minor'` | 中版本递增 | **功能发布、新增特性** | 1.0.0 → 1.1.0 → 1.2.0 |
| `'major'` | 大版本递增 | **重大更新、不兼容改动** | 1.0.0 → 2.0.0 → 3.0.0 |
| `false` | 不自动递增 | **完全手动管理** | 保持不变 |

## 💡 使用建议

### 90% 的情况用 `'patch'`
```javascript
autoIncrement: 'patch'  // 默认设置，日常开发足够
```

### 发布新功能时改为 `'minor'`
```javascript
autoIncrement: 'minor'  // 功能发布时临时改这个
// 构建完后改回 'patch'
```

### 重大版本更新时用 `'major'`
```javascript
autoIncrement: 'major'  // 很少用，重大改动时
```

### 想完全手动控制
```javascript
autoIncrement: false  // 每次都要手动改 package.json
```

## 🚀 快速操作流程

### 发布功能版本
```bash
# 1. 修改 vite.config.js
autoIncrement: 'patch' → 'minor'

# 2. 构建
npm run build

# 3. 改回默认
autoIncrement: 'minor' → 'patch'
```

### 重大版本发布
```bash
# 1. 修改 vite.config.js
autoIncrement: 'patch' → 'major'

# 2. 构建
npm run build

# 3. 改回默认
autoIncrement: 'major' → 'patch'
```

## ⚠️ 注意事项

1. **构建后版本号会自动写入 package.json**
2. **每次构建都会递增，不要频繁构建**
3. **忘记改回 `'patch'` 会快速递增中版本号**
4. **建议发完版本后立即改回 `'patch'`**

## 📋 版本号规则说明

### 语义化版本号格式：`主版本.次版本.补丁版本`

- **主版本 (Major)**：不兼容的 API 修改
- **次版本 (Minor)**：向下兼容的功能性新增
- **补丁版本 (Patch)**：向下兼容的问题修正

### 实际例子
```
1.0.0 → 1.0.1  修复bug
1.0.1 → 1.0.2  再修复bug
1.0.2 → 1.1.0  添加新功能
1.1.0 → 1.1.1  修复新功能的bug
1.1.1 → 2.0.0  重大架构调整
```

---

**记住：默认用 `'patch'`，发功能时临时改 `'minor'`，用完改回来！**
