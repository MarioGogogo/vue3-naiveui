<template>
  <body class="home-body">
    <!-- TopAppBar -->
    <header class="top-app-bar" id="main-header">
      <div class="header-left">
        <button class="menu-button">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <h1 class="header-title">功能模块</h1>
      </div>
      <div class="header-right">
        <div class="avatar-container">
          <img
            class="avatar-img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_DzqdWdhT257cZoqQMSv90qedIfFtoav63AUp8zXcBaQhylhha_csySvVeeeROtNLUnhtEZU1m73lTKFifV1pPz7mUhUS1dms74i8dlPTLl_dAAnJGMPMKszraAQ1Hk913nfH_Hh4RjX_nVyEAe5haZ5b9D0gYboSoNomRlp9PRtJDuvUD_FifbKBM1uMXumtQl3gwM_YTWJfWFF8R7Yt1xub58OmiREm6u0K0AIk-bUDc8ILb1Jnig"
            alt="User Avatar"
          />
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Hero / Header Section -->
      <section class="hero-section">
        <h2 class="hero-title">模块库</h2>
        <p class="hero-subtitle">选择一个功能模块开始体验 — 2024 EDITION</p>
      </section>

      <!-- Search Bar -->
      <div class="search-section">
        <div class="search-bar neo-shadow">
          <span class="material-symbols-outlined search-icon">search</span>
          <input
            class="search-input"
            placeholder="搜索组件或功能..."
            type="text"
          />
        </div>
      </div>

      <!-- 3-Column Grid of Cards -->
      <section class="grid-section">
        <div class="grid-container">
          <!-- Card 1: Virtual List (Available) -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[0])">
            <div class="card-status">
              <span class="status-badge status-available">可用</span>
            </div>
            <div class="card-icon">
              <span class="material-symbols-outlined material-filled">list_alt</span>
            </div>
            <h3 class="card-title">虚拟列表</h3>
            <p class="card-description">高性能数据</p>
          </div>

          <!-- Card 2: Data Table -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[1])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-green">
              <span class="material-symbols-outlined">table_view</span>
            </div>
            <h3 class="card-title">数据表格</h3>
            <p class="card-description">强大组件</p>
          </div>

          <!-- Card 3: Form Components -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[2])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-cyan">
              <span class="material-symbols-outlined">edit_note</span>
            </div>
            <h3 class="card-title">表单组件</h3>
            <p class="card-description">丰富输入</p>
          </div>

          <!-- Card 4: Charts -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[3])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-purple">
              <span class="material-symbols-outlined">insights</span>
            </div>
            <h3 class="card-title">图表展示</h3>
            <p class="card-description">可视化</p>
          </div>

          <!-- Card 5: File Upload -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[4])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-orange">
              <span class="material-symbols-outlined">cloud_upload</span>
            </div>
            <h3 class="card-title">文件上传</h3>
            <p class="card-description">管理</p>
          </div>

          <!-- Card 6: Dialogs -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[5])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-yellow">
              <span class="material-symbols-outlined">layers</span>
            </div>
            <h3 class="card-title">对话框</h3>
            <p class="card-description">弹窗</p>
          </div>

          <!-- Card 7: Notifications -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[6])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-teal">
              <span class="material-symbols-outlined">notifications_active</span>
            </div>
            <h3 class="card-title">消息通知</h3>
            <p class="card-description">提示</p>
          </div>

          <!-- Card 8: Tree Control -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[7])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-red">
              <span class="material-symbols-outlined">account_tree</span>
            </div>
            <h3 class="card-title">树形控件</h3>
            <p class="card-description">层级</p>
          </div>

          <!-- Card 9: Tabs -->
          <div class="card neo-shadow" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @click="handleNavigate(modules[8])">
            <div class="card-status">
              <span class="status-badge status-dev">开发中</span>
            </div>
            <div class="card-icon icon-lime">
              <span class="material-symbols-outlined">tab</span>
            </div>
            <h3 class="card-title">标签页</h3>
            <p class="card-description">步骤</p>
          </div>
        </div>
      </section>

      <!-- Promotion Area -->
      <section class="promotion-section">
        <div class="promotion-card neo-shadow-lg">
          <img
            class="promotion-bg"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAkOpck58fhwnJjuhsiG8xl-7QMJsQpidVHGIKJLAU04NUbmZ9bJzIlKtz_L-98CeRmwKAYMeQUhwwwgKl0GLUT7NE6SZyLbYY6xLWJNcyc4j3aZj6ksVamNFuP9bS0tLvhyvaHXRba5OF6kMS33RGYRPE1WfBH1kuyQMdyRKToXbCE8xmvW762YOB45iHOVfi3_ZliCMD0ZxBnzWfeIXQMaARHK1mDxOj57TL0e61ZsSFBltjTg1k1A"
            alt="Tech Background"
          />
          <div class="promotion-content">
            <span class="promotion-label">PRO PREVIEW</span>
            <h4 class="promotion-title">探索专业级 UI 框架</h4>
            <p class="promotion-desc">解锁更多高级动画组件</p>
            <button class="promotion-button neo-shadow">了解更多</button>
          </div>
        </div>
      </section>
    </main>

    <!-- BottomNavBar -->
    <nav class="bottom-nav">
      <a class="nav-item" href="#" @click.prevent>
        <span class="material-symbols-outlined nav-icon">home</span>
        <span class="nav-label">Home</span>
      </a>
      <a class="nav-item nav-active" href="#" @click.prevent>
        <span class="material-symbols-outlined nav-icon material-filled">grid_view</span>
        <span class="nav-label">Modules</span>
      </a>
      <a class="nav-item" href="#" @click.prevent>
        <span class="material-symbols-outlined nav-icon">search</span>
        <span class="nav-label">Search</span>
      </a>
      <a class="nav-item" href="#" @click.prevent>
        <span class="material-symbols-outlined nav-icon">settings</span>
        <span class="nav-label">Settings</span>
      </a>
    </nav>
  </body>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()

const modules = [
  { id: 'virtual-list', title: '虚拟列表', route: '/virtual-list', active: true },
  { id: 'data-table', title: '数据表格', route: '/data-table', active: false },
  { id: 'form', title: '表单组件', route: '/form', active: false },
  { id: 'chart', title: '图表展示', route: '/chart', active: false },
  { id: 'upload', title: '文件上传', route: '/upload', active: false },
  { id: 'modal', title: '对话框', route: '/modal', active: false },
  { id: 'notification', title: '消息通知', route: '/notification', active: false },
  { id: 'tree', title: '树形控件', route: '/tree', active: false },
  { id: 'tabs', title: '标签页', route: '/tabs', active: false }
]

const handleNavigate = (module) => {
  if (module.active) {
    router.push(module.route)
  } else {
    message.info(`${module.title} 功能正在开发中...`)
  }
}

// 新拟态交互效果
const handleMouseDown = (event) => {
  const card = event.currentTarget
  card.style.transform = 'translate(2px, 2px)'
  card.style.boxShadow = '2px 2px 0px 0px #000000'
}

const handleMouseUp = (event) => {
  const card = event.currentTarget
  card.style.transform = 'translate(0px, 0px)'
  card.style.boxShadow = '4px 4px 0px 0px #000000'
}

const handleMouseLeave = (event) => {
  const card = event.currentTarget
  card.style.transform = 'translate(0px, 0px)'
  card.style.boxShadow = '4px 4px 0px 0px #000000'
}
</script>

<style scoped>
/* Material Symbols */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Manrope:wght@400;600;700;800&display=swap');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

.material-filled {
  font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

/* 基础设置 */
.home-body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  min-height: max(884px, 100dvh);
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #000000;
  overflow-x: hidden;
  padding-bottom: 128px;
}

/* 新拟态样式 */
.neo-shadow {
  box-shadow: 4px 4px 0px 0px #000000;
}

.neo-shadow-lg {
  box-shadow: 6px 6px 0px 0px #000000;
}

.neo-border {
  border: 3px solid #000000;
}

.neo-border-sm {
  border: 2px solid #000000;
}

/* 隐藏滚动条 */
.home-body ::-webkit-scrollbar {
  width: 0px;
  background: transparent;
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
  justify-content: space-between;
  padding: 16px 20px;
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
  border: 2px solid #000000;
  background-color: #FFD600;
  cursor: pointer;
  transition: transform 0.2s;
}

.menu-button:hover {
  transform: translate(2px, 2px);
}

.menu-button:active {
  transform: translate(4px, 4px);
}

.menu-button .material-symbols-outlined {
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

.header-right {
  display: flex;
  align-items: center;
}

.avatar-container {
  width: 40px;
  height: 40px;
  border: 2px solid #000000;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar-container:active {
  transform: scale(0.95);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 主内容区域 */
.main-content {
  width: 100%;
  max-width: 448px;
  margin: 0 auto;
}

/* 英雄区域 */
.hero-section {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: rgba(0, 229, 255, 0.2);
  border: 3px solid #000000;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin-bottom: 24px;
}

.hero-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 32px;
  line-height: 1;
  color: #000000;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}

.hero-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: #000000;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
}

/* 搜索区域 */
.search-section {
  padding: 0 20px;
  margin-bottom: 24px;
}

.search-bar {
  background-color: #ffffff;
  border: 3px solid #000000;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  transition: all 0.2s;
}

.search-bar:focus-within {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.search-icon {
  font-size: 20px;
  color: #000000;
  margin-right: 12px;
  font-weight: 700;
}

.search-input {
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  font-size: 14px;
  color: #000000;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
}

.search-input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.search-input:focus {
  outline: none;
}

/* 九宫格区域 */
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
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
}

.card:hover {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.card-status {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 10;
}

.status-badge {
  padding: 2px 8px;
  border: 2px solid #000000;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.status-available {
  background-color: #FFD600;
  color: #000000;
}

.status-dev {
  background-color: #000000;
  color: #ffffff;
}

.card-icon {
  width: 48px;
  height: 48px;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
}

.card-icon .material-symbols-outlined {
  font-size: 28px;
}

/* 不同卡片的图标颜色 */
.card:nth-child(1) .card-icon {
  background-color: #FF00FF;
  color: #000000;
}

.card:nth-child(2) .card-icon {
  background-color: #39FF14;
  color: #000000;
}

.card:nth-child(3) .card-icon {
  background-color: #00FFFF;
  color: #000000;
}

.card:nth-child(4) .card-icon {
  background-color: #BF00FF;
  color: #ffffff;
}

.card:nth-child(5) .card-icon {
  background-color: #FF5F1F;
  color: #000000;
}

.card:nth-child(6) .card-icon {
  background-color: #FFF01F;
  color: #000000;
}

.card:nth-child(7) .card-icon {
  background-color: #00CCCC;
  color: #000000;
}

.card:nth-child(8) .card-icon {
  background-color: #FF3131;
  color: #ffffff;
}

.card:nth-child(9) .card-icon {
  background-color: #CCFF00;
  color: #000000;
}

.card-title {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: -0.025em;
}

.card-description {
  font-size: 9px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  margin: 4px 0 0 0;
  line-height: 1.2;
}

/* 促销区域 */
.promotion-section {
  padding: 0 20px;
  margin-bottom: 24px;
}

.promotion-card {
  position: relative;
  width: 100%;
  border: 3px solid #000000;
  overflow: hidden;
  background-color: #000000;
}

.promotion-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  filter: grayscale(1) contrast(1.25);
}

.promotion-content {
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.promotion-label {
  background-color: #FFD600;
  padding: 2px 8px;
  border: 2px solid #000000;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  color: #000000;
}

.promotion-title {
  color: #ffffff;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 24px;
  line-height: 1;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: -0.05em;
}

.promotion-desc {
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.promotion-button {
  margin-top: 16px;
  background-color: #FF5722;
  color: #ffffff;
  padding: 8px 24px;
  border: 2px solid #000000;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.promotion-button:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

/* 底部导航栏 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 50;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 80px;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
  text-decoration: none;
  border-right: 2px solid #000000;
  cursor: pointer;
  transition: background 0.2s;
  padding: 8px 0;
}

.nav-item:last-child {
  border-right: none;
}

.nav-item:hover {
  background-color: #00E5FF;
}

.nav-item.nav-active {
  background-color: #FFD600;
}

.nav-icon {
  font-size: 20px;
  font-weight: 700;
}

.nav-label {
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 700;
  margin-top: 4px;
  text-transform: uppercase;
}

/* 小屏幕优化 */
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

  .card-icon .material-symbols-outlined {
    font-size: 24px;
  }

  .card-title {
    font-size: 11px;
  }

  .card-description {
    font-size: 8px;
  }
}
</style>
