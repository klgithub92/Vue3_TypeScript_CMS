<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      ref="contentRef"
    />
    <page-model
      :model-config="modelConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-model>
  </div>
</template>

<script setup lang="ts" name="role">
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageModel from '@/components/page-model/page-model.vue'
import modelConfig from './config/model.config'
import { usePageContent, usePageModel } from '@/hooks'
import useMainStore from '@/store/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModel(
  newCallBack,
  editCallBack
)

// 获取权限菜单数据
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
// 处理新建角色分配权限
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList: menuList }
}

// 处理编辑回显
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallBack(itemData: any) {
  // console.log(itemData.menuList)
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}

function newCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<style scoped></style>
