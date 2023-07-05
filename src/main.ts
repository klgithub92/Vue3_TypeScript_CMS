import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import icons from './global/register-icons'
import store from '@/store'
import 'normalize.css'
import '@/assets/css/index.less'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')

// 0.针对ElMessage和ElLoading等组件引入样试
// 1）全局引入样试 import 'element-plus/dist/index.css'
// 2）什么都不做 直接使用
// 3）组件样试引入 import 'element-plus/theme-chalk/el-message.css'
// 4）使用插件
/**
 * 4.1) npm i vite-plugin-style-import consola -D
 * 4.2) 配置vite.config.ts
 */

// 1.全局注册
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

// 2.以前按需引入
// import { ElButton } from 'element-plus'
// app.component(ElButton.name, ElButton)

// 3.安装插件按需引入 npm install -D unplugin-vue-components unplugin-auto-import

// import icons from './global/register-icons'
// 4.element-plus全局引入图标
