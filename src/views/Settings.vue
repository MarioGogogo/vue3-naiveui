<template>
  <div class="settings-container">
    <!-- Top AppBar -->
    <header class="sticky-header">
      <div class="flex items-center gap-sm">
        <button class="menu-btn">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <h1 class="page-title">系统设置</h1>
      </div>
      <div class="header-avatar">
        <img class="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASFmtoNp2usFriA30HeEhQc0TR1XKNtBNMptdolSP8szQgfgyWozNZoRseikzU_De_1KQnXVilgc1CE7y9jU-qPpAadj_Jerix887i2PQ92mNUke8fDWAOQAh-UMksx4Bxtfsm6wJ5xQgvLBAeKXt1Pu1VFsfKQ80DpSGMarNSGpACO1tg6TZEPJQ5tNw8SfKQAeSVpYiwJbzS9jKmibMh83Ky_38nKWINeAPw5DgdXynIxy-12cXRvw" />
      </div>
    </header>

    <!-- Content Canvas -->
    <main class="main-content">
      <!-- User Profile Quick Card -->
      <div class="profile-card">
        <div class="admin-badge">
          管理员权限
        </div>
        <div class="profile-content">
          <div class="profile-avatar-large">
            <img class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJdYA9nrWMjt96xTAACrVQ5my3bEhPGC990IeLEHJWSR_YaxBiV_6W5l0dHDI2eu3KRC3RYaNN2pScwGlywetGJnHOYRxylP7TWmElYWFY378aoQe36kq-9VFMrnVr-Yajpmcc8BZr5lUq6kO5MkCDLUTRXqpzcN1Cx0Mf9wxjiC4lqdb1rACOUxLpwgDpG8ipFSZK6aP34Qw8XUke5oYAqPmZSVaE-mlJCWDMJ_rWV6Kz8YXBRkL98w" />
          </div>
          <div class="profile-info">
            <h2 class="profile-email">admin@system.com</h2>
            <p class="profile-last-login">上次登录: {{ lastLogin }}</p>
          </div>
        </div>
      </div>

      <!-- Settings List -->
      <section class="settings-list">
        <!-- Account -->
        <button class="setting-item active-depress">
          <div class="setting-left">
            <div class="setting-icon setting-primary">
              <span class="material-symbols-outlined">person</span>
            </div>
            <span class="setting-label">个人中心</span>
          </div>
          <span class="material-symbols-outlined arrow-icon">arrow_forward</span>
        </button>

        <!-- Privacy -->
        <button class="setting-item active-depress">
          <div class="setting-left">
            <div class="setting-icon setting-secondary">
              <span class="material-symbols-outlined">security</span>
            </div>
            <span class="setting-label">隐私安全</span>
          </div>
          <span class="material-symbols-outlined arrow-icon">arrow_forward</span>
        </button>

        <!-- Notifications -->
        <div class="setting-item">
          <div class="setting-left">
            <div class="setting-icon setting-tertiary">
              <span class="material-symbols-outlined">notifications</span>
            </div>
            <span class="setting-label">消息提醒</span>
          </div>
          <!-- Neo-Brutalist Toggle -->
          <label class="toggle-switch">
            <input type="checkbox" v-model="notificationEnabled" class="sr-only" />
            <div class="toggle-track"></div>
            <div class="toggle-thumb"></div>
          </label>
        </div>

        <!-- Display -->
        <button class="setting-item active-depress">
          <div class="setting-left">
            <div class="setting-icon setting-outline">
              <span class="material-symbols-outlined">palette</span>
            </div>
            <span class="setting-label">显示设置</span>
          </div>
          <span class="material-symbols-outlined arrow-icon">arrow_forward</span>
        </button>

        <!-- Storage -->
        <div class="setting-item storage-item">
          <div class="setting-left">
            <div class="setting-icon setting-secondary-fixed">
              <span class="material-symbols-outlined">database</span>
            </div>
            <span class="setting-label">存储空间</span>
          </div>
          <span class="storage-label">{{ storageUsed }}</span>
        </div>
        <div class="storage-bar-wrapper">
          <div class="storage-bar">
            <div class="storage-bar-fill" :style="{ width: storagePercentage }"></div>
          </div>
        </div>

        <!-- About -->
        <button class="setting-item active-depress">
          <div class="setting-left">
            <div class="setting-icon setting-primary-fixed">
              <span class="material-symbols-outlined">info</span>
            </div>
            <span class="setting-label">关于系统</span>
          </div>
          <div class="setting-right">
            <span class="version-badge">v1.0.13</span>
            <span class="material-symbols-outlined arrow-icon">arrow_forward</span>
          </div>
        </button>
      </section>

      <!-- Logout Button -->
      <button class="logout-btn">
        <span class="material-symbols-outlined">logout</span>
        退出登录
      </button>
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
import { ref } from 'vue'

// 数据状态
const lastLogin = ref('2024-05-20 14:30')
const notificationEnabled = ref(true)
const storageUsed = ref('已用 85%')
const storagePercentage = ref('85%')
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@600&family=Noto+Sans+SC:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.settings-container {
  background-color: #f3fbfc;
  font-family: 'Noto Sans SC', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
}

.neo-shadow {
  box-shadow: 4px 4px 0px 0px #000000;
}

.neo-shadow-lg {
  box-shadow: 8px 8px 0px 0px #000000;
}

.active-depress:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px 0px #000000;
}

/* 头部 */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #f3fbfc;
  border-bottom: 4px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
}

.menu-btn {
  width: 48px;
  height: 48px;
  border: 4px solid #000;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
}

.menu-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.page-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #151d1e;
}

.header-avatar {
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  background: #fdd400;
  overflow: hidden;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 用户信息卡片 */
.profile-card {
  background: white;
  border: 4px solid #000;
  padding: 24px;
  box-shadow: 4px 4px 0px 0px #000;
  position: relative;
  overflow: hidden;
}

.admin-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #00e5ff;
  border-left: 4px solid #000;
  border-bottom: 4px solid #000;
  padding: 0 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
}

.profile-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.profile-avatar-large {
  width: 80px;
  height: 80px;
  border: 4px solid #000;
  background: #ffc0cc;
  box-shadow: 4px 4px 0px 0px #000;
}

.profile-email {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #151d1e;
}

.profile-last-login {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #3b494c;
}

/* 设置列表 */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 4px solid #000;
  padding: 24px;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
}

.setting-item.active-depress:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.setting-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.setting-icon {
  width: 48px;
  height: 48px;
  border: 4px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.setting-primary {
  background: #00e5ff;
}

.setting-secondary {
  background: #fdd400;
}

.setting-tertiary {
  background: #ffc0cc;
}

.setting-outline {
  background: #bac9cc;
}

.setting-secondary-fixed {
  background: #ffe170;
}

.setting-primary-fixed {
  background: #9cf0ff;
}

.setting-label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #151d1e;
}

.arrow-icon {
  color: #000;
  font-size: 30px;
}

.setting-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.storage-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
}

.version-badge {
  background: #fdd400;
  border: 2px solid #000;
  padding: 0 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
}

/* 存储进度条 */
.storage-item {
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
}

.storage-bar-wrapper {
  width: 100%;
  background: white;
  border: 4px solid #000;
  padding: 24px;
  box-shadow: 4px 4px 0px 0px #000;
  padding-top: 0;
}

.storage-bar {
  width: 100%;
  height: 24px;
  border: 4px solid #000;
  background: #edf5f7;
  position: relative;
}

.storage-bar-fill {
  height: 100%;
  background: #bb0054;
  border-right: 4px solid #000;
  transition: width 0.5s ease;
}

/* 切换开关 */
.toggle-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.toggle-track {
  width: 64px;
  height: 32px;
  background: #dce4e5;
  border: 4px solid #000;
  transition: background-color 0.2s;
}

.toggle-thumb {
  position: absolute;
  left: 4px;
  top: 4px;
  width: 24px;
  height: 24px;
  background: white;
  border: 4px solid #000;
  transition: transform 0.2s;
}

input:checked + .toggle-track {
  background: #00e5ff;
}

input:checked + .toggle-track + .toggle-thumb {
  transform: translateX(32px);
}

/* 退出登录按钮 */
.logout-btn {
  width: 100%;
  background: #bb0054;
  color: white;
  border: 4px solid #000;
  padding: 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  box-shadow: 4px 4px 0px 0px #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.1s;
}

.logout-btn:active {
  transform: translate(4px, 4px);
  box-shadow: none;
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
  background: #fdd400;
  border: 4px solid #000;
  padding: 12px 24px;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #6f5c00;
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

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.object-cover {
  object-fit: cover;
}

.overflow-hidden {
  overflow: hidden;
}

.font-bold {
  font-weight: 700;
}

.flex-1 {
  flex: 1 1 0%;
}

.text-black {
  color: #000;
}
</style>