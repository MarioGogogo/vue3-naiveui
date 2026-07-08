import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 导入 Naive UI
import naive from 'naive-ui'

// 导入路由
import router from './router'

const app = createApp(App)
app.use(naive)
app.use(router)
app.mount('#app')
