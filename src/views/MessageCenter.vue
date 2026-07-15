<template>
  <div class="message-center-container">
    <!-- TopAppBar -->
    <header class="sticky-header">
      <div class="flex items-center gap-sm">
        <button class="menu-btn active-press">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <h1 class="page-title">消息中心</h1>
      </div>
      <div class="flex items-center gap-sm">
        <button class="read-all-btn active-press">
          <span class="material-symbols-outlined">refresh</span>
          全部已读
        </button>
        <div class="avatar-circle neo-shadow">
          <img class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7fwHqfToQIbSizhrTFVDbbC7KOStEAKcquiiFMETzgpf7TF_LhHx39qZMF2tCTTSeB_zqAv8K-pExrnfowUJ8JaOOGWHP3BawZeF-Vo71YurPr7mm59UajpsBT1tmiuUUlhfZjzpqA02SV03yKNHECf-8RmkZGNhnMrrhzq2ZfZSaL-uxG7jhIJa5BADWXpI9LvCxEiCLYCC3TZ1_I4KiP5bNDz8BirStwOz_QAeTloTr42YN5m0OYg" />
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Search Bar -->
      <div class="search-bar">
        <div class="search-icon">
          <span class="material-symbols-outlined">search</span>
        </div>
        <input
          class="search-input"
          placeholder="搜索消息或联系人..."
          type="text"
          v-model="searchQuery"
        />
      </div>

      <!-- Notification List -->
      <div class="message-list">
        <!-- Unread Message Card -->
        <div v-for="message in filteredMessages" :key="message.id"
          class="message-card neo-shadow"
          :class="{ 'unread': message.unread, 'read': !message.unread }">
          <div class="message-avatar-wrapper" v-if="message.type !== 'system'">
            <div class="message-avatar" :class="message.avatarBg">
              <img class="w-full h-full object-cover" :src="message.avatar" />
            </div>
            <div v-if="message.unread" class="unread-dot"></div>
          </div>
          <div v-else class="message-avatar-wrapper">
            <div class="message-avatar system-avatar">
              <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">
                notifications_active
              </span>
            </div>
          </div>
          <div class="message-content">
            <div class="message-header">
              <h3 class="sender-name">{{ message.sender }}</h3>
              <span class="message-time" :class="{ 'time-badge': message.unread }">
                {{ message.time }}
              </span>
            </div>
            <p class="message-text" :class="{ 'font-bold': message.unread }">
              {{ message.content }}
            </p>
            <div v-if="message.unread" class="message-actions">
              <button class="action-btn action-secondary">查看详情</button>
              <button class="action-btn action-white">回复</button>
            </div>
            <div v-if="message.type === 'system' && message.unread" class="message-actions">
              <button class="action-btn action-danger">安全中心</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats Bento Section -->
      <div class="stats-grid">
        <div class="stat-card stat-secondary">
          <div class="flex items-center gap-xs mb-xs">
            <span class="material-symbols-outlined text-lg">mail</span>
            <span class="font-label-md text-label-md">总消息</span>
          </div>
          <div class="text-display-lg font-display-lg">{{ totalMessages }}</div>
        </div>
        <div class="stat-card stat-primary">
          <div class="flex items-center gap-xs mb-xs">
            <span class="material-symbols-outlined text-lg">mark_chat_unread</span>
            <span class="font-label-md text-label-md">未读</span>
          </div>
          <div class="text-display-lg font-display-lg">{{ unreadCount }}</div>
        </div>
      </div>
    </main>

    <!-- 返回首页按钮 -->
    <div class="back-home-container">
      <button class="back-home-btn" @click="$router.push('/')">
        <span class="material-symbols-outlined">home</span>
        <span class="btn-label">返回首页</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索状态
const searchQuery = ref('')

// 消息数据
const messages = ref([
  {
    id: 1,
    sender: '沈十八',
    time: '10:45 AM',
    content: '你好，关于昨天的架构设计方案我已经更新了，麻烦有空确认一下 GitHub 上的 PR。',
    unread: true,
    type: 'user',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXnHjkNeE_SiGKwsrCaC00lxfY3_iKjOEXLqNiE_PJcAYsfUaA2jGDDBcMmsekKpSItBeiOEfL2kloJuVODsw3jucLSKqElKPnoBwPk_8NI58LKulv953aHQoG6VOI8EebP4SbTCD8hBQmpmF6aKYbKh3AHpw7qQdrZXdbfCi05mA9hTYqlC65ysSnlDXvQ5HZJl2MdKcfnpYL8f_pg-7AohnXsMx8I3zyzp55JwxXtNttu7i8R8Wkfg',
    avatarBg: 'bg-secondary-container'
  },
  {
    id: 2,
    sender: '孙八',
    time: '昨天 18:20',
    content: 'UI 组件库已经全部迁移到 Figma 设计系统中了，这是新的链接...',
    unread: false,
    type: 'user',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkyiYc3KxyBHi9fU3g2xovB_YIYVNJo8ObieQ_Ior-syUhlXEQDqRTJ_-FFoS7miuCwQTA7sLX9LUslfqW2SSCTrTtMhuJ_DI_0nD4r7BlqPB4zj8R-AEsMdPA5djPcCkVFBG7cojAEdhTWVNCgarf34oirt2FHaT_oTB4pKsoT7FB7zc1RjHE8gvfY5wHC85qbvuA1V4iXFexh7-Tm44uUXJJ9GSErApJMSxF3FUSRiOJXTdum5Yvzw',
    avatarBg: 'bg-primary-container'
  },
  {
    id: 3,
    sender: '系统通知',
    time: '昨天 15:10',
    content: '您的账号在新的设备上登录。如果非本人操作，请立即修改密码。',
    unread: true,
    type: 'system',
    avatar: '',
    avatarBg: 'bg-secondary-container'
  },
  {
    id: 4,
    sender: '王五',
    time: '05-18',
    content: '关于下周的技术分享会，我想聊聊微前端架构在大型项目中的实践，你觉得怎么样？',
    unread: false,
    type: 'user',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClVaTzygp-wifoDKyYirrUQHhMKbF4ZSe0KGcE7SBwCCTXyggGolQHuUFFLC1P0na2yzIuWYmirtf9ZQuHwSR7ArEX54Uq-RAsPt9cnztAq6yp9siOfqZRGM3wBVR4XmpA1NlR0q-oeVwdfHHuGax_QPyzCrWoU6yAoOV4EbY3m8AGJscEKnBAOmraiaTSscK1-eBC3ponb21xf-Gg9miWHyoFQuHycyHTzfq543DDPoA22D4ZDiugvQ',
    avatarBg: 'bg-surface-container-highest'
  },
  {
    id: 5,
    sender: '周九',
    time: '05-15',
    content: '订单 ORD005000 已经审核通过，进入发货流程。',
    unread: false,
    type: 'user',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmskIDuyjd-fettTaUlj2ewp4zC9Q_kSMYdtHx74iI7RzQ25TkyqsdrE12o6fh_qjZcqMdY0rYjP7dD-1F3WOEmAI_JlDdswlOVwEi8fKVM4gkfXXzhTww_HcRYenWtIb0xEfiNhOwql3LsD-YkqHRidaNWstDY5nOygicrrsiucvHnXp-SOjmeVgft59LGq05qIvygjq2lJZKDZtqeaIOjgg9ufjosUwg0DaF18aHFqGipG51ZzL6nw',
    avatarBg: 'bg-tertiary-container'
  }
])

// 统计数据
const totalMessages = ref(128)
const unreadCount = ref(2)

// 过滤消息
const filteredMessages = computed(() => {
  if (!searchQuery.value) {
    return messages.value
  }
  const query = searchQuery.value.toLowerCase()
  return messages.value.filter(message =>
    message.sender.toLowerCase().includes(query) ||
    message.content.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@600&family=Noto+Sans+SC:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.message-center-container {
  background-color: #f3fbfc;
  color: #151d1e;
  font-family: 'Noto Sans SC', sans-serif;
  min-height: 100vh;
  padding-bottom: 120px;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  display: inline-block;
  vertical-align: middle;
}

.neo-shadow {
  box-shadow: 4px 4px 0px 0px #000000;
}

.active-press:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #000000;
}

/* 头部 */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #f3fbfc;
  border-bottom: 4px solid #000;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.menu-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
}

.read-all-btn {
  height: 40px;
  padding: 0 16px;
  border: 2px solid #000;
  background: #00e5ff;
  color: #00626e;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 4px 4px 0px 0px #000;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.page-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #151d1e;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 9999px;
  overflow: hidden;
}

/* 主内容区域 */
.main-content {
  padding: 16px;
  max-width: 672px;
  margin: 0 auto;
}

.main-content > * + * {
  margin-top: 24px;
}

/* 搜索栏 */
.search-bar {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 16px;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 64px;
  border: 4px solid #000;
  background: white;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  box-shadow: 4px 4px 0px 0px #000;
}

.search-input:focus {
  background: #00e5ff;
}

.search-input::placeholder {
  color: #3b494c;
}

/* 消息列表 */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-card {
  border: 4px solid #000;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: transform 0.1s;
  cursor: pointer;
}

.message-card:active {
  transform: scale(0.98);
}

.message-card.unread {
  background: #ffc0cc;
}

.message-card.read {
  background: white;
}

.message-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.message-avatar {
  width: 56px;
  height: 56px;
  border: 2px solid #000;
  border-radius: 9999px;
  overflow: hidden;
  box-shadow: 4px 4px 0px 0px #000;
}

.system-avatar {
  background: #fdd400;
  display: flex;
  align-items: center;
  justify-content: center;
}

.unread-dot {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  background: #bb0054;
  border: 2px solid #000;
  border-radius: 9999px;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.sender-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #151d1e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-time {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #3b494c;
  white-space: nowrap;
}

.time-badge {
  background: white;
  border: 2px solid #000;
  padding: 0 4px;
  color: #151d1e;
}

.message-text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.message-text.font-bold {
  font-weight: 700;
  color: #151d1e;
}

.message-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.action-btn {
  padding: 4px 16px;
  border: 2px solid #000;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
}

.action-secondary {
  background: #fdd400;
  color: #6f5c00;
}

.action-white {
  background: white;
  color: #151d1e;
}

.action-danger {
  background: #ba1a1a;
  color: white;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-card {
  border: 4px solid #000;
  padding: 16px;
  box-shadow: 4px 4px 0px 0px #000;
}

.stat-secondary {
  background: #fdd400;
}

.stat-primary {
  background: #00e5ff;
}

.text-display-lg {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 800;
}

.font-display-lg {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 800;
}

/* 返回首页按钮 */
.back-home-container {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
}

.back-home-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #00e5ff;
  border: 4px solid #000;
  padding: 12px 24px;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #00626e;
}

.back-home-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #000;
}

.back-home-btn:active {
  transform: translate(0, 0);
  box-shadow: 0px 0px 0px 0px #000;
}

.back-home-btn .material-symbols-outlined {
  font-size: 20px;
}

.btn-label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 700;
}

/* 工具类 */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-sm {
  gap: 16px;
}

.gap-xs {
  gap: 8px;
}

.mb-xs {
  margin-bottom: 8px;
}

.text-lg {
  font-size: 18px;
}

.text-3xl {
  font-size: 30px;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.overflow-hidden {
  overflow: hidden;
}

.object-cover {
  object-fit: cover;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.transition-transform {
  transition: transform 0.1s;
}

.shrink-0 {
  flex-shrink: 0;
}

.min-w-0 {
  min-width: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 颜色类 */
.bg-primary-container {
  background-color: #00e5ff;
}

.bg-secondary-container {
  background-color: #fdd400;
}

.bg-tertiary-container {
  background-color: #ffc0cc;
}

.bg-surface-container-highest {
  background-color: #dce4e5;
}

.text-on-surface {
  color: #151d1e;
}

.text-on-surface-variant {
  color: #3b494c;
}

.text-on-primary-container {
  color: #00626e;
}

.text-on-secondary-container {
  color: #6f5c00;
}

.text-on-error {
  color: white;
}

.bg-error {
  background-color: #ba1a1a;
}
</style>