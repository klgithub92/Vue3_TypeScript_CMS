<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '创建部门' : '编辑部门'"
      width="30%"
      center
    >
      <!-- 表单 -->
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门领导" />
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select
            v-model="formData.parentId"
            placeholder="请选择部门名称"
            style="width: 100%"
          >
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 确定和取消 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'

// 1.定义内部数据
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

// 2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 3.定义设置dialogVisible方法(异步暴露方法)
function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  // 编辑
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
  // 这里可以左其他操作
  dialogVisible.value = true
}

// 4.点击确定的逻辑
function handleConfirmClick() {
  // 编辑确定
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    systemStore.newPageDataAction('department', formData)
  }
  // 可以做一些验证
  dialogVisible.value = false
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped></style>
