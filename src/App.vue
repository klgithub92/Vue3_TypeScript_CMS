<template>
  <div class="app">
    <!-- 测试 -->
    <!-- <test /> -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
// import test from '@/test.vue'
// 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}

// 测试
// 只有子组件的根元素可以直接访问
// .test {
//   color: red;
//   // 这里不行 必须加deep
//   :deep(.title) {
//     font-size: 50px;
//   }
// }
</style>
