<template>
  <body class="coming-soon-body">
    <!-- Header -->
    <header class="top-app-bar">
      <div class="header-left">
        <button class="back-button" @click="goBack">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">功能开发中</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section neo-shadow">
        <div class="construction-icon">
          <span class="material-symbols-outlined">construction</span>
        </div>
        <h2 class="hero-title">{{ moduleTitle }}</h2>
        <p class="hero-subtitle">该功能正在开发中，敬请期待</p>
      </section>

      <!-- Info Cards -->
      <section class="info-section">
        <div class="info-card neo-shadow">
          <div class="info-icon">
            <span class="material-symbols-outlined">schedule</span>
          </div>
          <h3 class="info-title">开发进度</h3>
          <p class="info-desc">该功能正在积极开发中，我们会尽快上线</p>
        </div>

        <div class="info-card neo-shadow">
          <div class="info-icon">
            <span class="material-symbols-outlined">star</span>
          </div>
          <h3 class="info-title">敬请期待</h3>
          <p class="info-desc">功能上线后将会提供更好的用户体验</p>
        </div>

        <div class="info-card neo-shadow">
          <div class="info-icon">
            <span class="material-symbols-outlined">notifications_active</span>
          </div>
          <h3 class="info-title">关注更新</h3>
          <p class="info-desc">留意版本更新通知，第一时间体验新功能</p>
        </div>
      </section>

      <!-- Back Button -->
      <section class="action-section">
        <button class="back-btn neo-shadow" @click="goBack">
          <span class="material-symbols-outlined">home</span>
          <span>返回首页</span>
        </button>
      </section>
    </main>
  </body>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 获取传递过来的模块信息
const moduleTitle = computed(() => {
  return route.query.title || '该功能'
})

// 返回首页
const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Manrope:wght@400;600;700;800&display=swap');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

/* 基础设置 */
.coming-soon-body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  min-height: 100vh;
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #000000;
}

/* 新拟态样式 */
.neo-shadow {
  box-shadow: 4px 4px 0px 0px #000000;
}

/* TopAppBar */
.top-app-bar {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  display: flex;
  align-items: center;
  padding: 16px 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid #000000;
  background-color: #FFD600;
  cursor: pointer;
  transition: transform 0.2s;
}

.back-button:hover {
  transform: translate(2px, 2px);
}

.back-button:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.back-button .material-symbols-outlined {
  color: #000000;
}

.header-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 22px;
  color: #000000;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.025em;
}

/* 主内容区域 */
.main-content {
  width: 100%;
  max-width: 448px;
  margin: 0 auto;
  padding: 24px 20px;
}

/* Hero Section */
.hero-section {
  background-color: #FFD600;
  border: 3px solid #000000;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
}

.construction-icon {
  width: 80px;
  height: 80px;
  border: 3px solid #000000;
  background-color: #FF5722;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  animation: bounce 2s infinite;
}

.construction-icon .material-symbols-outlined {
  font-size: 48px;
  color: #ffffff;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 28px;
  line-height: 1.2;
  color: #000000;
  font-weight: 800;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}

.hero-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  color: #000000;
  font-weight: 600;
  margin: 0;
  opacity: 0.8;
}

/* Info Section */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.info-card {
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.info-icon {
  width: 48px;
  height: 48px;
  border: 2px solid #000000;
  background-color: #4ECDC4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon .material-symbols-outlined {
  font-size: 28px;
  color: #000000;
}

.info-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 18px;
  color: #000000;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-transform: uppercase;
}

.info-desc {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
}

/* Action Section */
.action-section {
  padding: 0 20px;
}

.back-btn {
  width: 100%;
  background-color: #4ECDC4;
  border: 3px solid #000000;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000000;
}

.back-btn:hover {
  background-color: #3DB8B0;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #000000;
}

.back-btn:active {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0px 0px #000000;
}

.back-btn .material-symbols-outlined {
  font-size: 20px;
}

/* 小屏幕优化 */
@media (max-width: 360px) {
  .hero-section {
    padding: 32px 20px;
  }

  .hero-title {
    font-size: 24px;
  }

  .construction-icon {
    width: 64px;
    height: 64px;
  }

  .construction-icon .material-symbols-outlined {
    font-size: 36px;
  }

  .info-card {
    padding: 16px;
  }

  .info-icon {
    width: 40px;
    height: 40px;
  }

  .info-icon .material-symbols-outlined {
    font-size: 24px;
  }

  .info-title {
    font-size: 16px;
  }

  .info-desc {
    font-size: 12px;
  }
}
</style>