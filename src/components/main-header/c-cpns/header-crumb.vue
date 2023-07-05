<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.name"
        :to="item.path"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'

const userMenus = useLoginStore().userMenus
// 面包屑导航数据
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped></style>
