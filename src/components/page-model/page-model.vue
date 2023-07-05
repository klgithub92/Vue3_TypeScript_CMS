<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modelConfig.header.newTitle : modelConfig.header.editTitle
      "
      width="30%"
      center
    >
      <!-- 表单 -->
      <el-form :model="formData" label-width="80px" size="large">
        <template v-for="item in modelConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="subitem in item.options" :key="subitem.value">
                  <el-option :label="subitem.label" :value="subitem.value" />
                </template>
              </el-select>
            </template>
          </el-form-item>
        </template>
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
import useSystemStore from '@/store/main/system/system'

// 定义props
interface IProps {
  modelConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()
const initialData: any = {}
for (const item of props.modelConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}

// 1.定义内部数据
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
const formData = reactive<any>(initialData)

// 2.获取roles/departments数据
const systemStore = useSystemStore()

// 3.定义设置dialogVisible方法(异步暴露方法)
function setModalVisible(isNew: boolean = true, itemData?: any) {
  // 这里可以做其他操作
  dialogVisible.value = true

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
}

// 4.点击确定的逻辑
function handleConfirmClick() {
  // 合并数据
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  // 编辑确定
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(
      props.modelConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    systemStore.newPageDataAction(props.modelConfig.pageName, infoData)
  }
  // 可以做一些验证
  dialogVisible.value = false
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped></style>
