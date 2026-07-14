<template>
  <div class="data-table-container">
    <!-- Neo-Brutalism 顶部栏 -->
    <div class="neo-header">
      <button class="neo-back-btn" @click="goBack">
        <span class="material-symbols-outlined">arrow_back_ios</span>
        <span class="back-text">返回</span>
      </button>
      <div class="header-info">
        <h1 class="neo-title">订单数据</h1>
        <p class="neo-subtitle">{{ filteredData.length }} 条记录</p>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="filter-section">
      <div class="search-bar">
        <span class="material-symbols-outlined search-icon">search</span>
        <input
          v-model="searchQuery"
          placeholder="搜索订单号、客户..."
          class="search-input"
        />
        <button v-if="searchQuery" class="clear-btn" @click="clearSearch">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="filter-options">
        <div class="filter-group">
          <label class="filter-label">状态:</label>
          <select v-model="statusFilter" class="neo-select">
            <option value="">全部</option>
            <option value="completed">已完成</option>
            <option value="pending">处理中</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">排序:</label>
          <select v-model="sortBy" class="neo-select">
            <option value="date-desc">日期 ↓</option>
            <option value="date-asc">日期 ↑</option>
            <option value="amount-desc">金额 ↓</option>
            <option value="amount-asc">金额 ↑</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-wrapper">
      <div class="table-container">
        <!-- 表头 -->
        <div class="table-header">
          <div class="table-row header-row">
            <div class="table-cell cell-checkbox">
              <input
                type="checkbox"
                v-model="selectAll"
                @change="handleSelectAll"
                class="neo-checkbox"
              />
            </div>
            <div
              v-for="column in columns"
              :key="column.key"
              class="table-cell"
              :class="`cell-${column.key}`"
              :style="{ width: column.width }"
            >
              <div class="cell-content">
                <span class="cell-title">{{ column.title }}</span>
                <button
                  v-if="column.sortable"
                  class="sort-btn"
                  @click="handleSort(column.key)"
                >
                  <span class="material-symbols-outlined">
                    {{ getSortIcon(column.key) }}
                  </span>
                </button>
              </div>
            </div>
            <div class="table-cell cell-actions">操作</div>
          </div>
        </div>

        <!-- 表格内容 -->
        <div class="table-body">
          <div
            v-for="item in paginatedData"
            :key="item.id"
            class="table-row"
            :class="{ 'row-selected': selectedRows.includes(item.id) }"
            @click="handleRowClick(item)"
          >
            <div class="table-cell cell-checkbox">
              <input
                type="checkbox"
                v-model="selectedRows"
                :value="item.id"
                @click.stop
                class="neo-checkbox"
              />
            </div>

            <div class="table-cell cell-order" style="width: 120px">
              <div class="order-number">{{ item.orderNumber }}</div>
            </div>

            <div class="table-cell cell-customer" style="width: 180px">
              <div class="customer-info">
                <div class="customer-name">{{ item.customerName }}</div>
                <div class="customer-email">{{ item.customerEmail }}</div>
              </div>
            </div>

            <div class="table-cell cell-amount" style="width: 100px">
              <div class="amount-display">¥{{ item.amount.toFixed(2) }}</div>
            </div>

            <div class="table-cell cell-date" style="width: 140px">
              <div class="date-display">{{ formatDate(item.createdAt) }}</div>
            </div>

            <div class="table-cell cell-status" style="width: 90px">
              <span class="status-badge" :class="`status-${item.status}`">
                {{ getStatusText(item.status) }}
              </span>
            </div>

            <div class="table-cell cell-actions">
              <div class="action-buttons">
                <button class="neo-btn-icon" @click.stop="handleView(item)" title="查看">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
                <button class="neo-btn-icon" @click.stop="handleEdit(item)" title="编辑">
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="neo-btn-icon btn-delete" @click.stop="handleDelete(item)" title="删除">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="paginatedData.length === 0" class="empty-state">
            <span class="material-symbols-outlined empty-icon">inbox</span>
            <p class="empty-text">暂无数据</p>
            <p class="empty-hint">试试调整筛选条件</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 批量操作栏 -->
    <div v-if="selectedRows.length > 0" class="bulk-actions">
      <div class="bulk-info">
        <span class="bulk-text">已选择 {{ selectedRows.length }} 项</span>
      </div>
      <div class="bulk-buttons">
        <button class="neo-btn-small bulk-btn" @click="handleBulkDelete">
          <span class="material-symbols-outlined">delete</span>
          批量删除
        </button>
        <button class="neo-btn-small bulk-btn" @click="handleBulkExport">
          <span class="material-symbols-outlined">download</span>
          导出
        </button>
        <button class="neo-btn-small bulk-btn btn-cancel" @click="clearSelection">
          取消
        </button>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination-section">
      <div class="pagination-info">
        显示 {{ startIndex + 1 }}-{{ endIndex }} 条，共 {{ filteredData.length }} 条
      </div>
      <div class="pagination-controls">
        <button
          class="neo-btn-small"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <div class="page-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="page-btn"
            :class="{ active: page === currentPage }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
        <button
          class="neo-btn-small"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>

    <!-- 编辑模态框 -->
    <n-modal v-model:show="showEditModal" preset="card" class="neo-modal">
      <template #header>
        <div class="modal-header">
          <span class="material-symbols-outlined">edit_note</span>
          <span>编辑订单</span>
        </div>
      </template>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">订单号</label>
          <input v-model="editingItem.orderNumber" disabled class="neo-input" />
        </div>
        <div class="form-group">
          <label class="form-label">客户名称</label>
          <input v-model="editingItem.customerName" class="neo-input" />
        </div>
        <div class="form-group">
          <label class="form-label">金额</label>
          <input v-model.number="editingItem.amount" type="number" class="neo-input" />
        </div>
        <div class="form-group">
          <label class="form-label">状态</label>
          <select v-model="editingItem.status" class="neo-select">
            <option value="completed">已完成</option>
            <option value="pending">处理中</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
      </div>
      <template #action>
        <div class="modal-actions">
          <button class="neo-btn" @click="showEditModal = false">取消</button>
          <button class="neo-btn btn-primary" @click="saveEdit">保存</button>
        </div>
      </template>
    </n-modal>

    <!-- 查看详情模态框 -->
    <n-modal v-model:show="showViewModal" preset="card" class="neo-modal">
      <template #header>
        <div class="modal-header">
          <span class="material-symbols-outlined">visibility</span>
          <span>订单详情</span>
        </div>
      </template>
      <div class="modal-body">
        <div class="detail-group">
          <label class="detail-label">订单号:</label>
          <span class="detail-value">{{ viewingItem.orderNumber }}</span>
        </div>
        <div class="detail-group">
          <label class="detail-label">客户名称:</label>
          <span class="detail-value">{{ viewingItem.customerName }}</span>
        </div>
        <div class="detail-group">
          <label class="detail-label">客户邮箱:</label>
          <span class="detail-value">{{ viewingItem.customerEmail }}</span>
        </div>
        <div class="detail-group">
          <label class="detail-label">金额:</label>
          <span class="detail-value amount-highlight">¥{{ viewingItem.amount.toFixed(2) }}</span>
        </div>
        <div class="detail-group">
          <label class="detail-label">创建时间:</label>
          <span class="detail-value">{{ formatDate(viewingItem.createdAt) }}</span>
        </div>
        <div class="detail-group">
          <label class="detail-label">状态:</label>
          <span class="status-badge" :class="`status-${viewingItem.status}`">
            {{ getStatusText(viewingItem.status) }}
          </span>
        </div>
      </div>
      <template #action>
        <div class="modal-actions">
          <button class="neo-btn" @click="showViewModal = false">关闭</button>
        </div>
      </template>
    </n-modal>

    <!-- Neo-Brutalism 确认弹窗 -->
    <div v-if="showConfirmModal" class="confirm-overlay" @click.self="showConfirmModal = false">
      <div class="confirm-modal">
        <div class="confirm-header">
          <span class="material-symbols-outlined confirm-icon">warning</span>
          <span class="confirm-title">{{ confirmConfig.title }}</span>
        </div>
        <div class="confirm-content">
          {{ confirmConfig.content }}
        </div>
        <div class="confirm-actions">
          <button class="neo-btn-confirm btn-cancel" @click="showConfirmModal = false">
            <span class="material-symbols-outlined">close</span>
            取消
          </button>
          <button class="neo-btn-confirm btn-danger" @click="handleConfirm">
            <span class="material-symbols-outlined">delete</span>
            确认删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NModal, useDialog } from 'naive-ui'
import neoMessage from '@/utils/message'

const router = useRouter()
const dialog = useDialog()
const message = neoMessage

// 数据状态
const data = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('date-desc')
const selectedRows = ref([])
const selectAll = ref(false)

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)

// 模态框状态
const showEditModal = ref(false)
const showViewModal = ref(false)
const showConfirmModal = ref(false)
const editingItem = ref({})
const viewingItem = ref({})
const confirmConfig = ref({
  title: '',
  content: '',
  onConfirm: null
})

// 表格列配置
const columns = [
  { key: 'order', title: '订单号', width: '120px', sortable: true },
  { key: 'customer', title: '客户信息', width: '180px', sortable: false },
  { key: 'amount', title: '金额', width: '100px', sortable: true },
  { key: 'date', title: '创建时间', width: '140px', sortable: true },
  { key: 'status', title: '状态', width: '90px', sortable: true }
]

// 生成模拟数据
const generateData = () => {
  const names = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑十一', '王十二', '冯十三', '陈十四', '褚十五', '卫十六'
  ]

  const domains = ['qq.com', '163.com', 'gmail.com', 'outlook.com']
  const statuses = ['completed', 'pending', 'cancelled']

  const total = 5000
  const result = []

  for (let i = 1; i <= total; i++) {
    const name = names[Math.floor(Math.random() * names.length)]
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const amount = Math.random() * 10000 + 100

    result.push({
      id: i,
      orderNumber: `ORD${String(i).padStart(6, '0')}`,
      customerName: name,
      customerEmail: `user${i}@${domain}`,
      amount: Math.floor(amount * 100) / 100,
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      status: status
    })
  }

  return result
}

// 过滤和排序数据
const filteredData = computed(() => {
  let result = [...data.value]

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item =>
      item.orderNumber.toLowerCase().includes(query) ||
      item.customerName.toLowerCase().includes(query) ||
      item.customerEmail.toLowerCase().includes(query)
    )
  }

  // 状态过滤
  if (statusFilter.value) {
    result = result.filter(item => item.status === statusFilter.value)
  }

  // 排序
  const [sortField, sortOrder] = sortBy.value.split('-')
  result.sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    if (sortField === 'amount') {
      aVal = Number(aVal)
      bVal = Number(bVal)
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  return result
})

// 分页数据
const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value))

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)

const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, filteredData.value.length))

const paginatedData = computed(() => {
  return filteredData.value.slice(startIndex.value, endIndex.value)
})

// 可见页码
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let endPage = Math.min(totalPages.value, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

// 加载数据
const loadData = () => {
  setTimeout(() => {
    data.value = generateData()
    message.success('数据加载完成')
  }, 500)
}

// 清空搜索
const clearSearch = () => {
  searchQuery.value = ''
}

// 获取排序图标
const getSortIcon = (column) => {
  if (!sortBy.value.startsWith(column)) {
    return 'sort'
  }
  return sortBy.value.endsWith('asc') ? 'arrow_upward' : 'arrow_downward'
}

// 处理排序
const handleSort = (column) => {
  if (sortBy.value.startsWith(column)) {
    sortBy.value = sortBy.value.endsWith('asc') ? `${column}-desc` : `${column}-asc`
  } else {
    sortBy.value = `${column}-asc`
  }
}

// 全选处理
const handleSelectAll = () => {
  if (selectAll.value) {
    selectedRows.value = paginatedData.value.map(item => item.id)
  } else {
    selectedRows.value = []
  }
}

// 清空选择
const clearSelection = () => {
  selectedRows.value = []
  selectAll.value = false
}

// 行点击处理
const handleRowClick = (item) => {
  if (!selectedRows.value.includes(item.id)) {
    selectedRows.value.push(item.id)
  } else {
    const index = selectedRows.value.indexOf(item.id)
    selectedRows.value.splice(index, 1)
  }
}

// 查看详情
const handleView = (item) => {
  viewingItem.value = { ...item }
  showViewModal.value = true
}

// 编辑
const handleEdit = (item) => {
  editingItem.value = { ...item }
  showEditModal.value = true
}

// 保存编辑
const saveEdit = () => {
  const index = data.value.findIndex(item => item.id === editingItem.value.id)
  if (index !== -1) {
    data.value[index] = { ...editingItem.value }
    message.success('保存成功')
    showEditModal.value = false
  }
}

// 显示确认弹窗
const showConfirm = (title, content, onConfirm) => {
  confirmConfig.value = { title, content, onConfirm }
  showConfirmModal.value = true
}

// 确认操作
const handleConfirm = () => {
  if (confirmConfig.value.onConfirm) {
    confirmConfig.value.onConfirm()
  }
  showConfirmModal.value = false
}

// 删除
const handleDelete = (item) => {
  showConfirm(
    '确认删除',
    `确定要删除订单 ${item.orderNumber} 吗？此操作不可恢复。`,
    () => {
      const index = data.value.findIndex(i => i.id === item.id)
      if (index !== -1) {
        data.value.splice(index, 1)
        message.success('删除成功')
      }
    }
  )
}

// 批量删除
const handleBulkDelete = () => {
  showConfirm(
    '批量删除',
    `确定要删除选中的 ${selectedRows.value.length} 条记录吗？此操作不可恢复。`,
    () => {
      data.value = data.value.filter(item => !selectedRows.value.includes(item.id))
      selectedRows.value = []
      selectAll.value = false
      message.success('批量删除成功')
    }
  )
}

// 批量导出
const handleBulkExport = () => {
  const selectedData = data.value.filter(item => selectedRows.value.includes(item.id))
  console.log('导出数据:', selectedData)
  message.success(`已导出 ${selectedData.length} 条记录`)
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    completed: '已完成',
    pending: '处理中',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 返回首页
const goBack = () => {
  router.push('/')
}

// 监听搜索和筛选变化重置页码
watch([searchQuery, statusFilter, sortBy], () => {
  currentPage.value = 1
})

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

.data-table-container {
  min-height: 100vh;
  background: #FFFFF0;
  display: flex;
  flex-direction: column;
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding-bottom: 100px;
}

/* Neo-Brutalism 顶部栏 */
.neo-header {
  background: #00E5FF;
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

.neo-back-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #000;
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

/* 筛选区域 */
.filter-section {
  background: #FFE66D;
  border: 3px solid #000;
  border-top: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-bar {
  background: #FFF;
  border: 3px solid #000;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  box-shadow: 3px 3px 0px #000;
}

.search-icon {
  font-size: 20px;
  color: #000;
  margin-right: 12px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 700;
  outline: none;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.clear-btn .material-symbols-outlined {
  font-size: 18px;
}

.filter-options {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 12px;
  font-weight: 700;
  color: #000;
}

.neo-select {
  border: 2px solid #000;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  background: #FFF;
  cursor: pointer;
}

/* 表格容器 */
.table-wrapper {
  flex: 1;
  background: #FFFFF0;
  margin: 0;
  padding: 16px;
}

.table-container {
  background: #FFF;
  border: 3px solid #000;
  box-shadow: 5px 5px 0px #000;
  overflow: hidden;
}

/* 表头 */
.table-header {
  background: #4ECDC4;
  border-bottom: 3px solid #000;
}

.header-row {
  background: #4ECDC4;
}

.table-row {
  display: flex;
  border-bottom: 2px solid #000;
  transition: background 0.1s;
}

.table-row:hover {
  background: #FFF9E6;
}

.row-selected {
  background: #FFD600 !important;
}

.table-cell {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.cell-checkbox {
  width: 40px;
  justify-content: center;
}

.neo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.cell-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cell-title {
  font-size: 13px;
  font-weight: 900;
  color: #000;
  text-transform: uppercase;
}

.sort-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
}

.sort-btn .material-symbols-outlined {
  font-size: 16px;
  color: #000;
}

/* 表格内容 */
.table-body {
  max-height: calc(100vh - 400px);
  overflow-y: auto;
}

.order-number {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #000;
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.customer-name {
  font-size: 13px;
  font-weight: 700;
  color: #000;
}

.customer-email {
  font-size: 11px;
  font-weight: 600;
  color: #000;
  opacity: 0.6;
}

.amount-display {
  font-size: 14px;
  font-weight: 900;
  color: #000;
  font-family: 'Courier New', monospace;
}

.date-display {
  font-size: 11px;
  font-weight: 600;
  color: #000;
  opacity: 0.8;
}

.status-badge {
  padding: 4px 10px;
  border: 2px solid #000;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 2px 2px 0px #000;
}

.status-completed {
  background: #95E1D3;
}

.status-pending {
  background: #FFD600;
}

.status-cancelled {
  background: #F38181;
  color: #FFF;
}

/* 操作按钮 */
.cell-actions {
  width: 120px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.neo-btn-icon {
  width: 32px;
  height: 32px;
  border: 2px solid #000;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s;
  box-shadow: 2px 2px 0px #000;
}

.neo-btn-icon:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px #000;
}

.neo-btn-icon:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px #000;
}

.neo-btn-icon .material-symbols-outlined {
  font-size: 16px;
  color: #000;
}

.btn-delete {
  background: #F38181;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  color: #000;
  opacity: 0.3;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  font-weight: 800;
  color: #000;
  margin: 0 0 8px 0;
}

.empty-hint {
  font-size: 12px;
  font-weight: 600;
  color: #000;
  opacity: 0.5;
  margin: 0;
}

/* 批量操作栏 */
.bulk-actions {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: #FFD600;
  border: 3px solid #000;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 4px 4px 0px #000;
}

.bulk-info {
  font-size: 12px;
  font-weight: 700;
  color: #000;
}

.bulk-buttons {
  display: flex;
  gap: 8px;
}

.neo-btn-small {
  padding: 6px 12px;
  border: 2px solid #000;
  background: #FFF;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 2px 2px 0px #000;
}

.neo-btn-small:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px #000;
}

.neo-btn-small:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px #000;
}

.neo-btn-small:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: 2px 2px 0px #000;
}

.neo-btn-small .material-symbols-outlined {
  font-size: 14px;
}

.bulk-btn {
  background: #4ECDC4;
}

.btn-cancel {
  background: #F38181;
}

/* 分页 */
.pagination-section {
  background: #FFE66D;
  border: 3px solid #000;
  border-top: 0;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.pagination-info {
  font-size: 12px;
  font-weight: 700;
  color: #000;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  border: 2px solid #000;
  background: #FFF;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn.active {
  background: #000;
  color: #FFF;
}

/* 模态框 */
:deep(.neo-modal) {
  border: 4px solid #000;
  box-shadow: 8px 8px 0px #000;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000;
}

.neo-input {
  border: 3px solid #000;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 700;
  outline: none;
}

.neo-input:focus {
  box-shadow: 3px 3px 0px #000;
}

.neo-input:disabled {
  background: #F5F5F5;
  opacity: 0.6;
}

.detail-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-label {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000;
  min-width: 80px;
}

.detail-value {
  font-size: 14px;
  font-weight: 700;
  color: #000;
}

.amount-highlight {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  color: #00E5FF;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 16px;
}

.neo-btn {
  padding: 10px 24px;
  border: 3px solid #000;
  background: #FFF;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 3px 3px 0px #000;
  transition: all 0.1s;
}

.neo-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #000;
}

.neo-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px #000;
}

.btn-primary {
  background: #4ECDC4;
}

/* Neo-Brutalism 确认弹窗 */
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.confirm-modal {
  background: #FFF;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px #000;
  max-width: 420px;
  width: 100%;
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.confirm-header {
  background: #F38181;
  border-bottom: 4px solid #000;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.confirm-icon {
  font-size: 32px;
  color: #000;
}

.confirm-title {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  color: #000;
  letter-spacing: -0.5px;
}

.confirm-content {
  padding: 24px 16px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.6;
  color: #000;
  text-align: center;
}

.confirm-actions {
  padding: 16px;
  display: flex;
  gap: 12px;
  justify-content: center;
  border-top: 4px solid #000;
}

.neo-btn-confirm {
  padding: 12px 20px;
  border: 3px solid #000;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  box-shadow: 3px 3px 0px #000;
  transition: all 0.1s;
  min-width: 120px;
  justify-content: center;
}

.neo-btn-confirm:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #000;
}

.neo-btn-confirm:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #000;
}

.neo-btn-confirm .material-symbols-outlined {
  font-size: 18px;
}

.neo-btn-confirm.btn-cancel {
  background: #FFF;
}

.neo-btn-confirm.btn-danger {
  background: #F38181;
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

  .filter-options {
    flex-direction: column;
    gap: 8px;
  }

  .table-cell {
    padding: 10px 12px;
  }

  .cell-order {
    width: 100px;
  }

  .cell-customer {
    width: 140px;
  }

  .cell-actions {
    width: 100px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }

  .bulk-actions {
    width: 90%;
    flex-direction: column;
    gap: 8px;
  }

  .pagination-section {
    flex-direction: column;
  }
}
</style>
