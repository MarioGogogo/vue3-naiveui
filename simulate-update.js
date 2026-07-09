/**
 * 模拟版本更新脚本
 * 在浏览器控制台中执行此脚本
 */

// 1. 设置本地版本为旧版本
const oldVersion = {
  version: '1.0.0',
  buildTime: '2024-01-01T00:00:00.000Z'
};

localStorage.setItem('app_version', JSON.stringify(oldVersion));
console.log('✅ 已设置本地版本为 1.0.0');

// 2. 模拟远程版本更新
const newVersion = {
  version: '2.0.0',
  buildTime: new Date().toISOString(),
  changes: [
    '🎉 重大版本更新',
    '✨ Neo-Brutalism 全新设计',
    '🚀 性能大幅提升',
    '💬 消息通知组件',
    '🔄 版本更新检测功能'
  ],
  force: false
};

// 3. 触发更新弹窗（需要先访问首页）
if (window.showUpdateDialog) {
  setTimeout(() => {
    window.showUpdateDialog(oldVersion, newVersion, false);
    console.log('✅ 更新弹窗已显示');
  }, 1000);
  console.log('🔄 正在准备显示更新弹窗...');
} else {
  console.log('❌ 请先访问项目首页以确保 App.vue 已加载');
  console.log('💡 然后再执行此脚本');
}

console.log('📋 模拟信息：');
console.log('- 当前版本：1.0.0');
console.log('- 最新版本：2.0.0');
console.log('- 更新类型：普通更新');
console.log('');
console.log('🎯 接下来请：');
console.log('1. 访问项目首页：http://localhost:5173/');
console.log('2. 页面加载时会自动检测到更新');
console.log('3. 显示更新弹窗');
