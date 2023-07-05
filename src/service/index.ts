import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import KLRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

// 统一导出
const klRequest = new KLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 配置拦截器
  interceptors: {
    requestSuccessFn(config) {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

// export const klRequest2 = new KLRequest({
//   baseURL: 'http://codercba.com:1888/airbnb/api',
//   timeout: 80000,
//   interceptors: {
//     requestSuccessFn(config) {
//       console.log('爱彼迎请求成功拦截器')
//       return config
//     },
//     requestFailureFn(err) {
//       console.log('爱彼迎请求失败拦截器')
//       return err
//     },
//     responseSuccessFn(res) {
//       console.log('爱彼迎响应成功拦截器')
//       return res
//     },
//     responseFailureFn(err) {
//       console.log('爱彼迎响应失败拦截器')
//       return err
//     }
//   }
// })

export default klRequest
