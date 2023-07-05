import klRequest from '..'
import type { IAccount } from '@/types'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

// 用户登录
export function accountLoginRequest(account: IAccount) {
  return klRequest.post({
    url: '/login',
    data: account
  })
}

// 获取登录用户详细信息
export function getUserInfoById(id: number) {
  return klRequest.get({
    url: `users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

// 根据角色请求对应权限信息:根据role的id 获取对应权限信息
export function getUserMenusByRoleId(id: number) {
  return klRequest.get({
    url: `/role/${id}/menu`
  })
}
