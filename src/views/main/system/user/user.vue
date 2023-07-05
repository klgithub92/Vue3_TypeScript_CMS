<template>
  <div class="user">
    <!-- 1.头部搜索 -->
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <!-- 2.内容部分 -->
    <user-content
      ref="contentRef"
      @create-new-user="handleCreateNewUser"
      @edit-user="handleEditUserClick"
    />

    <!-- 3.创建用户模态框 -->
    <user-model ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModel from './c-cpns/user-model.vue'

// 拿到子组件
const contentRef = ref<InstanceType<typeof UserContent>>()

// 查询
function handleQueryClick(searchForm: any) {
  // console.log(searchForm)
  contentRef.value?.fetchUserListData(searchForm)
}

// 重置
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 新建用户
const modalRef = ref<InstanceType<typeof UserModel>>()
function handleCreateNewUser() {
  modalRef.value?.setModalVisible()
}

// 编辑用户
function handleEditUserClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
