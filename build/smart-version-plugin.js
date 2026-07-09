/**
 * 智能版本插件 - 简化版本
 * 自动化版本号管理和更新日志生成
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取项目根目录
const getRootDir = () => {
  return join(__dirname, '..')
}

// 获取 package.json 版本号
const getPackageVersion = () => {
  try {
    const packagePath = join(getRootDir(), 'package.json')
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'))
    return packageJson.version || '1.0.0'
  } catch (error) {
    return '1.0.0'
  }
}

// 自动递增版本号
const incrementVersion = (version, type = 'patch') => {
  const parts = version.split('.').map(Number)

  switch (type) {
    case 'major':
      parts[0] += 1
      parts[1] = 0
      parts[2] = 0
      break
    case 'minor':
      parts[1] += 1
      parts[2] = 0
      break
    case 'patch':
    default:
      parts[2] += 1
      break
  }

  return parts.join('.')
}

// 获取 Git 提交信息（简化版）
const getRecentCommits = (count = 10) => {
  try {
    const commits = execSync(`git log -${count} --pretty=format:"%h|%s"`, {
      cwd: getRootDir(),
      encoding: 'utf-8'
    }).trim().split('\n')

    return commits.map(line => {
      const [hash, subject] = line.split('|')
      return { hash, subject }
    })
  } catch (error) {
    return []
  }
}

// 生成更新日志
const generateChangelog = (commits) => {
  if (!commits || commits.length === 0) {
    return ['性能优化和问题修复']
  }

  const changes = []
  const maxChanges = 5

  commits.forEach(commit => {
    if (changes.length >= maxChanges) return

    const subject = commit.subject.toLowerCase()
    let formattedChange = commit.subject

    // 根据提交内容添加emoji
    if (subject.includes('feat') || subject.includes('新增')) {
      formattedChange = '✨ ' + formattedChange
    } else if (subject.includes('fix') || subject.includes('修复')) {
      formattedChange = '🐛 ' + formattedChange
    } else if (subject.includes('优化')) {
      formattedChange = '⚡ ' + formattedChange
    } else if (subject.includes('添加')) {
      formattedChange = '➕ ' + formattedChange
    } else if (subject.includes('更新')) {
      formattedChange = '🔄 ' + formattedChange
    } else {
      formattedChange = '📝 ' + formattedChange
    }

    changes.push(formattedChange)
  })

  // 确保至少有3条更新内容
  while (changes.length < 3) {
    changes.push('性能优化和问题修复')
  }

  return changes
}

// 判断是否需要强制更新
const shouldForceUpdate = (commits) => {
  const forceKeywords = ['breaking', '安全', '漏洞', 'critical', '重要']
  return commits.some(commit => {
    const subject = commit.subject.toLowerCase()
    return forceKeywords.some(keyword => subject.includes(keyword))
  })
}

// 创建智能版本插件
export default function smartVersionPlugin(options = {}) {
  const {
    outputDir = 'dist',
    fileName = 'version.json',
    updatePackageJson = true,
    autoIncrement = 'patch',
    maxCommits = 10,
    updatePublic = true
  } = options

  let finalVersion = null

  return {
    name: 'smart-version-generator',

    // 在构建开始时处理版本号
    buildStart() {
      if (autoIncrement) {
        try {
          const currentVersion = getPackageVersion()
          const newVersion = incrementVersion(currentVersion, autoIncrement)
          finalVersion = newVersion

          // 更新 package.json
          if (updatePackageJson) {
            const packagePath = join(getRootDir(), 'package.json')
            const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'))
            packageJson.version = newVersion
            writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf-8')
          }

          return newVersion
        } catch (error) {
          return getPackageVersion()
        }
      }
      return getPackageVersion()
    },

    // 在构建完成后生成 version.json
    writeBundle() {
      try {
        const version = finalVersion || getPackageVersion()
        const commits = getRecentCommits(maxCommits)
        const changes = generateChangelog(commits)
        const force = shouldForceUpdate(commits)

        const now = new Date()
        const versionData = {
          version: version,
          buildTime: now.toISOString(),
          buildDate: now.toLocaleString('zh-CN'),
          environment: process.env.NODE_ENV || 'production',
          changes: changes,
          force: force
        }

        // 写入 dist 目录
        const distPath = join(getRootDir(), outputDir, fileName)
        mkdirSync(join(getRootDir(), outputDir), { recursive: true })
        writeFileSync(distPath, JSON.stringify(versionData, null, 2), 'utf-8')

        // 同时更新 public 目录
        if (updatePublic) {
          const publicPath = join(getRootDir(), 'public', fileName)
          writeFileSync(publicPath, JSON.stringify(versionData, null, 2), 'utf-8')
        }

        console.log(`\n✅ 版本文件生成成功:`)
        console.log(`📦 版本: ${version}`)
        console.log(`🕐 构建时间: ${versionData.buildDate}`)
        console.log(`📝 更新内容: ${changes.length} 条`)
        if (force) {
          console.log(`⚠️  这是一个强制更新`)
        }
        console.log(`\n📋 更新内容:`)
        changes.forEach((change, index) => {
          console.log(`   ${index + 1}. ${change}`)
        })

      } catch (error) {
        console.error('❌ 版本文件生成失败:', error)
      }
    }
  }
}

// 导出工具函数
export { incrementVersion, getRecentCommits, generateChangelog, shouldForceUpdate }
