# Neo-Brutalism Message 组件

完全符合 Neo-Brutalism 设计风格的 Message 组件封装，基于 NaiveUI 的 message API。

## 特性

- ✨ **Neo-Brutalism 设计风格** - 粗黑边框、硬阴影、高对比度颜色
- 🎨 **多种消息类型** - success、error、warning、info、loading
- 🔄 **自定义图标** - 每种类型都有独特的图标设计
- ⚡ **简单易用** - 与 NaiveUI message API 兼容
- 🎯 **TypeScript 支持** - 完整的类型定义
- 📱 **响应式设计** - 适配各种屏幕尺寸

## 安装

组件已包含在项目中，位于 `src/utils/message.js`。

## 使用方法

### 基础用法

```javascript
import neoMessage from '@/utils/message'

// 成功消息
neoMessage.success('操作成功！')

// 错误消息
neoMessage.error('操作失败！')

// 警告消息
neoMessage.warning('请注意！')

// 信息消息
neoMessage.info('提示信息')

// 普通消息
neoMessage.message('这是一条普通消息')

// 加载消息
const loading = neoMessage.loading('正在加载...')
// 手动销毁加载消息
loading.destroy()
```

### 自定义选项

```javascript
// 自定义持续时间
neoMessage.success('成功！', {
  duration: 5000
})

// 禁用关闭按钮
neoMessage.info('信息', {
  closable: false
})

// 保持显示（鼠标悬停时）
neoMessage.warning('警告', {
  keepAliveOnHover: true
})

// 自定义样式
neoMessage.error('错误', {
  style: {
    background: '#FF0000',
    border: '4px solid #000'
  }
})
```

### 销毁消息

```javascript
// 销毁所有消息
neoMessage.destroyAll()

// 销毁单个消息实例
const message = neoMessage.loading('处理中...')
message.destroy()
```

## 设计规范

### 配色方案

| 类型 | 颜色 | 适用场景 |
|------|------|----------|
| success | `#4ECDC4` | 成功操作、完成状态 |
| error | `#FF6B6B` | 错误提示、失败状态 |
| warning | `#FFE66D` | 警告信息、需要注意 |
| info | `#95E1D3` | 一般信息、提示 |
| loading | `#AA96DA` | 加载状态、处理中 |
| default | `#FFFFFF` | 普通消息 |

### 视觉特征

- **边框**: 3px 纯黑色边框
- **阴影**: 5px 硬阴影（无模糊）
- **圆角**: 0（完全方形）
- **字体**: 粗体（700-800 字重）
- **图标**: 自定义设计的 Neo-Brutalism 图标
- **间距**: 12px 外边距，16px 内边距

## 组件结构

```
message/
├── 图标区域 (20x20px)
├── 消息内容
└── 关闭按钮（可选）
```

## 动画效果

- **进入**: 淡入 + 下滑
- **退出**: 淡出 + 上滑
- **加载图标**: 旋转动画
- **悬停**: 轻微放大效果

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持
- Safari: ✅ 完全支持
- IE11: ❌ 不支持

## 示例页面

访问 `/message-demo` 路由查看完整的交互示例。

## 高级用法

### 全局配置

如果需要修改全局配置，编辑 `src/utils/message.js`：

```javascript
const messageOptions = {
  success: (content) => ({
    content,
    theme: 'success',
    duration: 3000, // 修改默认持续时间
    keepAliveOnHover: true,
    closable: true,
    style: {
      background: neoColors.success,
      border: '3px solid #000',
      // ... 其他样式
    }
  })
}
```

### 扩展类型

可以轻松添加新的消息类型：

```javascript
// 在 message.js 中添加
const neoColors = {
  // ... 现有颜色
  custom: '#YOUR_COLOR'
}

// 在 neoMessage 对象中添加方法
const neoMessage = {
  // ... 现有方法
  custom: (content, options = {}) => {
    return naiveMessage.create({
      content: createNeoMessageContent('custom', content),
      duration: 3000,
      ...options,
      style: {
        ...getNeoMessageStyle('custom'),
        ...options.style
      }
    })
  }
}
```

## 注意事项

1. **组件依赖**: 依赖于 NaiveUI 的 message API
2. **样式隔离**: 使用全局 CSS 变量确保样式一致性
3. **性能**: 大量消息同时显示时建议使用 `destroyAll()` 清理
4. **可访问性**: 支持键盘操作和屏幕阅读器

## 维护和更新

如有问题或建议，请联系开发团队。
