<template>
  <div class="page-container">
    <!-- TopAppBar -->
    <header class="top-app-bar" id="main-header">
      <div class="header-left">
        <button class="menu-button">
          <span class="icon">☰</span>
        </button>
        <h1 class="header-title">功能模块</h1>
      </div>
      <div class="header-right">
        <div class="avatar">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_DzqdWdhT257cZoqQMSv90qedIfFtoav63AUp8zXcBaQhylhha_csySvVeeeROtNLUnhtEZU1m73lTKFifV1pPz7mUhUS1dms74i8dlPTLl_dAAnJGMPMKszraAQ1Hk913nfH_Hh4RjX_nVyEAe5haZ5b9D0gYboSoNomRlp9PRtJDuvUD_FifbKBM1uMXumtQl3gwM_YTWJfWFF8R7Yt1xub58OmiREm6u0K0AIk-bUDc8ILb1Jnig"
            alt="User Avatar"
          />
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <h2 class="hero-title">模块库</h2>
        <p class="hero-subtitle">选择一个功能模块开始体验</p>
      </section>

      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            class="search-input"
            placeholder="搜索组件或功能..."
            v-model="searchValue"
          />
        </div>
      </div>

      <!-- 3-Column Grid of Cards -->
      <section class="grid-section">
        <div class="grid-container">
          <div
            v-for="module in modules"
            :key="module.id"
            class="card"
            :class="{ 'card-available': module.active }"
            @click="handleNavigate(module)"
          >
            <div class="card-status">
              <span class="status-badge" :class="module.active ? 'status-available' : 'status-dev'">
                {{ module.active ? '可用' : '开发中' }}
              </span>
            </div>
            <div class="card-icon" :class="{ 'icon-available': module.active }">
              <span class="icon-emoji">{{ module.icon }}</span>
            </div>
            <h3 class="card-title">{{ module.title }}</h3>
            <p class="card-description">{{ module.shortDesc }}</p>
          </div>
        </div>
      </section>

      <!-- Promotion Area -->
      <section class="promotion-section">
        <div class="promotion-card">
          <div class="promotion-bg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAkOpck58fhwnJjuhsiG8xl-7QMJsQpidVHGIKJLAU04NUbmZ9bJzIlKtz_L-98CeRmwKAYMeQUhwwwgKl0GLUT7NE6SZyLbYY6xLWJNcyc4j3aZj6ksVamNFuP9bS0tLvhyvaHXRba5OF6kMS33RGYRPE1WfBH1kuyQMdyRKToXbCE8xmvW762YOB45iHOVfi3_ZliCMD0ZxBnzWfeIXQMaARHK1mDxOj57TL0e61ZsSFBltjTg1k1A"
              alt="Background"
            />
          </div>
          <div class="promotion-content">
            <span class="promotion-label">PRO PREVIEW</span>
            <h4 class="promotion-title">探索专业级 UI 框架</h4>
            <p class="promotion-desc">解锁更多高级动画组件</p>
          </div>
          <button class="promotion-button">了解更多</button>
        </div>
      </section>
    </main>

    <!-- BottomNavBar -->
    <nav class="bottom-nav">
      <a class="nav-item" href="#" @click.prevent>
        <span class="nav-icon">🏠</span>
        <span class="nav-label">Home</span>
      </a>
      <a class="nav-item nav-active" href="#" @click.prevent>
        <span class="nav-icon">⊞</span>
        <span class="nav-label">Modules</span>
      </a>
      <a class="nav-item" href="#" @click.prevent>
        <span class="nav-icon">🔍</span>
        <span class="nav-label">Search</span>
      </a>
      <a class="nav-item" href="#" @click.prevent>
        <span class="nav-icon">⚙</span>
        <span class="nav-label">Settings</span>
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()
const searchValue = ref('')

const modules = [
  {
    id: 'virtual-list',
    title: '虚拟列表',
    shortDesc: '高性能大数据',
    icon: '📋',
    route: '/virtual-list',
    active: true
  },
  {
    id: 'data-table',
    title: '数据表格',
    shortDesc: '强大表格组件',
    icon: '📊',
    route: '/data-table',
    active: false
  },
  {
    id: 'form',
    title: '表单组件',
    shortDesc: '丰富输入选项',
    icon: '📝',
    route: '/form',
    active: false
  },
  {
    id: 'chart',
    title: '图表展示',
    shortDesc: '数据可视化',
    icon: '📈',
    route: '/chart',
    active: false
  },
  {
    id: 'upload',
    title: '文件上传',
    shortDesc: '拖拽文件管理',
    icon: '☁️',
    route: '/upload',
    active: false
  },
  {
    id: 'modal',
    title: '对话框',
    shortDesc: '弹窗与抽屉',
    icon: '▣',
    route: '/modal',
    active: false
  },
  {
    id: 'notification',
    title: '消息通知',
    shortDesc: '提示与通知',
    icon: '🔔',
    route: '/notification',
    active: false
  },
  {
    id: 'tree',
    title: '树形控件',
    shortDesc: '层级数据展示',
    icon: '🌲',
    route: '/tree',
    active: false
  },
  {
    id: 'tabs',
    title: '标签页',
    shortDesc: '标签与步骤',
    icon: '📑',
    route: '/tabs',
    active: false
  }
]

const handleNavigate = (module) => {
  if (module.active) {
    router.push(module.route)
  } else {
    message.info(`${module.title} 功能正在开发中...`)
  }
}

const handleScroll = () => {
  const header = document.getElementById('main-header')
  if (window.scrollY > 10) {
    header.classList.add('header-scrolled')
  } else {
    header.classList.remove('header-scrolled')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Color Variables */
:root {
  --primary: #00685f;
  --primary-container: #008378;
  --on-primary: #ffffff;
  --on-primary-container: #f4fffc;
  --primary-fixed: #89f5e7;
  --primary-fixed-dim: #6bd8cb;

  --secondary: #006591;
  --secondary-container: #39b8fd;
  --on-secondary: #ffffff;
  --on-secondary-container: #004666;
  --secondary-fixed: #c9e6ff;
  --secondary-fixed-dim: #89ceff;

  --tertiary: #5a5c5d;
  --tertiary-container: #737576;
  --on-tertiary: #ffffff;
  --on-tertiary-container: #fcfcfd;

  --surface: #fbf8fc;
  --surface-container: #f0edf1;
  --surface-container-low: #f6f2f7;
  --surface-container-lowest: #ffffff;
  --surface-container-high: #eae7eb;
  --surface-dim: #dcd9dd;

  --background: #fbf8fc;
  --on-background: #1b1b1e;
  --on-surface: #1b1b1e;
  --on-surface-variant: #3d4947;
  --outline: #6d7a77;
  --outline-variant: #bcc9c6;

  --error: #ba1a1a;
  --error-container: #ffdad6;
  --on-error: #ffffff;
  --on-error-container: #93000a;

  --tertiary-fixed: #e2e2e3;
  --tertiary-fixed-dim: #c6c6c7;
  --inverse-surface: #303033;
  --inverse-on-surface: #f3f0f4;
  --inverse-primary: #6bd8cb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-container {
  min-height: 100vh;
  background: var(--background);
  padding-bottom: 80px;
  overflow-x: hidden;
}

/* TopAppBar */
.top-app-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: var(--surface);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  transition: all 0.3s ease;
}

.top-app-bar.header-scrolled {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(251, 248, 252, 0.8);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-button:active {
  opacity: 0.8;
}

.menu-button:hover {
  background: var(--surface-container-low);
}

.menu-button .icon {
  font-size: 24px;
  color: var(--primary);
}

.header-title {
  font-family: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: var(--primary);
  margin: 0;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-container);
  overflow: hidden;
  border: 1px solid var(--outline-variant);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar:active {
  transform: scale(0.9);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main Content */
.main-content {
  width: 100%;
  max-width: 448px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  background:
    radial-gradient(circle at top right, rgba(137, 245, 231, 0.27), transparent 70%),
    radial-gradient(circle at bottom left, rgba(201, 230, 255, 0.27), transparent 70%);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-title {
  font-family: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.02em;
  color: var(--on-surface);
  margin: 0;
}

.hero-subtitle {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: var(--on-surface-variant);
  opacity: 0.8;
  margin: 0;
}

/* Search Bar */
.search-container {
  padding: 0 20px;
  margin-bottom: 24px;
}

.search-bar {
  background: var(--surface-container-lowest);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.search-bar:focus-within {
  box-shadow: 0 4px 12px rgba(0, 104, 95, 0.2);
  ring: 2px solid rgba(0, 104, 95, 0.2);
}

.search-icon {
  font-size: 20px;
  color: var(--on-surface-variant);
  margin-right: 12px;
}

.search-input {
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  font-size: 14px;
  color: var(--on-surface);
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.search-input::placeholder {
  color: var(--outline);
}

.search-input:focus {
  outline: none;
}

/* Grid Section */
.grid-section {
  padding: 0 20px;
  margin-bottom: 24px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.card {
  background: var(--surface-container-lowest);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--outline-variant);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.card:active {
  transform: scale(0.95);
}

.card-available {
  border-color: var(--primary);
}

.card-available:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 104, 95, 0.15);
}

.card:not(.card-available):hover {
  border-color: var(--secondary);
}

.card-status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
}

.status-badge {
  padding: 2px 6px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0.08em;
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.status-available {
  background: rgba(0, 104, 95, 0.1);
  color: var(--primary);
}

.status-dev {
  background: rgba(198, 198, 199, 0.4);
  color: var(--on-surface-variant);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(0, 101, 145, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 8px;
  transition: transform 0.2s;
}

.card:hover .card-icon {
  transform: scale(1.1);
}

.icon-available {
  background: rgba(0, 104, 95, 0.1);
}

.icon-emoji {
  font-size: 24px;
}

.card-title {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.05em;
  color: var(--on-surface);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.card-description {
  font-size: 10px;
  color: var(--on-surface-variant);
  margin-top: 4px;
  line-height: 1.2;
  opacity: 0.7;
}

/* Promotion Section */
.promotion-section {
  padding: 0 20px;
  margin-bottom: 24px;
}

.promotion-card {
  position: relative;
  width: 100%;
  height: 128px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.promotion-bg {
  position: absolute;
  inset: 0;
  background: var(--primary-container);
}

.promotion-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promotion-content {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 30, 29, 0.8), transparent);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.promotion-label {
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.promotion-title {
  color: white;
  font-family: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  margin: 0;
  line-height: 1.2;
}

.promotion-desc {
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  margin-top: 4px;
}

.promotion-button {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: white;
  color: var(--primary);
  border: none;
  padding: 4px 12px;
  border-radius: 9999px;
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s;
}

.promotion-button:active {
  transform: scale(0.9);
}

/* BottomNavBar */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 50;
  background: var(--surface);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--on-surface-variant);
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  cursor: pointer;
  padding: 4px 8px;
}

.nav-item:hover {
  color: var(--primary);
}

.nav-item:active {
  transform: scale(0.9);
}

.nav-active {
  background: var(--secondary-container);
  color: var(--on-secondary-container);
  border-radius: 12px;
  padding: 4px 16px;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.nav-label {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.05em;
}

.nav-active .nav-label {
  margin-top: 4px;
}

/* Small screen optimization */
@media (max-width: 360px) {
  .grid-container {
    gap: 8px;
  }

  .card {
    padding: 8px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
  }

  .icon-emoji {
    font-size: 20px;
  }

  .card-title {
    font-size: 11px;
  }

  .card-description {
    font-size: 9px;
  }
}
</style>
