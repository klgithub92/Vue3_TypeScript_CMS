import klRequest from '..'

// 获取所有角色
export function getEntireRoles() {
  return klRequest.post({
    url: '/role/list'
  })
}

// 获取所有部门
export function getEntireDepartments() {
  return klRequest.post({
    url: '/department/list'
  })
}

// 获取所有权限菜单
export function getEntireMenus() {
  return klRequest.post({
    url: '/menu/list'
  })
}
