/// <reference types="vite/client" />

// 配置.vue文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// 配置.mjs文件
declare module '*.mjs'
