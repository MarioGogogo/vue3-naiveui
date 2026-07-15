<template>
  <div class="profile-container">
    <!-- Top AppBar -->
    <header class="sticky-header">
      <div class="flex items-center gap-xs">
        <button class="back-btn">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="page-title">个人中心</h1>
      </div>
      <div class="header-avatar">
        <img class="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEkya9VHjhkdEzInEgzG422bEwUrMtVgwHRFpLZCMp-KMsjavw7AiPld6uocwjaB9uc6foyiexQuQVoKezFIkHcaYhurk5nfTbUg7MBbx1RbeCLxRYrICCP6H3xSuZx9pGAxLQnYUX2We7hGuNxxbfMB49QXThcM0KRt484fvJdu8a3fsvyk8FoEmin0kDnZF97URY8tqTbl-N8NanlGtAlooY7NVO3N9BlFwIUdNu2gTQ-JHH_XddJg" />
      </div>
    </header>

    <main class="main-content">
      <!-- Profile Header Section -->
      <section class="profile-header">
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar">
            <img class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd09adjfa-Qls63rggW_peFOdpsLMSyW0vcQpk1J6xb08xF37c4PcGv7OKle1J3Xub-wuECHX_rfn21N2cbof5hHNgtdZFUwVMTtd9vZhIXL9r5nZjgqWL-RT9HJnRoKojBiMxNZeY-a2nX7tgtCBknGIeBuxzCZogMIbBQcrqwJSONBoKaJuhxmu0fgZy-OQ2AZP6FqsN2GFgRXRKk4vXiFJaDpfBYRjtI7VF7V3Q9s2GUyfXn_T9jA" />
          </div>
          <div class="level-badge">
            <span class="badge-text">Level 24</span>
          </div>
        </div>
        <div class="profile-info">
          <h2 class="profile-name">张小帅</h2>
          <p class="profile-bio">@xiaoshuai_pro • 资深交互设计师</p>
        </div>
        <div class="profile-actions">
          <button class="edit-btn">编辑资料</button>
          <button class="settings-btn">
            <span class="material-symbols-outlined">settings</span>
          </button>
        </div>
      </section>

      <!-- Stats Grid (Bento Style) -->
      <section class="stats-grid">
        <div class="stat-card stat-primary">
          <span class="stat-number">1.2k</span>
          <span class="stat-label">粉丝</span>
        </div>
        <div class="stat-card stat-secondary">
          <span class="stat-number">856</span>
          <span class="stat-label">关注</span>
        </div>
        <div class="stat-card stat-tertiary">
          <span class="stat-number">48</span>
          <span class="stat-label">动态</span>
        </div>
      </section>

      <!-- Recent Achievements -->
      <section class="achievements-section">
        <div class="section-header">
          <h3 class="section-title">成就勋章</h3>
          <span class="section-action">查看全部</span>
        </div>
        <div class="achievements-list">
          <div class="achievement-item">
            <div class="achievement-icon achievement-secondary">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
            </div>
            <div class="achievement-content">
              <span class="achievement-title">社区贡献者</span>
              <span class="achievement-desc">累计发布超过 30 个开源模块</span>
            </div>
          </div>
          <div class="achievement-item">
            <div class="achievement-icon achievement-primary">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">bolt</span>
            </div>
            <div class="achievement-content">
              <span class="achievement-title">速度专家</span>
              <span class="achievement-desc">完成 100 次 24 小时内的快速交付</span>
            </div>
          </div>
          <div class="achievement-item">
            <div class="achievement-icon achievement-tertiary">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">verified_user</span>
            </div>
            <div class="achievement-content">
              <span class="achievement-title">核心协议成员</span>
              <span class="achievement-desc">受邀加入设计系统指导委员会</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Interests / Tags -->
      <section class="interests-section">
        <h3 class="section-title">专业领域</h3>
        <div class="tags-list">
          <span v-for="tag in interests" :key="tag"
            class="tag"
            :class="getTagClass(tag)"
            @click="toggleTag(tag)">
            {{ tag }}
          </span>
        </div>
      </section>
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

// 兴趣标签
const interests = ref([
  '用户界面设计',
  '新暴力主义',
  '前端交互',
  '用户体验',
  '动效设计'
])

const selectedTags = ref(new Set())

// 获取标签样式类
const getTagClass = (tag) => {
  const tagColors = {
    '用户界面设计': 'tag-white',
    '新暴力主义': 'tag-primary',
    '前端交互': 'tag-secondary',
    '用户体验': 'tag-white',
    '动效设计': 'tag-tertiary'
  }
  return tagColors[tag] || 'tag-white'
}

// 切换标签选择状态
const toggleTag = (tag) => {
  if (selectedTags.value.has(tag)) {
    selectedTags.value.delete(tag)
  } else {
    selectedTags.value.add(tag)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@600&family=Noto+Sans+SC:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.profile-container {
  background-color: #f3fbfc;
  font-family: 'Noto Sans SC', sans-serif;
  color: #151d1e;
  min-height: 100vh;
  padding-bottom: 120px;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.neo-shadow {
  box-shadow: 4px 4px 0px 0px #000000;
}

.neo-shadow-lg {
  box-shadow: 8px 8px 0px 0px #000000;
}

/* 头部 */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: #f3fbfc;
  border-bottom: 4px solid #000;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.back-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #000;
  background: white;
  cursor: pointer;
  transition: all 0.1s;
}

.back-btn:active {
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
  border: 4px solid #000;
  overflow: hidden;
  background: white;
}

/* 主内容区域 */
.main-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 个人信息头部 */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.profile-avatar-wrapper {
  position: relative;
}

.profile-avatar {
  width: 128px;
  height: 128px;
  border: 2px solid #000;
  background: white;
  overflow: hidden;
  box-shadow: 8px 8px 0px 0px #000;
  transform: rotate(3deg);
}

.level-badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: #fdd400;
  border: 2px solid #000;
  padding: 0 8px;
  box-shadow: 4px 4px 0px 0px #000;
  transform: rotate(-2deg);
}

.badge-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #6f5c00;
}

.profile-info {
  text-align: center;
}

.profile-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #151d1e;
}

.profile-bio {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #3b494c;
}

.profile-actions {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 384px;
  margin-top: 8px;
}

.edit-btn {
  flex: 1;
  padding: 0 8px;
  background: #00e5ff;
  color: #00626e;
  border: 4px solid #000;
  font-weight: 700;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
}

.edit-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.settings-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 4px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
}

.settings-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

/* 统计数据网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  border: 4px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
}

.stat-primary {
  background: #9cf0ff;
}

.stat-secondary {
  background: #ffe170;
}

.stat-tertiary {
  background: #ffd9df;
}

.stat-number {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #151d1e;
}

.stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #3b494c;
}

/* 成就部分 */
.achievements-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
}

.section-action {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #006875;
  font-weight: 700;
}

.achievements-list {
  background: white;
  border: 4px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #000;
}

.achievement-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  padding-top: 8px;
}

.achievement-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-secondary {
  background: #fdd400;
  color: #6f5c00;
}

.achievement-primary {
  background: #00e5ff;
  color: #00626e;
}

.achievement-tertiary {
  background: #ffc0cc;
  color: #b1004f;
}

.achievement-content {
  display: flex;
  flex-direction: column;
}

.achievement-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.achievement-desc {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #3b494c;
}

/* 兴趣标签 */
.interests-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  border: 2px solid #000;
  padding: 4px 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
}

.tag:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.tag-white {
  background: white;
}

.tag-primary {
  background: #00e5ff;
}

.tag-secondary {
  background: #fdd400;
}

.tag-tertiary {
  background: #ffc0cc;
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
  background: #ffc0cc;
  border: 4px solid #000;
  padding: 12px 24px;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
  transition: all 0.1s;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #b1004f;
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

.gap-xs {
  gap: 8px;
}

.gap-sm {
  gap: 16px;
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
</style>