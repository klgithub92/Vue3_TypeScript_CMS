import { ref } from 'vue'
import type pageContentVue from '@/components/page-content/page-content.vue'

function usePageContent() {
  // 点击search, content的操作
  const contentRef = ref<InstanceType<typeof pageContentVue>>()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.handleQuery()
    contentRef.value?.fetchPageListData(queryInfo)
  }
  function handleResetClick() {
    contentRef.value?.handleReset()
  }
  return { contentRef, handleQueryClick, handleResetClick }
}

export default usePageContent
