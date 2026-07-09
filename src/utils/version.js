/**
 * 版本更新检测工具
 * 用于检测 H5 应用是否有新版本发布
 */

const VERSION_KEY = 'app_version'
const LAST_CHECK_KEY = 'last_version_check'

// 本地存储的版本信息
let localVersion = null

/**
 * 获取本地存储的版本信息
 */
export const getLocalVersion = () => {
  if (!localVersion) {
    const stored = localStorage.getItem(VERSION_KEY)
    if (stored) {
      try {
        localVersion = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse local version:', e)
      }
    }
  }
  return localVersion
}

/**
 * 保存版本信息到本地存储
 */
export const saveLocalVersion = (version) => {
  localVersion = version
  localStorage.setItem(VERSION_KEY, JSON.stringify(version))
  localStorage.setItem(LAST_CHECK_KEY, Date.now().toString())
}

/**
 * 获取上次检查时间
 */
export const getLastCheckTime = () => {
  const stored = localStorage.getItem(LAST_CHECK_KEY)
  return stored ? parseInt(stored) : 0
}

/**
 * 从服务器获取最新版本信息
 */
export const fetchRemoteVersion = async (baseUrl = '') => {
  try {
    // 添加时间戳防止缓存
    const timestamp = Date.now()
    const url = `${baseUrl}/version.json?t=${timestamp}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const version = await response.json()
    return version
  } catch (error) {
    console.error('Failed to fetch version:', error)

    // 开发环境下的回退逻辑
    if (import.meta.env.DEV) {
      console.warn('Running in development mode, using fallback version info')
      return {
        version: '1.0.0',
        buildTime: new Date().toISOString(),
        environment: 'development',
        changes: [
          '🎉 首次发布',
          '✨ Neo-Brutalism 设计风格',
          '🚀 虚拟列表高性能组件',
          '💬 消息通知组件',
          '🔄 版本更新检测功能'
        ],
        force: false
      }
    }

    return null
  }
}

/**
 * 比较版本号
 * 返回: 1 (v1 > v2), -1 (v1 < v2), 0 (v1 == v2)
 */
export const compareVersions = (v1, v2) => {
  const parts1 = v1.split('.').map(Number)
  const parts2 = v2.split('.').map(Number)

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0
    const part2 = parts2[i] || 0

    if (part1 > part2) return 1
    if (part1 < part2) return -1
  }

  return 0
}

/**
 * 检查是否有更新
 */
export const checkForUpdates = async (
  baseUrl = '',
  onNoUpdate,
  onHasUpdate,
  onForceUpdate
) => {
  try {
    const localVersion = getLocalVersion()
    const remoteVersion = await fetchRemoteVersion(baseUrl)

    if (!remoteVersion) {
      console.warn('Failed to fetch remote version')
      return false
    }

    // 如果没有本地版本，直接保存远程版本
    if (!localVersion) {
      saveLocalVersion(remoteVersion)
      return false
    }

    // 比较版本号
    const comparison = compareVersions(remoteVersion.version, localVersion.version)

    if (comparison > 0) {
      // 有新版本
      console.log(`New version available: ${localVersion.version} -> ${remoteVersion.version}`)

      if (remoteVersion.force || comparison >= 1) {
        // 强制更新（主版本号变化或标记为强制更新）
        onForceUpdate?.(remoteVersion)
      } else {
        // 普通更新提示
        onHasUpdate?.(localVersion, remoteVersion)
      }

      return true
    } else {
      // 没有更新
      onNoUpdate?.()
      return false
    }
  } catch (error) {
    console.error('Version check failed:', error)
    return false
  }
}

/**
 * 清除本地版本信息（用于测试）
 */
export const clearLocalVersion = () => {
  localVersion = null
  localStorage.removeItem(VERSION_KEY)
  localStorage.removeItem(LAST_CHECK_KEY)
}

export default {
  getLocalVersion,
  saveLocalVersion,
  getLastCheckTime,
  fetchRemoteVersion,
  compareVersions,
  checkForUpdates,
  clearLocalVersion
}
