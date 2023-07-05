<template>
  <el-card class="box-card">
    <el-card class="box-card" :header="header">
      <slot>默认的内容</slot>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
interface IProps {
  header?: string
}

// 默认值
withDefaults(defineProps<IProps>(), {
  header: '卡片的头部标题'
})
</script>

<style lang="less" scoped></style>
