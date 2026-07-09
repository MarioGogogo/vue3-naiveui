import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import smartVersionPlugin from './build/smart-version-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    smartVersionPlugin({
      outputDir: 'dist',
      fileName: 'version.json',

      // ═══════════════════════════════════════════════════════════════
      // 🚀 版本号自动递增配置 (autoIncrement)
      // ═══════════════════════════════════════════════════════════════
      // 日常开发/bug修复: 'patch'   → 1.0.0 → 1.0.1 → 1.0.2 (推荐默认)
      // 功能发布时:    'minor'   → 1.0.0 → 1.1.0 → 1.2.0
      // 重大更新时:    'major'   → 1.0.0 → 2.0.0 → 3.0.0
      // 完全手动管理:  false     → 不自动递增，需手动修改 package.json
      // ═══════════════════════════════════════════════════════════════
      autoIncrement: 'patch', // 👈 修改这里来控制版本号递增方式

      updatePackageJson: true, // 自动更新 package.json 中的版本号
      maxCommits: 10, // 从 Git 获取最近的10次提交用于生成更新日志
      updatePublic: true // 同时更新 public 目录（开发环境使用）
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
