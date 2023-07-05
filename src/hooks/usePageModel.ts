import type pageModelVue from '@/components/page-model/page-model.vue'
import { ref } from 'vue'

type CallBackType = (data?: any) => void

function usePageModel(newCallBack?: CallBackType, editCallBack?: CallBackType) {
  // 点击content, modal的操作
  const modalRef = ref<InstanceType<typeof pageModelVue>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    // 处理角色权限新建清除回显
    if (newCallBack) newCallBack()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    // 处理角色权限编辑回显
    if (editCallBack) editCallBack(itemData)
  }
  return { modalRef, handleEditClick, handleNewClick }
}

export default usePageModel
