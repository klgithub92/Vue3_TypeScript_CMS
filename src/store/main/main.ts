import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// interface IMainState {
//   entireRoles: any[]
//   entireDepartments: any[]
// }

const useMainStore = defineStore('main', () => {
  const entireRoles = ref<any>([]) // 角色
  const entireDepartments = ref<any>([]) // 部门
  const entireMenus = ref<any>([]) // 权限菜单

  async function fetchEntireDataAction() {
    const rolesResult = await getEntireRoles()
    const departmentsResult = await getEntireDepartments()
    const menusResult = await getEntireMenus()

    // 保存数据
    entireRoles.value = rolesResult.data.list
    entireDepartments.value = departmentsResult.data.list
    entireMenus.value = menusResult.data.list
  }

  return { entireRoles, entireDepartments, entireMenus, fetchEntireDataAction }
})

export default useMainStore
