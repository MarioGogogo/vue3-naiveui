<template>
  <div class="dashboard-container">
    <!-- Top AppBar -->
    <header class="neo-header">
      <div class="flex items-center gap-sm">
        <button class="w-12 h-12 flex items-center justify-center bg-secondary-container neo-border-thick neo-shadow active-press">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <h1 class="font-headline-lg-mobile text-headline-lg-mobile font-black">数据看板</h1>
      </div>
      <div class="w-12 h-12 neo-border-thick bg-white overflow-hidden neo-shadow">
        <img class="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0wGey3OtESeUCDlA4owxOGLmWTB_alv-qDy3HsD_yX5UwZHp70MSP8Nt8Izcq81Ql2T6HipFrfcz0-HGicVrccM6NQ2lUEOTCPil7Uk1dO8V7toQzr_Z8VsuaL3a9HsvbKJ5HOuaVSemK16jWpPRKX0ISlgZ5is67ajRY7oAhSPRn57yNHxNaFNBXTMnAO9oF8FOqObQZPW7jRNvMb_mIpz73Yt5qwf4LdtLzc7PbvaC_cLNrSGWzyA" />
      </div>
    </header>

    <main class="pt-24 px-sm">
      <!-- Summary Stats Bento Grid -->
      <div class="grid grid-cols-2 gap-sm mb-lg">
        <div class="bg-primary-container neo-border-thick neo-shadow-lg p-sm flex flex-col justify-between stat-card">
          <div>
            <span class="font-label-md text-label-md bg-black text-white px-xs py-1 mb-xs inline-block">ACTIVE USERS</span>
            <p class="font-headline-lg text-headline-lg">{{ activeUsers.toLocaleString() }}</p>
          </div>
          <div class="flex items-center text-primary font-bold">
            <span class="material-symbols-outlined">trending_up</span>
            <span class="font-label-md text-label-md ml-1">+{{ userGrowth }}%</span>
          </div>
        </div>
        <div class="bg-secondary-container neo-border-thick neo-shadow-lg p-sm flex flex-col justify-between stat-card">
          <div>
            <span class="font-label-md text-label-md bg-black text-white px-xs py-1 mb-xs inline-block">CONVERSION</span>
            <p class="font-headline-lg text-headline-lg">{{ conversionRate }}%</p>
          </div>
          <div class="flex items-center text-on-secondary-container font-bold">
            <span class="material-symbols-outlined">trending_down</span>
            <span class="font-label-md text-label-md ml-1">-{{ conversionDrop }}%</span>
          </div>
        </div>
      </div>

      <!-- Main Chart Section -->
      <section class="bg-white neo-border-thick neo-shadow-lg mb-lg">
        <div class="bg-tertiary-container border-b-4 border-black p-sm flex justify-between items-center">
          <h2 class="font-headline-md text-headline-md">月度趋势数据</h2>
          <span class="material-symbols-outlined">more_vert</span>
        </div>
        <div class="p-sm">
          <div class="flex items-end justify-between h-48 gap-xs border-b-4 border-black mb-sm pb-1">
            <div v-for="(bar, index) in chartBars" :key="index"
              class="chart-bar w-full neo-border-thin"
              :class="getBarColor(index)"
              :style="{ height: bar.height + '%' }">
            </div>
          </div>
          <div class="flex justify-between font-label-md text-label-md text-on-surface-variant px-1">
            <span v-for="day in weekDays" :key="day">{{ day }}</span>
          </div>
        </div>
      </section>

      <!-- Progress Gauge Section -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-sm mb-lg">
        <div class="bg-white neo-border-thick neo-shadow-lg p-sm flex items-center gap-sm">
          <div class="relative w-32 h-32 flex-shrink-0">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle class="text-surface-container-highest" cx="50" cy="50" fill="transparent" r="40"
                stroke="black" stroke-width="8"></circle>
              <circle class="transition-all duration-1000" cx="50" cy="50" fill="transparent" r="40"
                stroke="#bb0054" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" stroke-width="8">
              </circle>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="font-headline-md text-headline-md">{{ salesProgress }}%</span>
            </div>
          </div>
          <div>
            <h3 class="font-headline-md text-headline-md mb-xs">销售指标</h3>
            <p class="font-body-md text-body-md text-on-surface-variant">距离年度目标还有 {{ remainingTarget }}</p>
            <button class="mt-sm bg-primary-container neo-border-thin px-sm py-xs font-label-md text-label-md neo-shadow active-press">
              查看详情
            </button>
          </div>
        </div>
      </section>

      <!-- Module Progress List -->
      <section class="bg-white neo-border-thick neo-shadow-lg mb-lg">
        <div class="bg-black text-white p-sm font-label-md text-label-md">
          模块运行状态
        </div>
        <div class="divide-y-2 divide-black">
          <div v-for="module in modules" :key="module.name"
            class="p-sm flex justify-between items-center hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-sm">
              <div class="w-10 h-10 neo-border-thin flex items-center justify-center" :class="module.bgClass">
                <span class="material-symbols-outlined">{{ module.icon }}</span>
              </div>
              <div>
                <p class="font-body-lg text-body-lg font-bold">{{ module.name }}</p>
                <p class="font-label-md text-label-md text-on-surface-variant">{{ module.status }}</p>
              </div>
            </div>
            <span class="neo-border-thin px-2 py-0.5 font-label-md text-label-md" :class="module.tagClass">{{ module.tag }}</span>
          </div>
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
import { ref, onMounted } from 'vue'

// 数据状态
const activeUsers = ref(12402)
const userGrowth = ref(14)
const conversionRate = ref(8.2)
const conversionDrop = ref(2)
const salesProgress = ref(75)
const remainingTarget = ref('2.4M')

// 图表数据
const chartBars = ref([
  { height: 40 },
  { height: 65 },
  { height: 50 },
  { height: 85 },
  { height: 60 },
  { height: 95 },
  { height: 75 }
])

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

// 进度环数据
const circumference = ref(251.2)
const dashOffset = ref(62.8)

// 模块数据
const modules = ref([
  {
    name: '虚拟列表组件',
    status: '100,000 条记录',
    icon: 'analytics',
    bgClass: 'bg-primary-container',
    tag: '正常',
    tagClass: 'bg-secondary-container'
  },
  {
    name: '数据表格',
    status: '同步中...',
    icon: 'database',
    bgClass: 'bg-tertiary-container',
    tag: '更新',
    tagClass: 'bg-primary-container'
  },
  {
    name: '系统性能',
    status: '平均负载 0.45',
    icon: 'settings_suggest',
    bgClass: 'bg-surface-container-highest',
    tag: '优化',
    tagClass: 'bg-black text-white'
  }
])

// 获取柱状图颜色
const getBarColor = (index) => {
  const colors = [
    'bg-primary',
    'bg-secondary-container',
    'bg-tertiary',
    'bg-primary-container',
    'bg-secondary',
    'bg-tertiary-container',
    'bg-primary'
  ]
  return colors[index] || 'bg-primary'
}

// 组件挂载时的动画
onMounted(() => {
  // 柱状图动画
  chartBars.value.forEach((bar, index) => {
    const originalHeight = bar.height
    bar.height = 0
    setTimeout(() => {
      bar.height = originalHeight
    }, 100 * index)
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@600&family=Noto+Sans+SC:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.dashboard-container {
  background-color: #f3fbfc;
  -webkit-tap-highlight-color: transparent;
  min-height: 100vh;
  font-family: 'Noto Sans SC', sans-serif;
  color: #151d1e;
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

.neo-border-thick {
  border: 4px solid #000000;
}

.neo-border-thin {
  border: 2px solid #000000;
}

.active-press:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px 0px #000000;
}

/* 顶部栏 */
.neo-header {
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;
  background: #f3fbfc;
  border-bottom: 4px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}

/* 字体样式 */
.font-headline-lg-mobile {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 800;
}

.font-headline-lg {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 800;
}

.font-headline-md {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 700;
}

.font-label-md {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 600;
}

.font-body-md {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}

.font-body-lg {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  font-weight: 500;
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

.bg-primary {
  background-color: #006875;
}

.bg-secondary {
  background-color: #705d00;
}

.bg-tertiary {
  background-color: #bb0054;
}

.bg-surface-container-highest {
  background-color: #dce4e5;
}

.bg-surface-container-low {
  background-color: #edf5f7;
}

.text-primary {
  color: #006875;
}

.text-on-secondary-container {
  color: #6f5c00;
}

.text-on-surface-variant {
  color: #3b494c;
}

.text-on-surface {
  color: #151d1e;
}

.text-on-primary-container {
  color: #00626e;
}

/* 间距类 */
.gap-sm {
  gap: 16px;
}

.gap-xs {
  gap: 8px;
}

.gap-lg {
  gap: 32px;
}

.mb-xs {
  margin-bottom: 8px;
}

.mb-sm {
  margin-bottom: 16px;
}

.mb-lg {
  margin-bottom: 32px;
}

.mt-xs {
  margin-top: 8px;
}

.mt-sm {
  margin-top: 16px;
}

.px-sm {
  padding-left: 16px;
  padding-right: 16px;
}

.py-xs {
  padding-top: 8px;
  padding-bottom: 8px;
}

.py-sm {
  padding-top: 16px;
  padding-bottom: 16px;
}

.pt-24 {
  padding-top: 96px;
}

.inline-block {
  display: inline-block;
}

/* 图表动画 */
.chart-bar {
  transition: height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

/* Grid 布局 */
.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.md\:grid-cols-2 {
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Flex 布局 */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.items-end {
  align-items: flex-end;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.gap-sm {
  gap: 16px;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.min-w-0 {
  min-width: 0;
}

/* 其他工具类 */
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.w-12 {
  width: 48px;
}

.h-12 {
  height: 48px;
}

.w-10 {
  width: 40px;
}

.h-10 {
  height: 40px;
}

.w-32 {
  width: 128px;
}

.h-32 {
  width: 128px;
}

.w-16 {
  width: 64px;
}

.h-16 {
  height: 64px;
}

.w-8 {
  width: 32px;
}

.h-8 {
  height: 32px;
}

.w-6 {
  width: 24px;
}

.h-6 {
  height: 24px;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.transform {
  transform: var(--transform);
}

.-rotate-90 {
  transform: rotate(-90deg);
}

.object-cover {
  object-fit: cover;
}

.overflow-hidden {
  overflow: hidden;
}

.text-white {
  color: white;
}

.divide-y-2 > :not([hidden]) ~ :not([hidden]) {
  border-top: 2px solid #000;
}

.divide-black > :not([hidden]) ~ :not([hidden]) {
  border-color: #000;
}

.transition-all {
  transition: all 0.1s;
}

.transition-colors {
  transition: background-color 0.2s, color 0.2s;
}

.transition-transform {
  transition: transform 0.1s;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>