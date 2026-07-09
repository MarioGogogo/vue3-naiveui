<template>
  <div class="form-view-container">
    <!-- Neo-Brutalism 顶部栏 -->
    <div class="neo-header">
      <button class="neo-back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span class="back-text">返回</span>
      </button>
      <div class="header-info">
        <h1 class="neo-title">表单组件</h1>
        <p class="neo-subtitle">丰富输入控件</p>
      </div>
    </div>

    <div class="form-content">
      <!-- 基本信息表单 -->
      <div class="form-section">
        <h2 class="section-title">基本信息</h2>
        <n-form
          ref="formRef"
          :model="formValue"
          :rules="rules"
          label-placement="top"
          class="neo-form"
        >
          <!-- 文本输入 -->
          <n-form-item label="用户名" path="username">
            <n-input
              v-model:value="formValue.username"
              placeholder="请输入用户名"
              class="neo-input"
            />
          </n-form-item>

          <!-- 邮箱输入 -->
          <n-form-item label="邮箱地址" path="email">
            <n-input
              v-model:value="formValue.email"
              placeholder="请输入邮箱地址"
              type="email"
              class="neo-input"
            />
          </n-form-item>

          <!-- 密码输入 -->
          <n-form-item label="密码" path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
              class="neo-input"
            />
          </n-form-item>

          <!-- 文本域 -->
          <n-form-item label="个人简介" path="bio">
            <n-input
              v-model:value="formValue.bio"
              type="textarea"
              placeholder="请输入个人简介"
              :autosize="{ minRows: 3, maxRows: 6 }"
              class="neo-textarea"
            />
          </n-form-item>
        </n-form>
      </div>

      <!-- 选择组件 -->
      <div class="form-section">
        <h2 class="section-title">选择组件</h2>
        <n-form label-placement="top" class="neo-form">
          <!-- 下拉选择 -->
          <n-form-item label="城市">
            <n-select
              v-model:value="formValue.city"
              :options="cityOptions"
              placeholder="请选择城市"
              class="neo-select"
            />
          </n-form-item>

          <!-- 多选 -->
          <n-form-item label="兴趣爱好">
            <n-select
              v-model:value="formValue.interests"
              :options="interestOptions"
              multiple
              placeholder="请选择兴趣爱好"
              class="neo-select"
            />
          </n-form-item>

          <!-- 单选框 -->
          <n-form-item label="性别">
            <n-radio-group v-model:value="formValue.gender" class="neo-radio-group">
              <n-radio value="male" class="neo-radio">男</n-radio>
              <n-radio value="female" class="neo-radio">女</n-radio>
              <n-radio value="other" class="neo-radio">其他</n-radio>
            </n-radio-group>
          </n-form-item>

          <!-- 复选框 -->
          <n-form-item label="同意条款">
            <n-checkbox v-model:checked="formValue.agreeTerms" class="neo-checkbox">
              我同意服务条款和隐私政策
            </n-checkbox>
          </n-form-item>
        </n-form>
      </div>

      <!-- 日期时间 -->
      <div class="form-section">
        <h2 class="section-title">日期时间</h2>
        <n-form label-placement="top" class="neo-form">
          <!-- 日期选择 -->
          <n-form-item label="生日">
            <n-date-picker
              v-model:value="formValue.birthday"
              type="date"
              placeholder="请选择生日"
              class="neo-date-picker"
            />
          </n-form-item>

          <!-- 时间选择 -->
          <n-form-item label="预约时间">
            <n-time-picker
              v-model:value="formValue.appointmentTime"
              placeholder="请选择时间"
              class="neo-time-picker"
            />
          </n-form-item>

          <!-- 日期时间范围 -->
          <n-form-item label="活动时间">
            <n-date-picker
              v-model:value="formValue.eventDateRange"
              type="daterange"
              placeholder="请选择活动时间范围"
              class="neo-date-picker"
            />
          </n-form-item>
        </n-form>
      </div>

      <!-- 数字和开关 -->
      <div class="form-section">
        <h2 class="section-title">数值控制</h2>
        <n-form label-placement="top" class="neo-form">
          <!-- 数字输入 -->
          <n-form-item label="年龄">
            <n-input-number
              v-model:value="formValue.age"
              :min="1"
              :max="120"
              placeholder="请输入年龄"
              class="neo-input-number"
            />
          </n-form-item>

          <!-- 滑块 -->
          <n-form-item label="满意度">
            <n-slider
              v-model:value="formValue.satisfaction"
              :min="0"
              :max="100"
              :marks="{ 0: '0', 50: '50', 100: '100' }"
              class="neo-slider"
            />
            <div class="slider-value">当前值: {{ formValue.satisfaction }}</div>
          </n-form-item>

          <!-- 开关 -->
          <n-form-item label="启用通知">
            <n-switch
              v-model:value="formValue.enableNotification"
              class="neo-switch"
            />
          </n-form-item>

          <!-- 评分 -->
          <n-form-item label="评分">
            <n-rate
              v-model:value="formValue.rating"
              class="neo-rate"
            />
          </n-form-item>
        </n-form>
      </div>

      <!-- 上传组件 -->
      <div class="form-section">
        <h2 class="section-title">文件上传</h2>
        <n-form label-placement="top" class="neo-form">
          <n-form-item label="头像上传">
            <n-upload
              :max="1"
              :default-file-list="uploadFileList"
              @change="handleUploadChange"
              class="neo-upload"
            >
              <n-button class="neo-btn neo-btn-upload">
                <span class="material-symbols-outlined">upload_file</span>
                点击上传
              </n-button>
            </n-upload>
          </n-form-item>
        </n-form>
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <button type="button" @click="handleReset" class="neo-btn neo-btn-secondary">
          <span class="material-symbols-outlined">refresh</span>
          重置
        </button>
        <button type="button" @click="handleSubmit" class="neo-btn neo-btn-primary">
          <span class="material-symbols-outlined">send</span>
          提交表单
        </button>
      </div>
    </div>

    <!-- 提交结果弹窗 -->
    <n-modal v-model:show="showResultModal" preset="card" class="neo-modal" style="width: 500px;">
      <template #header>
        <div class="modal-header">
          <span class="material-symbols-outlined">check_circle</span>
          <span>表单提交结果</span>
        </div>
      </template>
      <div class="result-content">
        <div class="result-item">
          <span class="result-label">提交状态:</span>
          <span class="result-value success">成功</span>
        </div>
        <div class="result-item">
          <span class="result-label">用户名:</span>
          <span class="result-value">{{ formValue.username }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">邮箱:</span>
          <span class="result-value">{{ formValue.email }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">城市:</span>
          <span class="result-value">{{ getCityName(formValue.city) }}</span>
        </div>
      </div>
      <template #action>
        <button @click="showResultModal = false" class="neo-btn">
          确定
        </button>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NRadio,
  NRadioGroup,
  NCheckbox,
  NDatePicker,
  NTimePicker,
  NSlider,
  NSwitch,
  NRate,
  NUpload,
  NButton,
  NModal,
  useMessage
} from 'naive-ui'

const router = useRouter()
const message = useMessage()

// 表单引用
const formRef = ref(null)

// 表单数据
const formValue = reactive({
  username: '',
  email: '',
  password: '',
  bio: '',
  city: null,
  interests: [],
  gender: '',
  agreeTerms: false,
  birthday: null,
  appointmentTime: null,
  eventDateRange: null,
  age: 25,
  satisfaction: 75,
  enableNotification: true,
  rating: 4
})

// 验证规则
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur', 'input']
  },
  email: {
    required: true,
    message: '请输入邮箱地址',
    trigger: ['blur', 'input']
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur', 'input']
  }
}

// 城市选项
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
]

// 兴趣选项
const interestOptions = [
  { label: '编程', value: 'programming' },
  { label: '设计', value: 'design' },
  { label: '音乐', value: 'music' },
  { label: '运动', value: 'sports' },
  { label: '阅读', value: 'reading' },
  { label: '旅游', value: 'travel' }
]

// 上传文件列表
const uploadFileList = ref([])

// 显示结果弹窗
const showResultModal = ref(false)

// 返回首页
const goBack = () => {
  router.push('/')
}

// 获取城市名称
const getCityName = (value) => {
  const city = cityOptions.find(c => c.value === value)
  return city ? city.label : '未选择'
}

// 处理上传变化
const handleUploadChange = (options) => {
  uploadFileList.value = options.fileList
}

// 重置表单
const handleReset = () => {
  formRef.value?.restoreValidation()
  Object.assign(formValue, {
    username: '',
    email: '',
    password: '',
    bio: '',
    city: null,
    interests: [],
    gender: '',
    agreeTerms: false,
    birthday: null,
    appointmentTime: null,
    eventDateRange: null,
    age: 25,
    satisfaction: 75,
    enableNotification: true,
    rating: 4
  })
  uploadFileList.value = []
  message.success('表单已重置')
}

// 提交表单
const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('表单数据:', formValue)
      showResultModal.value = true
      message.success('表单提交成功！')
    } else {
      console.log('表单验证失败:', errors)
      message.error('请检查表单填写是否正确')
    }
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Manrope:wght@400;600;700;800&display=swap');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}

.form-view-container {
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
  padding: 10px 20px;
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
  gap: 8px;
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

.neo-btn-upload {
  background-color: #FFD600;
}

/* 顶部栏 */
.neo-header {
  background-color: #BF00FF;
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

/* 表单内容 */
.form-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 20px;
}

.form-section {
  background-color: #ffffff;
  border: 3px solid #000000;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 4px 4px 0px 0px #000000;
}

.section-title {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 18px;
  color: #000000;
  font-weight: 800;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  border-bottom: 2px solid #000000;
  padding-bottom: 12px;
}

/* 表单样式 */
.neo-form :deep(.n-form-item-label) {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.neo-form :deep(.n-form-item-blank) {
  min-height: auto;
}

/* 输入框样式 */
.neo-input :deep(.n-input__input-el),
.neo-input :deep(.n-input__placeholder) {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
}

.neo-input :deep(.n-input__border) {
  border: 2px solid #000000 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.neo-input :deep(.n-input__state-border--error) {
  border-color: #FF3131 !important;
}

.neo-input :deep(.n-input--focus .n-input__border) {
  border-color: #4ECDC4 !important;
  box-shadow: 2px 2px 0px 0px #4ECDC4 !important;
}

/* 文本域样式 */
.neo-textarea :deep(.n-input__textarea-el) {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
}

/* 下拉选择样式 */
.neo-select :deep(.n-base-selection) {
  border: 2px solid #000000 !important;
  border-radius: 0 !important;
}

.neo-select :deep(.n-base-selection--focus) {
  border-color: #4ECDC4 !important;
  box-shadow: 2px 2px 0px 0px #4ECDC4 !important;
}

.neo-select :deep(.n-base-selection__border) {
  border: none !important;
}

/* 单选框样式 */
.neo-radio-group {
  display: flex;
  gap: 16px;
}

.neo-radio :deep(.n-radio__dot) {
  border: 2px solid #000000;
}

.neo-radio :deep(.n-radio--checked .n-radio__dot) {
  background-color: #4ECDC4;
  border-color: #4ECDC4;
}

/* 复选框样式 */
.neo-checkbox :deep(.n-checkbox__box) {
  border: 2px solid #000000;
}

.neo-checkbox :deep(.n-checkbox--checked .n-checkbox__box) {
  background-color: #4ECDC4;
  border-color: #4ECDC4;
}

/* 日期选择器样式 */
.neo-date-picker :deep(.n-input__border) {
  border: 2px solid #000000 !important;
}

.neo-date-picker :deep(.n-input--focus .n-input__border) {
  border-color: #4ECDC4 !important;
  box-shadow: 2px 2px 0px 0px #4ECDC4 !important;
}

/* 数字输入样式 */
.neo-input-number :deep(.n-input-number__border) {
  border: 2px solid #000000 !important;
}

.neo-input-number :deep(.n-input-number--focus .n-input-number__border) {
  border-color: #4ECDC4 !important;
  box-shadow: 2px 2px 0px 0px #4ECDC4 !important;
}

/* 滑块样式 */
.neo-slider :deep(.n-slider-rail) {
  background-color: #e0e0e0;
  height: 4px;
}

.neo-slider :deep(.n-slider-rail__fill) {
  background-color: #4ECDC4;
}

.neo-slider :deep(.n-slider-handle) {
  border: 2px solid #000000;
  box-shadow: 2px 2px 0px 0px #000000;
}

.slider-value {
  margin-top: 8px;
  font-family: 'Manrope', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #000000;
}

/* 开关样式 */
.neo-switch :deep(.n-switch__rail) {
  background-color: #e0e0e0;
  border: 2px solid #000000;
  box-shadow: none;
}

.neo-switch :deep(.n-switch__rail--checked) {
  background-color: #4ECDC4;
}

.neo-switch :deep(.n-switch__button) {
  border: 2px solid #000000;
}

/* 评分样式 */
.neo-rate :deep(.n-rate__symbol) {
  color: #FFD600;
}

/* 上传样式 */
.neo-upload :deep(.n-upload-trigger) {
  border: 2px dashed #000000;
  background-color: #ffffff;
}

.neo-upload :deep(.n-upload-trigger:hover) {
  border-color: #4ECDC4;
  background-color: #f0f0f0;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

/* 结果弹窗 */
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

.result-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f5f5f5;
  border: 2px solid #000000;
}

.result-label {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
}

.result-value {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #000000;
}

.result-value.success {
  color: #39FF14;
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

  .form-content {
    padding: 16px;
  }

  .form-section {
    padding: 16px;
  }

  .section-title {
    font-size: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions button {
    width: 100%;
    justify-content: center;
  }
}
</style>