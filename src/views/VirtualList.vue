<template>
  <div class="virtual-list-container">
    <!-- Neo-Brutalism 顶部栏 -->
    <div class="neo-header">
      <button class="neo-back-btn" @click="goBack">
        <span class="material-symbols-outlined">arrow_back_ios</span>
        <span class="back-text">返回</span>
      </button>
      <div class="header-info">
        <h1 class="neo-title">虚拟列表</h1>
        <p class="neo-subtitle">100,000 条数据</p>
      </div>
    </div>

    <!-- 虚拟列表 -->
    <div class="list-wrapper">
      <n-spin :show="loading">
        <n-virtual-list
          :item-size="80"
          :items="data"
          :item-resizable="true"
          class="virtual-list"
          key-field="id"
        >
          <template #default="{ item, index }">
            <div
              :key="item.id"
              class="neo-list-item"
              :style="{ '--accent-color': getAccentColor(index) }"
            >
              <div class="neo-avatar">
                <span class="material-symbols-outlined avatar-icon material-filled">account_circle</span>
              </div>
              <div class="item-content">
                <div class="neo-name">{{ item.name }}</div>
                <div class="neo-email">{{ item.email }}</div>
                <div class="neo-desc">{{ item.description }}</div>
              </div>
              <div class="item-actions">
                <n-space size="small">
                  <button class="neo-btn neo-btn-view" @click.stop="handleView(item)">
                    <span class="material-symbols-outlined">search</span>
                    查看
                  </button>
                  <button class="neo-btn neo-btn-edit" @click.stop="handleEdit(item)">
                    <span class="material-symbols-outlined">edit_note</span>
                    编辑
                  </button>
                </n-space>
              </div>
            </div>
          </template>
        </n-virtual-list>
      </n-spin>
    </div>

    <!-- Neo-Brutalism 底部统计 -->
    <div class="neo-stats-bar">
      <div class="neo-stat-box">
        <span class="material-symbols-outlined stat-icon">database</span>
        <div class="stat-content">
          <span class="neo-stat-label">总数据</span>
          <span class="neo-stat-value">{{ data.length.toLocaleString() }}</span>
        </div>
      </div>
      <div class="neo-stat-box">
        <span class="material-symbols-outlined stat-icon">done_all</span>
        <div class="stat-content">
          <span class="neo-stat-label">已加载</span>
          <span class="neo-stat-value">{{ data.length.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import neoMessage from '@/utils/message'

const router = useRouter()
const message = neoMessage
const loading = ref(false)
const data = ref([])

// 生成模拟数据
const generateData = () => {
  const names = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑十一', '王十二', '冯十三', '陈十四', '褚十五', '卫十六', '蒋十七',
    '沈十八', '韩十九', '杨二十'
  ]

  const domains = ['qq.com', '163.com', 'gmail.com', 'outlook.com', 'yahoo.com']

  const descriptions = [
    '资深前端工程师，专注于 Vue.js 开发',
    '全栈开发工程师，熟悉 Node.js 和 Python',
    'UI/UX 设计师，追求完美的用户体验',
    '后端架构师，擅长微服务架构设计',
    '产品经理，对用户需求有深刻理解',
    '数据分析师，精通 SQL 和 Python',
    'DevOps 工程师，熟悉 CI/CD 流程',
    '移动端开发专家，iOS 和 Android 双修',
    '测试工程师，注重代码质量',
    '技术文档编写者，善于技术分享'
  ]

  const total = 100000
  const result = []

  for (let i = 1; i <= total; i++) {
    const name = names[Math.floor(Math.random() * names.length)] + i
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]

    result.push({
      id: i,
      name: name,
      email: `${Math.random().toString(36).substring(7)}@${domain}`,
      description: description,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    })
  }

  return result
}

// 加载数据
const loadData = () => {
  loading.value = true
  setTimeout(() => {
    data.value = generateData()
    loading.value = false
    message.success('数据加载完成，共 10 万条记录')
  }, 800)
}

// 查看详情
const handleView = (item) => {
  message.info(`查看用户：${item.name}`)
}

// 编辑
const handleEdit = (item) => {
  message.success(`编辑用户：${item.name}`)
}

// 返回首页
const goBack = () => {
  router.push('/')
}

// Neo-Brutalism 配色方案
const accentColors = [
  '#FF6B6B', // 红
  '#4ECDC4', // 青
  '#FFE66D', // 黄
  '#95E1D3', // 薄荷
  '#F38181', // 珊瑚
  '#AA96DA', // 紫
  '#FCBAD3', // 粉
  '#A8E6CF', // 绿
  '#FFB347', // 橙
  '#77DD77', // 草绿
]

const getAccentColor = (index) => {
  return accentColors[index % accentColors.length]
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

:deep(.material-symbols-outlined) {
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

:deep(.material-filled) {
  font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

.virtual-list-container {
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

.neo-back-btn .material-symbols-outlined {
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

/* 列表容器 */
.list-wrapper {
  flex: 1;
  background: #FFFFF0;
  margin: 0;
  padding: 16px;
}

.virtual-list {
  height: calc(100vh - 140px);
}

/* Neo-Brutalism 列表项 */
.neo-list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 3px solid #000;
  margin-bottom: 12px;
  gap: 16px;
  background: #FFF;
  box-shadow: 5px 5px 0px #000;
  transition: all 0.1s;
  cursor: pointer;
}

.neo-list-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0px #000;
}

.neo-list-item:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0px #000;
}

.neo-avatar {
  width: 52px;
  height: 52px;
  border-radius: 0;
  background: var(--accent-color, #4ECDC4);
  border: 3px solid #000;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 3px 3px 0px #000;
}

.avatar-icon {
  font-size: 28px;
  font-weight: 900;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.neo-name {
  font-weight: 900;
  font-size: 18px;
  color: #000;
  margin-bottom: 4px;
  line-height: 1.2;
}

.neo-email {
  font-size: 12px;
  font-weight: 700;
  color: #000;
  margin-bottom: 4px;
  opacity: 0.6;
}

.neo-desc {
  font-size: 11px;
  font-weight: 600;
  color: #000;
  opacity: 0.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-actions {
  flex-shrink: 0;
}

/* Neo-Brutalism 按钮 */
.neo-btn {
  padding: 8px 16px;
  border: 3px solid #000;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 3px 3px 0px #000;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.neo-btn .material-symbols-outlined {
  font-size: 14px;
}

.neo-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #000;
}

.neo-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #000;
}

.neo-btn-view {
  background: #FFE66D;
  color: #000;
}

.neo-btn-edit {
  background: #4ECDC4;
  color: #000;
}

/* Neo-Brutalism 底部统计栏 */
.neo-stats-bar {
  background: #FFE66D;
  border-top: 4px solid #000;
  padding: 16px;
  display: flex;
  justify-content: center;
  gap: 24px;
  position: sticky;
  bottom: 0;
  z-index: 10;
  box-shadow: 0 -6px 0px #000;
}

.neo-stat-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #FFF;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
}

.stat-icon {
  font-size: 28px;
  font-weight: 900;
  color: #000;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.neo-stat-label {
  font-size: 11px;
  color: #000;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.neo-stat-value {
  font-size: 20px;
  color: #000;
  font-weight: 900;
  line-height: 1;
}

/* 小屏幕优化 */
@media (max-width: 360px) {
  .neo-header {
    padding: 12px;
  }

  .neo-title {
    font-size: 20px;
  }

  .neo-subtitle {
    font-size: 12px;
  }

  .neo-list-item {
    padding: 12px;
    gap: 12px;
  }

  .neo-avatar {
    width: 44px;
    height: 44px;
    font-size: 20px;
  }

  .neo-name {
    font-size: 16px;
  }

  .neo-email {
    font-size: 11px;
  }

  .neo-desc {
    font-size: 10px;
  }

  .neo-btn {
    padding: 6px 12px;
    font-size: 11px;
  }

  .neo-stat-box {
    padding: 10px 16px;
  }

  .neo-stat-value {
    font-size: 16px;
  }
}
</style>
