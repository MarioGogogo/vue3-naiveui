/**
 * 版本更新配置文件
 * 用于管理应用版本信息和更新内容
 */

export default {
  // 版本信息（会自动从 package.json 读取，也可以手动指定）
  version: '1.0.0',

  // 是否强制更新（true 表示用户必须更新才能继续使用）
  force: false,

  // 更新内容描述
  changes: [
    '🎉 首次发布',
    '✨ Neo-Brutalism 设计风格',
    '🚀 虚拟列表高性能组件',
    '💬 消息通知组件',
    '🔄 版本更新检测功能'
  ],

  // 自定义版本信息（可选）
  customInfo: {
    // 发布日期
    releaseDate: new Date().toISOString(),
    // 发布者
    author: '开发团队',
    // 发布说明
    description: '这是一个基于 Vue3 + NaiveUI 的 Neo-Brutalism 设计风格应用'
  }
}
