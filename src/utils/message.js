/**
 * Neo-Brutalism 风格的 Message 组件封装
 * 使用 NaiveUI 的 createDiscreteApi 实现
 */

import { createDiscreteApi } from 'naive-ui'

// 创建离散 API 实例（独立于组件树）
// 不在配置中传递 messageProviderProps，而是在调用时传递
const { message: messageApi } = createDiscreteApi(['message'])

// Neo-Brutalism Message API
const neoMessage = {
  // 普通消息
  message: (content, options = {}) => {
    return messageApi.create(content, {
      duration: 3000,
      keepAliveOnHover: true,
      closable: true,
      ...options
    })
  },

  // 成功消息
  success: (content, options = {}) => {
    return messageApi.success(content, {
      duration: 3000,
      keepAliveOnHover: true,
      closable: true,
      ...options
    })
  },

  // 错误消息
  error: (content, options = {}) => {
    return messageApi.error(content, {
      duration: 4000,
      keepAliveOnHover: true,
      closable: true,
      ...options
    })
  },

  // 警告消息
  warning: (content, options = {}) => {
    return messageApi.warning(content, {
      duration: 3500,
      keepAliveOnHover: true,
      closable: true,
      ...options
    })
  },

  // 信息消息
  info: (content, options = {}) => {
    return messageApi.info(content, {
      duration: 3000,
      keepAliveOnHover: true,
      closable: true,
      ...options
    })
  },

  // 加载消息
  loading: (content = '加载中...', options = {}) => {
    return messageApi.loading(content, {
      duration: 0,
      keepAliveOnHover: true,
      ...options
    })
  },

  // 销毁所有消息
  destroyAll: () => {
    messageApi.destroyAll()
  }
}

export default neoMessage
