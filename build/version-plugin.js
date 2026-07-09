/**
 * Vite 插件：在构建时生成 version.json 文件
 */

import { writeFileSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取项目根目录
const getRootDir = () => {
  return join(__dirname, '..')
}

// 获取 Git 信息（如果可用）
const getGitInfo = () => {
  try {
    const gitHash = execSync('git rev-parse --short HEAD', {
      cwd: getRootDir(),
      encoding: 'utf-8'
    }).trim()

    const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: getRootDir(),
      encoding: 'utf-8'
    }).trim()

    return { hash: gitHash, branch: gitBranch }
  } catch (error) {
    console.warn('Git information not available:', error.message)
    return { hash: '', branch: '' }
  }
}

// 从 package.json 读取版本号
const getPackageVersion = () => {
  try {
    const packagePath = join(getRootDir(), 'package.json')
    const packageJson = require(packagePath)
    return packageJson.version || '1.0.0'
  } catch (error) {
    console.warn('Failed to read package.json:', error.message)
    return '1.0.0'
  }
}

// 生成版本信息
const generateVersionInfo = () => {
  const now = new Date()
  const gitInfo = getGitInfo()

  return {
    version: getPackageVersion(),
    buildTime: now.toISOString(),
    buildDate: now.toLocaleString('zh-CN'),
    gitHash: gitInfo.hash,
    gitBranch: gitInfo.branch,
    environment: process.env.NODE_ENV || 'production',
    // 更新内容示例，可以从配置文件或 changelog 读取
    changes: [
      '性能优化',
      '界面更新',
      '功能增强'
    ],
    force: false // 是否强制更新
  }
}

// 创建 Vite 插件
export default function versionPlugin(options = {}) {
  const {
    outputDir = 'dist',
    fileName = 'version.json',
    versionInfo = null,
    updatePublic = true // 是否同时更新 public 目录
  } = options

  return {
    name: 'version-generator',

    // 在构建完成后生成 version.json
    writeBundle() {
      try {
        const versionData = versionInfo || generateVersionInfo()
        const outputPath = join(getRootDir(), outputDir, fileName)

        // 确保输出目录存在
        mkdirSync(join(getRootDir(), outputDir), { recursive: true })

        // 写入 dist 目录的 version.json
        writeFileSync(outputPath, JSON.stringify(versionData, null, 2), 'utf-8')

        // 同时更新 public 目录中的 version.json（用于开发环境）
        if (updatePublic) {
          const publicPath = join(getRootDir(), 'public', fileName)
          writeFileSync(publicPath, JSON.stringify(versionData, null, 2), 'utf-8')
          console.log(`✅ Public version file updated: ${publicPath}`)
        }

        console.log(`✅ Version file generated: ${outputPath}`)
        console.log(`📦 Version: ${versionData.version}`)
        console.log(`🕐 Build time: ${versionData.buildDate}`)

        if (versionData.gitHash) {
          console.log(`🔖 Git hash: ${versionData.gitHash}`)
        }
      } catch (error) {
        console.error('❌ Failed to generate version file:', error)
      }
    }
  }
}

// 导出工具函数供外部使用
export { generateVersionInfo, getGitInfo, getPackageVersion }
