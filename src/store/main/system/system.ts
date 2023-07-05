import {
  createUserData,
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  postPageListData,
  postUsersListDate
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 查询用户
    async postUsersListAction(query: any) {
      const res = await postUsersListDate(query)
      const { totalCount, list } = res.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },

    // 删除用户
    async deleteUserByIdAction(id: number) {
      // 1.删除用户
      const res = await deleteUserById(id)
      console.log(res)

      // 2.重新请求新数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    // 新建用户
    async createUserDataAction(userinfo: any) {
      // 1.创建新用户
      const res = await createUserData(userinfo)
      console.log(res)

      // 2.重新请求新数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    // 编辑用户
    async editUserDataAction(id: number, userinfo: any) {
      // 1.网络请求编辑用户
      const res = await editUserData(id, userinfo)
      console.log(res)

      // 2.重新请求新数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** page页面的增删改查*/
    // 查
    async postPageListAction(pageName: string, queryInfo: any) {
      const res = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = res.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    // 删
    async deletePageByIdAction(pageName: string, id: number) {
      const res = await deletePageById(pageName, id)
      console.log(res)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 增
    async newPageDataAction(pageName: string, pageInfo: any) {
      // 1.创建新用户
      const res = await newPageData(pageName, pageInfo)
      console.log(res)

      // 2.重新请求新数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 改
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const res = await editPageData(pageName, id, pageInfo)
      console.log(res)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
