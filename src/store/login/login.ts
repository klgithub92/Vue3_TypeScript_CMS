import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENU } from '@/global/constants'
import router from '@/router'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

const useLoginStore = defineStore('login', () => {
  const token = ref<string>(localCache.getCache(LOGIN_TOKEN) ?? '')
  const userInfo = ref<any>(localCache.getCache(USER_INFO) ?? {}) // 录用户的详细信息
  const userMenus = ref<any>(localCache.getCache(USER_MENU) ?? []) // 菜单信息
  const permissions = ref<any>([]) // 菜单信息
  // 这里发送网络请求
  async function accountLoginAction(account: IAccount) {
    // 1.获取请求数据
    const res = await accountLoginRequest(account)
    const id = res.data.id
    // const name = res.data.name
    token.value = res.data.token

    localCache.setCache(LOGIN_TOKEN, token.value) // 必须在这里

    // 2.获取登录用户的详细信息(role信息) 这里就要token了
    const userInfoResult = await getUserInfoById(id)
    userInfo.value = userInfoResult.data
    // console.log(userinfo.value.role)

    // 3.根据角色请求对应权限信息
    const menusInfoResult = await getUserMenusByRoleId(userInfo.value.role.id)
    userMenus.value = menusInfoResult.data

    // 4.本地缓存
    localCache.setCache(USER_INFO, userInfo.value)
    localCache.setCache(USER_MENU, userMenus.value)

    // 5.请求所有roles/departments数据
    const mainStore = useMainStore()
    mainStore.fetchEntireDataAction()

    // 重要: 获取登录用户的所有按钮的权限
    const permissionsArr = mapMenusToPermissions(userMenus.value)
    permissions.value = permissionsArr

    // 重要：动态添加路由
    const routes = mapMenusToRoutes(userMenus.value)
    routes.forEach((route) => router.addRoute('main', route))

    // 6.登录成功 跳转到main
    router.push('/main')
  }

  // 防止用户在main页面时刷新 确保动态路由还在
  function loadLocalCacheAction() {
    // 1.用户进行刷新时默认加载数据
    const token = localCache.getCache(LOGIN_TOKEN)
    const userInfo = localCache.getCache(USER_INFO)
    const userMenus = localCache.getCache(USER_MENU)
    if (token && userInfo && userMenus) {
      // 刷新时重新请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要: 获取登录用户的所有按钮的权限
      const permissionsArr = mapMenusToPermissions(userMenus)
      permissions.value = permissionsArr

      // 动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }

  return {
    token,
    userInfo,
    userMenus,
    permissions,
    accountLoginAction,
    loadLocalCacheAction
  }
})

export default useLoginStore
