<template>
  <div class="department">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <PageContent
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader">#{{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">*{{ scope.row[scope.prop] }}</span>
      </template>
    </PageContent>
    <PageModel :model-config="modelConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model//page-model.vue'
import useMainStore from '@/store/main/main'
import { usePageContent, usePageModel } from '@/hooks'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

// 对modelConfig数据进行预先处理
const modelConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item: any) => {
    return { label: item.name, value: item.id }
  })
  modelConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modelConfig
})

// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModel()
</script>

<style scoped>
.leader {
  color: red;
}
.parent {
  color: palevioletred;
}
</style>
