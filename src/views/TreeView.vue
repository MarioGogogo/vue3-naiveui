<template>
  <div class="tree-view-container">
    <!-- Neo-Brutalism 顶部栏 -->
    <div class="neo-header">
      <button class="neo-back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">返回</span>
      </button>
      <div class="header-info">
        <h1 class="neo-title">树形控件</h1>
        <p class="neo-subtitle">层级数据展示</p>
      </div>
    </div>

    <!-- 功能控制面板 -->
    <div class="control-panel">
      <div class="control-section">
        <h3 class="control-title">显示选项</h3>
        <div class="control-options">
          <label class="neo-checkbox">
            <input type="checkbox" v-model="showCheckbox" />
            <span>复选框</span>
          </label>
          <label class="neo-checkbox">
            <input type="checkbox" v-model="cascade" />
            <span>级联选择</span>
          </label>
          <label class="neo-checkbox">
            <input type="checkbox" v-model="expandOnClick" />
            <span>点击展开</span>
          </label>
        </div>
      </div>

      <div class="control-section">
        <h3 class="control-title">操作按钮</h3>
        <div class="control-actions">
          <button class="neo-btn neo-btn-primary" @click="expandAll">
            <span class="material-symbols-outlined">expand_all</span>
            展开全部
          </button>
          <button class="neo-btn neo-btn-secondary" @click="collapseAll">
            <span class="material-symbols-outlined">collapse_all</span>
            收起全部
          </button>
          <button class="neo-btn neo-btn-success" @click="getSelectedNodes">
            <span class="material-symbols-outlined">check_circle</span>
            获取选中
          </button>
        </div>
      </div>
    </div>

    <!-- 树形控件区域 -->
    <div class="tree-section">
      <div class="tree-wrapper neo-shadow">
        <n-tree
          :data="treeData"
          :selectable="selectable"
          :checkable="showCheckbox"
          :cascade="cascade"
          :expand-on-click="expandOnClick"
          :animated="animated"
          v-model:selected-keys="selectedKeys"
          v-model:checked-keys="checkedKeys"
          v-model:expanded-keys="expandedKeys"
          @update:selected-keys="handleSelect"
          @update:checked-keys="handleCheck"
          @update:expanded-keys="handleExpand"
          @node-click="handleNodeClick"
          class="neo-tree"
        />
      </div>
    </div>

    <!-- 选择结果展示 -->
    <div v-if="showSelectionInfo" class="selection-info neo-shadow">
      <h3 class="info-title">选择结果</h3>
      <div class="info-content">
        <div class="info-item">
          <span class="info-label">选中节点:</span>
          <span class="info-value">{{ selectedKeys.length }} 个</span>
        </div>
        <div class="info-item">
          <span class="info-label">复选节点:</span>
          <span class="info-value">{{ checkedKeys.length }} 个</span>
        </div>
        <div class="info-item">
          <span class="info-label">展开节点:</span>
          <span class="info-value">{{ expandedKeys.length }} 个</span>
        </div>
      </div>
    </div>

    <!-- 节点详情弹窗 -->
    <n-modal v-model:show="showNodeDetail" preset="card" class="neo-modal" style="width: 400px;">
      <template #header>
        <div class="modal-header">
          <span class="material-symbols-outlined">info</span>
          <span>节点详情</span>
        </div>
      </template>
      <div class="node-detail-content">
        <div class="detail-item">
          <span class="detail-label">节点名称:</span>
          <span class="detail-value">{{ currentNode?.label }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">节点ID:</span>
          <span class="detail-value">{{ currentNode?.key }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">子节点数:</span>
          <span class="detail-value">{{ currentNode?.children?.length || 0 }}</span>
        </div>
      </div>
      <template #action>
        <button @click="showNodeDetail = false" class="neo-btn">
          确定
        </button>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NTree, NModal, useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()

// 树形配置
const selectable = ref(true)
const animated = ref(true)

// 功能开关
const showCheckbox = ref(false)
const cascade = ref(false)
const expandOnClick = ref(true)

// 选择状态
const selectedKeys = ref([])
const checkedKeys = ref([])
const expandedKeys = ref([])

// 当前节点
const currentNode = ref(null)
const showNodeDetail = ref(false)

// 显示选择信息
const showSelectionInfo = computed(() => {
  return selectedKeys.value.length > 0 || checkedKeys.value.length > 0 || expandedKeys.value.length > 0
})

// 树形数据
const treeData = ref([
  {
    key: '1',
    label: '根节点 A',
    children: [
      {
        key: '1-1',
        label: '子节点 A-1',
        children: [
          { key: '1-1-1', label: '叶子节点 A-1-1' },
          { key: '1-1-2', label: '叶子节点 A-1-2' }
        ]
      },
      {
        key: '1-2',
        label: '子节点 A-2',
        children: [
          { key: '1-2-1', label: '叶子节点 A-2-1' },
          { key: '1-2-2', label: '叶子节点 A-2-2' },
          { key: '1-2-3', label: '叶子节点 A-2-3' }
        ]
      }
    ]
  },
  {
    key: '2',
    label: '根节点 B',
    children: [
      {
        key: '2-1',
        label: '子节点 B-1',
        children: [
          { key: '2-1-1', label: '叶子节点 B-1-1' }
        ]
      },
      {
        key: '2-2',
        label: '子节点 B-2'
      }
    ]
  },
  {
    key: '3',
    label: '根节点 C',
    children: [
      { key: '3-1', label: '子节点 C-1' },
      { key: '3-2', label: '子节点 C-2' },
      { key: '3-3', label: '子节点 C-3' }
    ]
  }
])

// 返回首页
const goBack = () => {
  router.push('/')
}

// 节点选择处理
const handleSelect = (keys) => {
  console.log('选中节点:', keys)
}

// 复选框选择处理
const handleCheck = (keys) => {
  console.log('复选选中:', keys)
}

// 节点展开处理
const handleExpand = (keys) => {
  console.log('展开节点:', keys)
}

// 节点点击处理
const handleNodeClick = (node) => {
  currentNode.value = node
  showNodeDetail.value = true
  console.log('点击节点:', node)
}

// 展开全部
const expandAll = () => {
  const allKeys = getAllKeys(treeData.value)
  expandedKeys.value = allKeys
  message.success('已展开所有节点')
}

// 收起全部
const collapseAll = () => {
  expandedKeys.value = []
  message.success('已收起所有节点')
}

// 获取所有节点的键
const getAllKeys = (nodes) => {
  const keys = []
  const traverse = (node) => {
    if (node.children && node.children.length > 0) {
      keys.push(node.key)
      node.children.forEach(traverse)
    }
  }
  nodes.forEach(traverse)
  return keys
}

// 获取选中节点信息
const getSelectedNodes = () => {
  if (selectedKeys.value.length === 0) {
    message.warning('请先选择节点')
    return
  }

  const selectedNodes = findNodesByKey(treeData.value, selectedKeys.value)
  message.success(`已选中 ${selectedNodes.length} 个节点`)
  console.log('选中的节点:', selectedNodes)
}

// 根据键查找节点
const findNodesByKey = (nodes, keys) => {
  const result = []
  const traverse = (node) => {
    if (keys.includes(node.key)) {
      result.push(node)
    }
    if (node.children) {
      node.children.forEach(traverse)
    }
  }
  nodes.forEach(traverse)
  return result
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Manrope:wght@400;600;700;800&display=swap');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

.tree-view-container {
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #000000;
  padding-bottom: 40px;
}

/* Neo-Brutalism 基础样式 */
.neo-shadow {
  box-shadow: 4px 4px 0px 0px #000000;
}

.neo-btn {
  background-color: #ffffff;
  border: 2px solid #000000;
  padding: 8px 16px;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0px 0px #000000;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.neo-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px 0px #000000;
}

.neo-btn:active {
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px 0px #000000;
}

.neo-btn-primary {
  background-color: #4ECDC4;
}

.neo-btn-secondary {
  background-color: #FFD600;
}

.neo-btn-success {
  background-color: #39FF14;
}

.neo-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.neo-checkbox input {
  width: 18px;
  height: 18px;
  border: 2px solid #000000;
  cursor: pointer;
}

.neo-checkbox span {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
}

/* 顶部栏 */
.neo-header {
  background-color: #FFD600;
  border: 3px solid #000000;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.neo-back-btn {
  background-color: #ffffff;
  border: 2px solid #000000;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0px 0px #000000;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.neo-back-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.neo-back-btn:active {
  transform: translate(1px, 1px);
}

.back-icon {
  font-size: 16px;
  font-weight: 800;
}

.header-info {
  flex: 1;
}

.neo-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 24px;
  color: #000000;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.025em;
}

.neo-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: #000000;
  font-weight: 600;
  margin: 4px 0 0 0;
  opacity: 0.8;
}

/* 控制面板 */
.control-panel {
  max-width: 800px;
  margin: 24px auto;
  padding: 0 20px;
}

.control-section {
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 4px 4px 0px 0px #000000;
}

.control-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 16px;
  color: #000000;
  font-weight: 800;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: -0.025em;
}

.control-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.control-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* 树形区域 */
.tree-section {
  max-width: 800px;
  margin: 0 auto 24px;
  padding: 0 20px;
}

.tree-wrapper {
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 24px;
  min-height: 400px;
}

.neo-tree {
  font-family: 'Manrope', sans-serif;
}

/* NaiveUI 树组件样式覆盖 */
.neo-tree :deep(.n-tree-node) {
  padding: 4px 0;
}

.neo-tree :deep(.n-tree-node-content) {
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.neo-tree :deep(.n-tree-node-content:hover) {
  background-color: #f0f0f0;
}

.neo-tree :deep(.n-tree-node-content.n-tree-node-content--selected) {
  background-color: #4ECDC4;
  border: 2px solid #000000;
  box-shadow: 2px 2px 0px 0px #000000;
}

.neo-tree :deep(.n-tree-node-switcher) {
  color: #000000;
}

.neo-tree :deep(.n-tree-node-checkbox) {
  border: 2px solid #000000;
}

.neo-tree :deep(.n-tree-node-checkbox.n-checkbox.n-checkbox--checked) {
  background-color: #4ECDC4;
  border-color: #000000;
}

.neo-tree :deep(.n-tree-node-wrapper) {
  padding: 2px 0;
}

/* 选择信息 */
.selection-info {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #4ECDC4;
  border: 3px solid #000000;
}

.info-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 16px;
  color: #000000;
  font-weight: 800;
  margin: 0 0 16px 0;
  text-transform: uppercase;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
}

.info-value {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #000000;
}

/* 节点详情弹窗 */
.neo-modal {
  border: 3px solid #000000;
  box-shadow: 6px 6px 0px 0px #000000;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
}

.node-detail-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f5f5f5;
  border: 2px solid #000000;
}

.detail-label {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
}

.detail-value {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #000000;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .neo-header {
    padding: 12px 16px;
  }

  .neo-title {
    font-size: 20px;
  }

  .neo-subtitle {
    font-size: 11px;
  }

  .control-panel,
  .tree-section {
    padding: 0 16px;
  }

  .control-section {
    padding: 16px;
  }

  .tree-wrapper {
    padding: 16px;
    min-height: 300px;
  }

  .control-options,
  .control-actions {
    flex-direction: column;
  }
}
</style>