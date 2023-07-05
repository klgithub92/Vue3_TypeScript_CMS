<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">家乐后台管理系统</h1>

    <!-- 中间tabs切换 -->
    <div class="tabs">
      <!-- 标签的宽度是否自撑开stretch -->
      <!-- v-model查看点击账号还是手机登录 与下方name属性关联 -->
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登录的Pane -->
        <el-tab-pane name="account">
          <!-- 使用具名插槽提添加图标 -->
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>

        <!-- 2.手机登录的Pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanePhone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 顶部控制面板 -->
    <div class="controls">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="loginHandleClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const isKeepPwd = ref<boolean>(localCache.getCache('isKeepPwd') ?? false)
watch(isKeepPwd, (newValue) => {
  // 保留记住密码信息
  localCache.setCache('isKeepPwd', newValue)
})
// 获取子组件
const accountRef = ref<InstanceType<typeof PaneAccount>>()

// 登录处理
function loginHandleClick() {
  if (activeName.value === 'account') {
    accountRef.value?.accountLogin(isKeepPwd.value)
  } else if (activeName.value === 'phone') {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  // margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
