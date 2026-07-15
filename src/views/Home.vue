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
        <button class="update-check-btn" @click="handleCheckUpdate" :disabled="isCheckingUpdate">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">检测更新</span>
        </button>
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
        <div class="hero-left">
          <h2 class="hero-title">模块库</h2>
          <p class="hero-subtitle">选择一个功能模块开始体验 — 2024 EDITION</p>
        </div>
        <div class="hero-right">
          <span class="version-badge">{{ currentVersion }}</span>
        </div>
      </section>

      <!-- Search Bar -->
      <div class="search-section">
        <div class="search-bar neo-shadow">
          <span class="material-symbols-outlined search-icon">search</span>
          <input
            class="search-input"
            placeholder="搜索组件或功能..."
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
          />
          <button
            v-if="searchQuery"
            class="clear-search-btn"
            @click="clearSearch"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- 搜索结果提示 -->
        <div v-if="searchQuery" class="search-results-info">
          <span class="results-text">
            找到 <strong>{{ filteredModules.length }}</strong> 个结果
            <span v-if="searchQuery">关于 "<strong>{{ searchQuery }}</strong>"</span>
          </span>
          <button v-if="searchQuery" class="clear-text-btn" @click="clearSearch">
            清空搜索
          </button>
        </div>

        <!-- 无搜索结果提示 -->
        <div v-if="searchQuery && filteredModules.length === 0" class="no-results">
          <span class="material-symbols-outlined no-results-icon">search_off</span>
          <p class="no-results-text">没有找到相关功能</p>
          <p class="no-results-hint">试试其他关键词，如"列表"、"图表"等</p>
        </div>
      </div>

      <!-- 3-Column Grid of Cards -->
      <section class="grid-section">
        <div class="grid-container">
          <!-- 使用 v-for 动态渲染卡片 -->
          <div
            v-for="(module, index) in filteredModules"
            :key="module.id"
            class="card neo-shadow"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseLeave"
            @click="handleNavigate(module)"
          >
            <div class="card-status">
              <span
                :class="[
                  'status-badge',
                  module.active ? 'status-available' : 'status-dev'
                ]"
              >
                {{ module.active ? '可用' : '开发中' }}
              </span>
            </div>
            <div
              class="card-icon"
              :style="{ backgroundColor: module.bgColor }"
            >
              <span
                class="material-symbols-outlined"
                :class="{ 'material-filled': module.iconFilled }"
              >
                {{ module.icon }}
              </span>
            </div>
            <h3 class="card-title">{{ module.title }}</h3>
            <p class="card-description">{{ module.description }}</p>
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
        <span class="nav-label">首页</span>
      </a>
      <a class="nav-item nav-active" href="#" @click.prevent>
        <span class="material-symbols-outlined nav-icon material-filled">grid_view</span>
        <span class="nav-label">模块</span>
      </a>
      <a class="nav-item" href="#" @click.prevent="router.push('/message-center')">
        <span class="material-symbols-outlined nav-icon">mail</span>
        <span class="nav-label">消息</span>
      </a>
      <a class="nav-item" href="#" @click.prevent="router.push('/settings')">
        <span class="material-symbols-outlined nav-icon">settings</span>
        <span class="nav-label">设置</span>
      </a>
    </nav>
  </body>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import neoMessage from '@/utils/message'
import {
  getLocalVersion,
  fetchRemoteVersion,
  checkForUpdates,
  saveLocalVersion,
  compareVersions
} from '@/utils/version'

const router = useRouter()
const message = neoMessage

// 版本信息
const localVersionInfo = ref(null)
const remoteVersionInfo = ref(null)
const isCheckingUpdate = ref(false)

// 搜索功能
const searchQuery = ref('')

// 计算属性
const currentVersion = computed(() => {
  return localVersionInfo.value?.version || '未知'
})

const buildTime = computed(() => {
  if (!localVersionInfo.value?.buildTime) return '未知'
  try {
    const date = new Date(localVersionInfo.value.buildTime)
    return date.toLocaleDateString('zh-CN')
  } catch {
    return '未知'
  }
})

const environment = computed(() => {
  return localVersionInfo.value?.environment || 'development'
})

const modules = [
  {
    id: 'virtual-list',
    title: '虚拟列表',
    description: '高性能数据',
    route: '/virtual-list',
    active: true,
    icon: 'view_list',
    iconFilled: true,
    color: '#FF00FF',
    bgColor: '#FF00FF'
  },
  {
    id: 'message-demo',
    title: '消息演示',
    description: 'Neo-Brutalism',
    route: '/message-demo',
    active: true,
    icon: 'notifications_active',
    iconFilled: false,
    color: '#000000',
    bgColor: '#39FF14'
  },
  {
    id: 'data-table',
    title: '数据表格',
    description: '强大组件',
    route: '/data-table',
    active: true,
    icon: 'table_view',
    iconFilled: false,
    color: '#000000',
    bgColor: '#00FFFF'
  },
  {
    id: 'form',
    title: '表单组件',
    description: '丰富输入',
    route: '/form',
    active: true,
    icon: 'edit_note',
    iconFilled: false,
    color: '#FFFFFF',
    bgColor: '#BF00FF'
  },
  {
    id: 'chart',
    title: '图表展示',
    description: '可视化',
    route: '/chart',
    active: false,
    icon: 'insights',
    iconFilled: false,
    color: '#000000',
    bgColor: '#FF5F1F'
  },
  {
    id: 'upload',
    title: '文件上传',
    description: '管理',
    route: '/upload',
    active: false,
    icon: 'cloud_upload',
    iconFilled: false,
    color: '#000000',
    bgColor: '#FFF01F'
  },
  {
    id: 'modal',
    title: '对话框',
    description: '弹窗',
    route: '/modal',
    active: false,
    icon: 'layers',
    iconFilled: false,
    color: '#000000',
    bgColor: '#00CCCC'
  },
  {
    id: 'tree',
    title: '树形控件',
    description: '层级',
    route: '/tree',
    active: true,
    icon: 'account_tree',
    iconFilled: false,
    color: '#FFFFFF',
    bgColor: '#FF3131'
  },
  {
    id: 'tabs',
    title: '标签页',
    description: '步骤',
    route: '/tabs',
    active: false,
    icon: 'tab',
    iconFilled: false,
    color: '#000000',
    bgColor: '#CCFF00'
  },
  {
    id: 'version-test',
    title: '版本测试',
    description: '更新检测',
    route: '/version-test',
    active: true,
    icon: 'system_update_alt',
    iconFilled: false,
    color: '#000000',
    bgColor: '#FF69B4'
  },
  {
    id: 'food-delivery',
    title: '外卖下单',
    description: '美食配送',
    route: '/food-delivery',
    active: true,
    icon: 'restaurant',
    iconFilled: false,
    color: '#000000',
    bgColor: '#FF5F1F'
  },
  {
    id: 'dashboard',
    title: '数据看板',
    description: '统计图表',
    route: '/dashboard',
    active: true,
    icon: 'analytics',
    iconFilled: false,
    color: '#000000',
    bgColor: '#00E5FF'
  },
  {
    id: 'profile',
    title: '个人中心',
    description: '用户资料',
    route: '/profile',
    active: true,
    icon: 'person',
    iconFilled: false,
    color: '#000000',
    bgColor: '#FF00CC'
  }
]

// 搜索过滤逻辑
const filteredModules = computed(() => {
  if (!searchQuery.value.trim()) {
    return modules
  }

  const query = searchQuery.value.toLowerCase().trim()

  return modules.filter(module => {
    // 搜索标题
    const titleMatch = module.title.toLowerCase().includes(query)
    // 搜索ID
    const idMatch = module.id.toLowerCase().includes(query)
    // 搜索关键词映射
    const keywords = getSearchKeywords(module.id)
    const keywordMatch = keywords.some(keyword => keyword.toLowerCase().includes(query))

    return titleMatch || idMatch || keywordMatch
  })
})

// 搜索关键词映射（帮助用户更容易找到功能）
const getSearchKeywords = (moduleId) => {
  const keywordMap = {
    'virtual-list': ['列表', '虚拟', '滚动', '大数据', '性能', 'virtual', 'list', 'scroll'],
    'message-demo': ['消息', '通知', '提示', '弹窗', 'message', 'notification', 'toast'],
    'data-table': ['表格', '数据', 'table', 'data', 'grid'],
    'form': ['表单', '输入', '提交', 'form', 'input', 'submit'],
    'chart': ['图表', '可视化', '统计', 'chart', 'graph', 'visualization'],
    'upload': ['上传', '文件', '导入', 'upload', 'file', 'import'],
    'modal': ['对话框', '弹窗', 'modal', 'dialog'],
    'tree': ['树', '层级', '目录', 'tree', 'hierarchy'],
    'tabs': ['标签', '页签', '切换', 'tabs', 'switch'],
    'version-test': ['版本', '更新', '测试', 'version', 'update', 'test'],
    'food-delivery': ['外卖', '配送', '美食', 'food', 'delivery', 'restaurant'],
    'dashboard': ['看板', '数据', '统计', '图表', 'dashboard', 'analytics', 'stats'],
    'profile': ['个人', '用户', '资料', 'profile', 'user', 'account']
  }

  return keywordMap[moduleId] || []
}

// 搜索处理
const handleSearch = () => {
  // 搜索逻辑由 computed 自动处理
  console.log('搜索:', searchQuery.value, '找到结果:', filteredModules.value.length)
}

// 清空搜索
const clearSearch = () => {
  searchQuery.value = ''
  console.log('清空搜索')
}

const handleNavigate = (module) => {
  if (module.active) {
    router.push(module.route)
  } else {
    // 跳转到「开发中」占位页面，传递模块标题
    router.push({
      path: '/coming-soon',
      query: { title: module.title }
    })
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

// 页面加载时检查版本
onMounted(async () => {
  // 获取本地版本信息
  localVersionInfo.value = getLocalVersion()

  // 如果没有本地版本信息，先保存当前版本
  if (!localVersionInfo.value) {
    const baseUrl = window.location.origin
    const remoteVersion = await fetchRemoteVersion(baseUrl)
    if (remoteVersion) {
      saveLocalVersion(remoteVersion)
      localVersionInfo.value = remoteVersion
    }
  }

  // 检查版本更新
  await checkVersionUpdate()
})

// 检查版本更新
const checkVersionUpdate = async () => {
  if (isCheckingUpdate.value) return

  try {
    isCheckingUpdate.value = true
    const baseUrl = window.location.origin

    await checkForUpdates(
      baseUrl,
      // 没有更新
      () => {
        console.log('应用已是最新版本')
      },
      // 有更新（普通）
      (local, remote) => {
        console.log(`发现新版本: ${local.version} -> ${remote.version}`)
        showUpdateNotification(local, remote, false)
      },
      // 强制更新
      (remote) => {
        console.log(`需要强制更新: ${remote.version}`)
        const local = localVersionInfo.value || { version: '0.0.0' }
        showUpdateNotification(local, remote, true)
      }
    )
  } catch (error) {
    console.error('版本检查失败:', error)
  } finally {
    isCheckingUpdate.value = false
  }
}

// 显示更新通知
const showUpdateNotification = (local, remote, isForce) => {
  const changesText = remote.changes?.length > 0
    ? remote.changes.slice(0, 3).join('、')
    : '性能优化和问题修复'

  if (isForce) {
    // 强制更新：直接显示弹窗
    if (window.showUpdateDialog) {
      window.showUpdateDialog(local, remote, true)
    }
  } else {
    // 普通更新：先显示消息提示，然后显示弹窗
    message.success(`🆕 发现新版本 ${remote.version}：${changesText}`, {
      duration: 3000,
      onAfterLeave: () => {
        // 消息消失后显示更新弹窗
        if (window.showUpdateDialog) {
          setTimeout(() => {
            window.showUpdateDialog(local, remote, false)
          }, 500)
        }
      }
    })
  }

  // 保存远程版本信息供后续使用
  remoteVersionInfo.value = remote
}

// 手动检查更新
const handleCheckUpdate = async () => {
  if (isCheckingUpdate.value) {
    message.info('正在检查更新...')
    return
  }

  try {
    isCheckingUpdate.value = true
    message.info('正在检查更新...')

    const baseUrl = window.location.origin

    await checkForUpdates(
      baseUrl,
      // 没有更新
      () => {
        message.success('✅ 应用已是最新版本！')
      },
      // 有更新
      (local, remote) => {
        showUpdateNotification(local, remote, false)
      },
      // 强制更新
      (remote) => {
        const local = localVersionInfo.value || { version: '0.0.0' }
        showUpdateNotification(local, remote, true)
      }
    )
  } catch (error) {
    console.error('检查更新失败:', error)
    message.error('检查更新失败，请稍后重试')
  } finally {
    isCheckingUpdate.value = false
  }
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
  gap: 12px;
}

.update-check-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #4ECDC4;
  border: 3px solid #000000;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000000;
  box-shadow: 3px 3px 0px #000000;
}

.update-check-btn:hover {
  background-color: #3DB8B0;
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #000000;
}

.update-check-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px #000000;
}

.update-check-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.update-check-btn .btn-icon {
  font-size: 14px;
  transition: transform 0.3s;
}

.update-check-btn:hover .btn-icon {
  transform: rotate(180deg);
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
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 229, 255, 0.2);
  border: 3px solid #000000;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin-bottom: 24px;
  gap: 16px;
}

.hero-left {
  flex: 1;
}

.hero-right {
  flex-shrink: 0;
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
  margin: 4px 0 0 0;
  text-transform: uppercase;
}

/* 版本号徽章 */
.version-badge {
  display: inline-block;
  background-color: #4ECDC4;
  border: 3px solid #000000;
  padding: 8px 16px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  box-shadow: 3px 3px 0px #000000;
  white-space: nowrap;
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

/* 清空搜索按钮 */
.clear-search-btn {
  background: none;
  border: none;
  padding: 4px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.clear-search-btn:hover {
  transform: scale(1.1);
}

.clear-search-btn .material-symbols-outlined {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
}

/* 搜索结果信息 */
.search-results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  margin-top: 12px;
  background-color: #4ECDC4;
  border: 2px solid #000000;
  font-size: 12px;
  font-weight: 600;
}

.results-text {
  color: #000000;
  text-transform: uppercase;
}

.results-text strong {
  font-weight: 800;
}

.clear-text-btn {
  background: none;
  border: none;
  color: #000000;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: underline;
  padding: 4px 8px;
}

.clear-text-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 无搜索结果提示 */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
  margin-top: 24px;
  background-color: #FFF01F;
  border: 3px solid #000000;
}

.no-results-icon {
  font-size: 48px;
  color: #000000;
  margin-bottom: 16px;
}

.no-results-text {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 18px;
  color: #000000;
  font-weight: 800;
  margin: 0 0 8px 0;
  text-transform: uppercase;
}

.no-results-hint {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  margin: 0;
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

/* 版本信息区域 */
.version-section {
  padding: 0 20px;
  margin-bottom: 24px;
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

  /* 英雄区域小屏幕优化 */
  .hero-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-title {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 11px;
  }

  .version-badge {
    font-size: 14px;
    padding: 6px 12px;
  }

  /* 顶部栏小屏幕优化 */
  .update-check-btn {
    padding: 6px 12px;
    font-size: 11px;
  }

  .update-check-btn .btn-text {
    display: none;
  }

  .update-check-btn .btn-icon {
    font-size: 16px;
  }
}
</style>
