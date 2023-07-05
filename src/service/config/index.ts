// export const BASE_URL = 'http://codercba.com:1888/airbnb/api'
// export const TIME_OUT = 10000

// 根据不同模式选择
// 1.区分开发和生成环境
// export const BASE_URL = '开发环境地址'
// export const BASE_URL = '生产环境地址'

// 2.代码逻辑判断所处环境
let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.com:5000'
} else {
  BASE_URL = 'http://codercba.com:5000'
}
export { BASE_URL }
export const TIME_OUT = 10000
// 注意：vite默认提供的环境变量
// console.log(import.meta.env.BASE_URL) // 路径
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.MODE) // 所处模式
// console.log(import.meta.env.SSR) // 是否是服务端渲染

// 3.配置.env文件 .env.[mode] .env.[mode].local三种方式
// 注意：1.必须以 VITE_开头 2..env.development.local加上local git提交忽略
// console.log(import.meta.env.VITE_NAME)
// console.log(import.meta.env.VITE_PROD)
// console.log(import.meta.env.VITE_DEV)
