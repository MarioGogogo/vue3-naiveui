<template>
  <div class="virtual-list-container">
    <!-- 紧凑的顶部栏 -->
    <div class="compact-header">
      <button class="back-button" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">返回</span>
      </button>
      <div class="header-info">
        <h1 class="title">虚拟列表示例</h1>
        <p class="subtitle">10万条数据流畅滚动</p>
      </div>
    </div>

    <!-- 虚拟列表 -->
    <div class="list-wrapper">
      <n-spin :show="loading">
        <n-virtual-list
          :item-size="72"
          :items="data"
          :item-resizable="true"
          class="virtual-list"
          key-field="id"
        >
          <template #default="{ item, index }">
            <div
              :key="item.id"
              class="list-item"
              :class="{ even: index % 2 === 0 }"
            >
              <div class="item-avatar">
                {{ item.name.charAt(0) }}
              </div>
              <div class="item-content">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-email">{{ item.email }}</div>
                <div class="item-description">{{ item.description }}</div>
              </div>
              <div class="item-actions">
                <n-space size="small">
                  <n-button size="tiny" @click.stop="handleView(item)">
                    查看
                  </n-button>
                  <n-button size="tiny" type="primary" @click.stop="handleEdit(item)">
                    编辑
                  </n-button>
                </n-space>
              </div>
            </div>
          </template>
        </n-virtual-list>
      </n-spin>
    </div>

    <!-- 底部统计 -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-label">总数据</span>
        <span class="stat-value">{{ data.length.toLocaleString() }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">已加载</span>
        <span class="stat-value">{{ data.length.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()
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

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.virtual-list-container {
  min-height: 100vh;
  background: #fbf8fc;
  display: flex;
  flex-direction: column;
}

/* 紧凑的顶部栏 */
.compact-header {
  background: #fbf8fc;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e4e1e6;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  color: #00685f;
}

.back-button:active {
  background: #e8f8ef;
  transform: scale(0.95);
}

.back-icon {
  font-size: 18px;
  font-weight: 600;
}

.back-text {
  font-size: 14px;
  font-weight: 500;
}

.header-info {
  flex: 1;
}

.title {
  font-family: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #1b1b1e;
  margin: 0;
}

.subtitle {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #3d4947;
  margin: 2px 0 0 0;
  opacity: 0.7;
}

/* 列表容器 */
.list-wrapper {
  flex: 1;
  background: white;
  margin: 0;
  padding: 0;
}

.virtual-list {
  height: calc(100vh - 100px);
}

/* 列表项 */
.list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  gap: 12px;
  transition: background 0.2s;
}

.list-item:active {
  background: #f8f9fa;
}

.list-item.even {
  background: #fafafa;
}

.item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}

.item-email {
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
}

.item-description {
  font-size: 11px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-actions {
  flex-shrink: 0;
}

/* 底部统计栏 */
.stats-bar {
  background: #fbf8fc;
  border-top: 1px solid #e4e1e6;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  gap: 32px;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-label {
  font-size: 10px;
  color: #3d4947;
  opacity: 0.7;
  font-weight: 500;
}

.stat-value {
  font-size: 14px;
  color: #00685f;
  font-weight: 600;
}

/* 小屏幕优化 */
@media (max-width: 360px) {
  .compact-header {
    padding: 10px 12px;
  }

  .title {
    font-size: 14px;
  }

  .subtitle {
    font-size: 11px;
  }

  .list-item {
    padding: 10px 12px;
    gap: 8px;
  }

  .item-avatar {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }

  .item-name {
    font-size: 13px;
  }

  .item-email {
    font-size: 11px;
  }

  .item-description {
    font-size: 10px;
  }
}
</style>
