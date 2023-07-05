import klRequest from '@/service'

// 用户的网络请求
export function postUsersListDate(query: any) {
  return klRequest.post({
    url: '/users/list',
    data: query
  })
}

// 根据id删除用户
export function deleteUserById(id: number) {
  return klRequest.delete({
    url: `/users/${id}`
  })
}

// 新建用户
export function createUserData(userinfo: any) {
  return klRequest.post({
    url: '/users',
    data: userinfo
  })
}

// 根据id编辑用户
export function editUserData(id: number, userinfo: any) {
  return klRequest.patch({
    url: `/users/${id}`,
    data: userinfo
  })
}

/** page页面的增删改查*/
export function postPageListData(pageName: string, queryInfo: any) {
  return klRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return klRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return klRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return klRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
