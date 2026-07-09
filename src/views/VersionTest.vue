<template>
  <div class="version-test-container">
    <div class="neo-header">
      <h1 class="neo-title">版本更新检测测试</h1>
      <p class="neo-subtitle">Version Update Detection Test</p>
    </div>

    <div class="test-content">
      <!-- 当前版本信息 -->
      <div class="info-card">
        <h2 class="card-title">📦 当前版本信息</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">本地版本:</span>
            <span class="info-value">{{ localVersion?.version || '未知' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">构建时间:</span>
            <span class="info-value">{{ formatTime(localVersion?.buildTime) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">上次检查:</span>
            <span class="info-value">{{ formatCheckTime() }}</span>
          </div>
        </div>
      </div>

      <!-- 远程版本信息 -->
      <div class="info-card">
        <h2 class="card-title">🌐 远程版本信息</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">远程版本:</span>
            <span class="info-value highlight">{{ remoteVersion?.version || '未获取' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">构建时间:</span>
            <span class="info-value">{{ formatTime(remoteVersion?.buildTime) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">强制更新:</span>
            <span class="info-value">{{ remoteVersion?.force ? '是' : '否' }}</span>
          </div>
        </div>
        <div v-if="remoteVersion?.changes?.length" class="changes-list">
          <h3 class="list-title">更新内容:</h3>
          <ul>
            <li v-for="(change, index) in remoteVersion.changes" :key="index">
              {{ change }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 测试按钮 -->
      <div class="action-buttons">
        <button class="neo-btn" @click="fetchRemote">
          🔄 获取远程版本
        </button>
        <button class="neo-btn" @click="checkUpdate">
          🔍 检查更新
        </button>
        <button class="neo-btn" @click="clearLocal">
          🗑️ 清除本地版本
        </button>
        <button class="neo-btn" @click="simulateUpdate">
          🎭 模拟更新弹窗
        </button>
        <button class="neo-btn danger" @click="testRealUpdate">
          🚀 测试真实更新
        </button>
      </div>

      <!-- 操作说明 -->
      <div class="instructions">
        <h3 class="instructions-title">📖 测试说明</h3>
        <ol class="instructions-list">
          <li>点击"获取远程版本"查看服务器上的最新版本</li>
          <li>点击"清除本地版本"模拟首次访问</li>
          <li>修改 package.json 版本号并重新构建来测试更新</li>
          <li>点击"模拟更新"可以手动触发更新弹窗</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getLocalVersion,
  fetchRemoteVersion,
  checkForUpdates,
  saveLocalVersion,
  clearLocalVersion as clearVersion,
  getLastCheckTime
} from '@/utils/version'

const localVersion = ref(null)
const remoteVersion = ref(null)

onMounted(async () => {
  // 获取本地版本
  localVersion.value = getLocalVersion()

  // 自动获取远程版本
  await fetchRemote()
})

// 获取远程版本
const fetchRemote = async () => {
  try {
    const baseUrl = window.location.origin
    const version = await fetchRemoteVersion(baseUrl)
    if (version) {
      remoteVersion.value = version
      console.log('远程版本获取成功:', version)
    } else {
      alert('获取远程版本失败，请确保服务器上有 version.json 文件')
    }
  } catch (error) {
    console.error('获取远程版本时出错:', error)
    alert('获取远程版本时出错: ' + error.message)
  }
}

// 检查更新
const checkUpdate = async () => {
  try {
    const baseUrl = window.location.origin

    await checkForUpdates(
      baseUrl,
      // 没有更新
      () => {
        alert('✅ 应用已是最新版本！')
      },
      // 有更新
      (local, remote) => {
        alert(`🆕 发现新版本：${local.version} → ${remote.version}\n\n请在首页查看更新弹窗`)
      },
      // 强制更新
      (remote) => {
        alert(`⚠️ 需要强制更新到版本 ${remote.version}\n\n请在首页查看更新弹窗`)
      }
    )
  } catch (error) {
    console.error('检查更新时出错:', error)
    alert('检查更新时出错: ' + error.message)
  }
}

// 清除本地版本
const clearLocal = () => {
  if (confirm('确定要清除本地版本信息吗？这将模拟首次访问。')) {
    clearVersion()
    localVersion.value = null
    alert('✅ 本地版本已清除，下次检查将视为新版本')
  }
}

// 模拟更新弹窗
const simulateUpdate = () => {
  if (confirm('要模拟更新弹窗吗？这将显示一个示例更新。')) {
    // 创建模拟的更新信息
    const mockRemote = {
      version: '2.0.0',
      buildTime: new Date().toISOString(),
      changes: [
        '🎉 全新设计风格',
        '✨ 性能大幅提升',
        '🚀 新增多个功能组件',
        '🐛 修复已知问题'
      ],
      force: false
    }

    // 直接触发更新弹窗
    if (window.showUpdateDialog) {
      const local = {
        version: '1.0.0',
        buildTime: new Date(Date.now() - 86400000).toISOString()
      }
      window.showUpdateDialog(local, mockRemote, false)
      alert('✅ 已显示更新弹窗')
    } else {
      alert('❌ 全局更新函数不可用，请确保在 App.vue 中正确配置')
    }
  }
}

// 测试真实更新
const testRealUpdate = () => {
  if (confirm('要测试真实更新流程吗？这将修改本地版本并重新检查。')) {
    // 设置本地版本为旧版本
    saveLocalVersion({
      version: '1.0.0',
      buildTime: new Date(Date.now() - 86400000).toISOString()
    })

    // 清除远程版本缓存
    remoteVersion.value = null

    alert('✅ 已设置本地版本为 1.0.0\n\n现在返回首页，应该会检测到版本更新并显示弹窗')

    // 提供返回首页的选项
    if (confirm('要现在返回首页吗？')) {
      window.location.href = '/'
    }
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  if (!timestamp) return '未知'
  try {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-CN')
  } catch {
    return '无效时间'
  }
}

// 格式化检查时间
const formatCheckTime = () => {
  const timestamp = getLastCheckTime()
  if (!timestamp) return '从未检查'
  return formatTime(timestamp)
}
</script>

<style scoped>
.version-test-container {
  min-height: 100vh;
  background: #FFFFF0;
  padding: 20px;
  font-family: 'Space Grotesk', 'Arial Black', -apple-system, BlinkMacSystemFont, sans-serif;
}

.neo-header {
  background: #FF6B6B;
  border: 4px solid #000;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
  box-shadow: 6px 6px 0px #000;
}

.neo-title {
  font-size: 32px;
  font-weight: 900;
  color: #000;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -1px;
}

.neo-subtitle {
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin: 8px 0 0 0;
  opacity: 0.8;
}

.test-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: #FFF;
  border: 3px solid #000;
  box-shadow: 5px 5px 0px #000;
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 900;
  color: #000;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  border-bottom: 3px solid #000;
  padding-bottom: 8px;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F5F5F5;
  border: 2px solid #000;
}

.info-label {
  font-weight: 700;
  font-size: 14px;
  color: #000;
}

.info-value {
  font-weight: 600;
  font-size: 14px;
  color: #000;
  font-family: 'Courier New', monospace;
}

.info-value.highlight {
  color: #4ECDC4;
  font-weight: 900;
}

.changes-list {
  margin-top: 16px;
  padding: 12px;
  background: #FFE66D;
  border: 3px solid #000;
}

.list-title {
  font-size: 14px;
  font-weight: 900;
  color: #000;
  margin: 0 0 8px 0;
  text-transform: uppercase;
}

.changes-list ul {
  margin: 0;
  padding-left: 20px;
}

.changes-list li {
  font-weight: 600;
  font-size: 14px;
  color: #000;
  margin-bottom: 4px;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.neo-btn {
  padding: 16px 20px;
  border: 3px solid #000;
  background: #4ECDC4;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 4px 4px 0px #000;
  font-family: 'Space Grotesk', 'Arial Black', -apple-system, BlinkMacSystemFont, sans-serif;
}

.neo-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000;
}

.neo-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000;
}

.neo-btn.danger {
  background: #FF6B6B;
}

.instructions {
  background: #95E1D3;
  border: 3px solid #000;
  box-shadow: 5px 5px 0px #000;
  padding: 16px;
}

.instructions-title {
  font-size: 16px;
  font-weight: 900;
  color: #000;
  margin: 0 0 12px 0;
  text-transform: uppercase;
}

.instructions-list {
  margin: 0;
  padding-left: 20px;
}

.instructions-list li {
  font-weight: 600;
  font-size: 14px;
  color: #000;
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .neo-title {
    font-size: 24px;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
