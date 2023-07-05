import type { RouteRecord, RouteRecordRaw } from 'vue-router'

/**
 * 重要：动态添加路由 一定在登录成功路由跳转之前
 * 根据次菜单动态的添加路由对象（独立的文件中）
 * 1).获取菜单（menusInfo)
 * 2).动态的获取所有的路由对象并放在数组中
 * 3).根据菜单取匹配正确的路径 router.addRoute('main',xx)
 */

function loadLocalRoutes() {
  const localRoutes: RouteRecord[] = []
  // 1.1读取router/main所有的ts文件
  // const files = import.meta.glob('@/router/main/**/*.ts')
  // console.log(files) // 文件路径：（）=>import('')
  // { eager: true }读取更具体的
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // console.log(files) // 文件路径：模块
  // 1.2将加载的对象放在localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

// 默认显示路由
export let firstMenu: any = null
/**
 *注册路由 映射菜单到路由
 * @param userMenus 所有菜单
 */
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单取匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      // console.log(submenu.url)
      const route = localRoutes.find((item) => item.path === submenu.url)
      // if (route) router.addRoute('main', route)
      if (route) {
        // 1.给route的顶层菜单加重定向功能(但是只需要添加一次)
        if (!routes.find((item) => item.path === menu.url)) {
          // 始终重定向到第一个
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 2.二级菜单对应的路由
        routes.push(route)
      }
      // 保留所有路由对象的第一个
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }
  return routes
}

/**
 * 映射刷新匹配对应路由
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
// 映射面包屑导航
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 角色权限菜单映射到数组列表
 * 重点：使用递归
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id) // 选择最里层id 上面自动选择
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**
 *  从菜单映射到按钮的权限
 * @param menuList 菜单列表
 * @returns 权限数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  // 使用递归函数
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
