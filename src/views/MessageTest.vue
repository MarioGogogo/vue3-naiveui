<template>
  <div class="test-container">
    <h1>Message 测试页面</h1>

    <div class="test-buttons">
      <button @click="testSuccess">测试成功消息</button>
      <button @click="testError">测试错误消息</button>
      <button @click="testWarning">测试警告消息</button>
      <button @click="testInfo">测试信息消息</button>
      <button @click="testLoading">测试加载消息</button>
      <button @click="testDefault">测试默认消息</button>
    </div>

    <div class="instructions">
      <h3>使用说明：</h3>
      <p>点击按钮测试不同类型的消息提示</p>
      <p>如果消息没有显示，请检查：</p>
      <ul>
        <li>浏览器控制台是否有错误</li>
        <li>是否重启了开发服务器</li>
        <li>样式文件是否正确加载</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import neoMessage from '@/utils/message'

const testSuccess = () => {
  console.log('Testing success message')
  neoMessage.success('这是一个成功消息！')
}

const testError = () => {
  console.log('Testing error message')
  neoMessage.error('这是一个错误消息！')
}

const testWarning = () => {
  console.log('Testing warning message')
  neoMessage.warning('这是一个警告消息！')
}

const testInfo = () => {
  console.log('Testing info message')
  neoMessage.info('这是一个信息消息！')
}

const testLoading = () => {
  console.log('Testing loading message')
  const loading = neoMessage.loading('正在加载...')
  setTimeout(() => {
    loading.destroy()
    neoMessage.success('加载完成！')
  }, 2000)
}

const testDefault = () => {
  console.log('Testing default message')
  neoMessage.message('这是一个默认消息！')
}
</script>

<style scoped>
.test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.test-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

.test-buttons button {
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #000;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0 #000;
}

.test-buttons button:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 #000;
}

.test-buttons button:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 #000;
}

.instructions {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #ddd;
}

.instructions h3 {
  margin-top: 0;
}

.instructions ul {
  margin: 10px 0;
  padding-left: 20px;
}
</style>
