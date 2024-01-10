import './assets/main.css'
import { createApp } from 'vue'
// 第一步:引入 Pinia
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// 第二步:創建 Pinia
const pinia = createPinia()
// 第三部: 安裝pinia
app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
