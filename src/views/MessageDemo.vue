<template>
  <div class="message-demo-container">
    <!-- Neo-Brutalism 顶部栏 -->
    <div class="neo-header">
      <button class="neo-back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">返回</span>
      </button>
      <div class="header-info">
        <h1 class="neo-title">Message 组件演示</h1>
        <p class="neo-subtitle">Neo-Brutalism 设计风格</p>
      </div>
    </div>

    <!-- 演示按钮区域 -->
    <div class="demo-content">
      <div class="demo-section">
        <h2 class="section-title">基础消息类型</h2>

        <div class="button-grid">
          <button class="neo-btn neo-btn-success" @click="showSuccess">
            <span class="btn-icon">✓</span>
            <span>成功消息</span>
          </button>

          <button class="neo-btn neo-btn-error" @click="showError">
            <span class="btn-icon">×</span>
            <span>错误消息</span>
          </button>

          <button class="neo-btn neo-btn-warning" @click="showWarning">
            <span class="btn-icon">!</span>
            <span>警告消息</span>
          </button>

          <button class="neo-btn neo-btn-info" @click="showInfo">
            <span class="btn-icon">i</span>
            <span>信息消息</span>
          </button>
        </div>
      </div>

      <div class="demo-section">
        <h2 class="section-title">特殊类型</h2>

        <div class="button-grid">
          <button class="neo-btn neo-btn-default" @click="showDefault">
            <span class="btn-icon">●</span>
            <span>默认消息</span>
          </button>

          <button class="neo-btn neo-btn-loading" @click="showLoading">
            <span class="btn-icon">◐</span>
            <span>加载消息</span>
          </button>

          <button class="neo-btn neo-btn-multiple" @click="showMultiple">
            <span class="btn-icon">▤</span>
            <span>多条消息</span>
          </button>

          <button class="neo-btn neo-btn-destroy" @click="destroyAll">
            <span class="btn-icon">✕</span>
            <span>销毁全部</span>
          </button>
        </div>
      </div>

      <div class="demo-section">
        <h2 class="section-title">自定义样式示例</h2>

        <div class="button-grid">
          <button class="neo-btn neo-btn-custom-1" @click="showCustom1">
            <span class="btn-icon">★</span>
            <span>自定义1</span>
          </button>

          <button class="neo-btn neo-btn-custom-2" @click="showCustom2">
            <span class="btn-icon">♥</span>
            <span>自定义2</span>
          </button>

          <button class="neo-btn neo-btn-custom-3" @click="showCustom3">
            <span class="btn-icon">◆</span>
            <span>自定义3</span>
          </button>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="usage-card">
        <h3 class="usage-title">使用说明</h3>
        <pre class="code-block"><code>import neoMessage from '@/utils/message'

// 基础用法
neoMessage.success('操作成功！')
neoMessage.error('操作失败！')
neoMessage.warning('请注意！')
neoMessage.info('提示信息')
neoMessage.message('普通消息')

// 加载消息
const loading = neoMessage.loading('正在加载...')
setTimeout(() => loading.destroy(), 2000)

// 自定义选项
neoMessage.success('成功！', {
  duration: 5000,
  closable: true
})

// 销毁所有消息
neoMessage.destroyAll()</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import neoMessage from '@/utils/message'

const router = useRouter()

// 返回首页
const goBack = () => {
  router.push('/')
}

// 成功消息
const showSuccess = () => {
  neoMessage.success('操作成功！数据已保存')
}

// 错误消息
const showError = () => {
  neoMessage.error('操作失败！请重试')
}

// 警告消息
const showWarning = () => {
  neoMessage.warning('警告！此操作不可撤销')
}

// 信息消息
const showInfo = () => {
  neoMessage.info('提示：新版本已发布')
}

// 默认消息
const showDefault = () => {
  neoMessage.message('这是一条普通消息')
}

// 加载消息
const showLoading = () => {
  const loading = neoMessage.loading('正在处理数据...')
  setTimeout(() => {
    loading.destroy()
    neoMessage.success('处理完成！')
  }, 2000)
}

// 多条消息
const showMultiple = () => {
  neoMessage.success('第一条消息')
  setTimeout(() => {
    neoMessage.error('第二条消息')
  }, 500)
  setTimeout(() => {
    neoMessage.warning('第三条消息')
  }, 1000)
  setTimeout(() => {
    neoMessage.info('第四条消息')
  }, 1500)
}

// 销毁所有消息
const destroyAll = () => {
  neoMessage.message('准备清空消息...')
  setTimeout(() => {
    neoMessage.destroyAll()
  }, 500)
}

// 自定义样式示例1
const showCustom1 = () => {
  neoMessage.success('🎉 恭喜你获得成就！', {
    duration: 4000,
    closable: true
  })
}

// 自定义样式示例2
const showCustom2 = () => {
  neoMessage.error('❌ 连接服务器失败', {
    duration: 5000,
    closable: true
  })
}

// 自定义样式示例3
const showCustom3 = () => {
  neoMessage.info('💡 提示：可以使用快捷键 Ctrl+S 保存', {
    duration: 6000,
    closable: true
  })
}
</script>

<style scoped>
.message-demo-container {
  min-height: 100vh;
  background: #FFFFF0;
  display: flex;
  flex-direction: column;
  font-family: 'Space Grotesk', 'Arial Black', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Neo-Brutalism 顶部栏 */
.neo-header {
  background: #FF6B6B;
  border: 4px solid #000;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 6px 6px 0px #000;
}

.neo-back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FFF;
  border: 3px solid #000;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.1s;
  color: #000;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 3px 3px 0px #000;
}

.neo-back-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #000;
}

.neo-back-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 0px 0px 0px #000;
}

.back-icon {
  font-size: 20px;
  font-weight: 900;
}

.header-info {
  flex: 1;
}

.neo-title {
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
  color: #000;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -1px;
}

.neo-subtitle {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  color: #000;
  margin: 6px 0 0 0;
  opacity: 0.9;
}

/* 演示内容区域 */
.demo-content {
  flex: 1;
  padding: 24px;
  background: #FFFFF0;
}

.demo-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 900;
  color: #000;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  padding-left: 12px;
  border-left: 4px solid #000;
}

/* 按钮网格 */
.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.neo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  border: 3px solid #000;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 4px 4px 0px #000;
  min-height: 60px;
}

.neo-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000;
}

.neo-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000;
}

.btn-icon {
  font-size: 18px;
  font-weight: 900;
}

/* 不同颜色的按钮 */
.neo-btn-success {
  background: #4ECDC4;
  color: #000;
}

.neo-btn-error {
  background: #FF6B6B;
  color: #000;
}

.neo-btn-warning {
  background: #FFE66D;
  color: #000;
}

.neo-btn-info {
  background: #95E1D3;
  color: #000;
}

.neo-btn-default {
  background: #FFF;
  color: #000;
}

.neo-btn-loading {
  background: #AA96DA;
  color: #000;
}

.neo-btn-multiple {
  background: #FCBAD3;
  color: #000;
}

.neo-btn-destroy {
  background: #A8E6CF;
  color: #000;
}

.neo-btn-custom-1 {
  background: #FFB347;
  color: #000;
}

.neo-btn-custom-2 {
  background: #77DD77;
  color: #000;
}

.neo-btn-custom-3 {
  background: #C7CEEA;
  color: #000;
}

/* 使用说明卡片 */
.usage-card {
  background: #FFF;
  border: 3px solid #000;
  box-shadow: 5px 5px 0px #000;
  padding: 20px;
  margin-top: 24px;
}

.usage-title {
  font-size: 16px;
  font-weight: 900;
  color: #000;
  margin: 0 0 16px 0;
  text-transform: uppercase;
}

.code-block {
  background: #1a1a1a;
  border: 3px solid #000;
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  box-shadow: 3px 3px 0px #000;
}

.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #4ECDC4;
  line-height: 1.6;
}

/* 小屏幕优化 */
@media (max-width: 600px) {
  .demo-content {
    padding: 16px;
  }

  .button-grid {
    grid-template-columns: 1fr;
  }

  .neo-title {
    font-size: 20px;
  }

  .section-title {
    font-size: 16px;
  }

  .code-block code {
    font-size: 11px;
  }
}
</style>
