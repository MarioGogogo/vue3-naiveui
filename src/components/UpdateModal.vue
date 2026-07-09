<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
        <div class="neo-modal" @click.stop>
          <!-- 模态框头部 -->
          <div class="modal-header">
            <div class="modal-icon">🚀</div>
            <h2 class="modal-title">发现新版本</h2>
          </div>

          <!-- 模态框内容 -->
          <div class="modal-content">
            <div class="version-info">
              <span class="version-label">当前版本：</span>
              <span class="version-number">{{ localVersion }}</span>
            </div>
            <div class="version-info">
              <span class="version-label">最新版本：</span>
              <span class="version-number highlight">{{ remoteVersion }}</span>
            </div>

            <div v-if="changes && changes.length > 0" class="changes-section">
              <h3 class="changes-title">更新内容：</h3>
              <ul class="changes-list">
                <li v-for="(change, index) in changes" :key="index" class="change-item">
                  <span class="change-bullet">▸</span>
                  <span class="change-text">{{ change }}</span>
                </li>
              </ul>
            </div>

            <div v-if="isForceUpdate" class="force-notice">
              <span class="notice-icon">⚠️</span>
              <span class="notice-text">这是一个重要更新，需要立即安装</span>
            </div>
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button
              v-if="!isForceUpdate"
              class="neo-btn neo-btn-secondary"
              @click="handleCancel"
            >
              稍后更新
            </button>
            <button class="neo-btn neo-btn-primary" @click="handleUpdate">
              {{ isForceUpdate ? '立即更新' : '立即更新' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  localVersion: {
    type: String,
    default: '1.0.0'
  },
  remoteVersion: {
    type: String,
    default: '1.0.1'
  },
  changes: {
    type: Array,
    default: () => []
  },
  isForceUpdate: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update', 'cancel'])

const handleUpdate = () => {
  emit('update')
}

const handleCancel = () => {
  emit('cancel')
}

const handleOverlayClick = () => {
  if (!props.isForceUpdate) {
    emit('cancel')
  }
}
</script>

<style scoped>
/* 模态框遮罩 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

/* Neo-Brutalism 模态框 */
.neo-modal {
  background: #FFE66D;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px #000;
  max-width: 400px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 模态框头部 */
.modal-header {
  background: #FF6B6B;
  border-bottom: 4px solid #000;
  padding: 16px;
  text-align: center;
}

.modal-icon {
  font-size: 36px;
  margin-bottom: 8px;
  display: block;
}

.modal-title {
  font-family: 'Space Grotesk', 'Arial Black', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-weight: 900;
  color: #000;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -1px;
}

/* 模态框内容 */
.modal-content {
  padding: 16px;
}

.version-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 8px 12px;
  background: #FFF;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
}

.version-label {
  font-weight: 700;
  font-size: 12px;
  color: #000;
}

.version-number {
  font-weight: 900;
  font-size: 14px;
  color: #000;
  font-family: 'Courier New', monospace;
}

.version-number.highlight {
  color: #4ECDC4;
  font-size: 16px;
}

/* 更新内容列表 */
.changes-section {
  margin-top: 12px;
}

.changes-title {
  font-family: 'Space Grotesk', 'Arial Black', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 900;
  color: #000;
  margin: 0 0 8px 0;
  text-transform: uppercase;
}

.changes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #FFF;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
}

.change-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  border-bottom: 2px solid #000;
  gap: 8px;
}

.change-item:last-child {
  border-bottom: none;
}

.change-bullet {
  font-size: 14px;
  font-weight: 900;
  color: #4ECDC4;
  flex-shrink: 0;
}

.change-text {
  font-weight: 600;
  font-size: 12px;
  color: #000;
  line-height: 1.4;
}

/* 强制更新提示 */
.force-notice {
  margin-top: 12px;
  padding: 8px 12px;
  background: #FF6B6B;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  display: flex;
  align-items: center;
  gap: 8px;
}

.notice-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.notice-text {
  font-weight: 700;
  font-size: 12px;
  color: #000;
}

/* 模态框底部 */
.modal-footer {
  background: #95E1D3;
  border-top: 4px solid #000;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Neo-Brutalism 按钮 */
.neo-btn {
  padding: 10px 16px;
  border: 3px solid #000;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 4px 4px 0px #000;
  font-family: 'Space Grotesk', 'Arial Black', -apple-system, BlinkMacSystemFont, sans-serif;
  min-width: 100px;
}

.neo-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000;
}

.neo-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000;
}

.neo-btn-primary {
  background: #4ECDC4;
  color: #000;
}

.neo-btn-secondary {
  background: #FFF;
  color: #000;
}

/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .modal-overlay {
    padding: 12px;
  }

  .neo-modal {
    max-width: 100%;
    margin: 0;
  }

  .modal-icon {
    font-size: 32px;
    margin-bottom: 6px;
  }

  .modal-title {
    font-size: 18px;
  }

  .modal-content {
    padding: 12px;
  }

  .modal-footer {
    padding: 10px 12px;
    flex-direction: column-reverse;
    gap: 8px;
  }

  .neo-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 13px;
  }

  .version-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 8px;
  }

  .version-number {
    font-size: 16px;
    align-self: flex-end;
  }

  .changes-title {
    font-size: 13px;
  }

  .change-item {
    padding: 6px 10px;
  }

  .change-text {
    font-size: 11px;
  }

  .force-notice {
    padding: 8px 10px;
  }

  .notice-text {
    font-size: 11px;
  }
}

/* 超小屏幕优化 */
@media (max-width: 360px) {
  .modal-overlay {
    padding: 8px;
  }

  .neo-modal {
    max-height: 90vh;
  }

  .modal-header {
    padding: 12px;
  }

  .modal-icon {
    font-size: 28px;
  }

  .modal-title {
    font-size: 16px;
  }

  .modal-content {
    padding: 10px;
  }

  .version-info {
    padding: 6px 8px;
  }

  .changes-section {
    margin-top: 8px;
  }

  .changes-title {
    font-size: 12px;
  }

  .change-item {
    padding: 6px 8px;
    gap: 6px;
  }

  .change-bullet {
    font-size: 12px;
  }

  .change-text {
    font-size: 11px;
  }

  .force-notice {
    padding: 6px 8px;
    gap: 6px;
  }

  .notice-icon {
    font-size: 14px;
  }

  .modal-footer {
    padding: 8px 10px;
  }

  .neo-btn {
    padding: 10px 14px;
    font-size: 12px;
  }
}
</style>
