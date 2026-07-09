<template>
  <n-config-provider>
    <n-message-provider>
      <router-view />
      <update-modal
        :visible="showUpdateModal"
        :local-version="localVersion"
        :remote-version="remoteVersion"
        :changes="versionChanges"
        :is-force-update="isForceUpdate"
        @update="handleUpdate"
        @cancel="handleCancelUpdate"
      />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import UpdateModal from './components/UpdateModal.vue'
import { saveLocalVersion, getLocalVersion } from './utils/version'

// 更新模态框状态
const showUpdateModal = ref(false)
const localVersion = ref('')
const remoteVersion = ref('')
const versionChanges = ref([])
const isForceUpdate = ref(false)

// 显示更新弹窗（由首页或其他页面调用）
window.showUpdateDialog = (local, remote, force = false) => {
  console.log('显示更新弹窗:', local.version, '->', remote.version)

  localVersion.value = local.version || 'unknown'
  remoteVersion.value = remote.version
  versionChanges.value = remote.changes || []
  isForceUpdate.value = force

  showUpdateModal.value = true
}

// 处理更新操作
const handleUpdate = () => {
  // 保存新版本信息
  saveLocalVersion({
    version: remoteVersion.value,
    buildTime: new Date().toISOString()
  })

  // 关闭模态框
  showUpdateModal.value = false

  // 刷新页面
  window.location.reload()
}

// 取消更新（仅非强制更新时可用）
const handleCancelUpdate = () => {
  showUpdateModal.value = false
  // 用户选择稍后更新，不保存新版本信息
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background: #f5f7fa;
}

#app {
  min-height: 100vh;
}
</style>
