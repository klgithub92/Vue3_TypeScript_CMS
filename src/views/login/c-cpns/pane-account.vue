<template>
  <div class="pane-account">
    <!-- :rules="accountRules"验证规则 绑定item的prop属性对应 -->
    <el-form
      label-width="60px"
      size="large"
      :model="account"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus' // 不引入也可以使用
import type { ElForm, FormRules } from 'element-plus'
import { ref } from 'vue'
import { reactive } from 'vue'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const LOGIN_NAME = 'name'
const LOGIN_PASSWORD = 'password'

// 1.定义表单数据
const account = reactive<IAccount>({
  name: localCache.getCache(LOGIN_NAME) ?? '',
  password: localCache.getCache(LOGIN_PASSWORD) ?? ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: '用户名必须是6-20为数字和字母',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须在6为以上的数字和字母',
      trigger: 'blur'
    }
  ]
}

// 3.帐号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const useLogin = useLoginStore()
function accountLogin(isKeepPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.保留用户名和密码
      const name = account.name
      const password = account.password

      // 2.发送网络请求携带用户名和密码
      useLogin.accountLoginAction({ name, password }).then(() => {
        // 登录成功后
        // 3.判断是否记住密码
        if (isKeepPwd) {
          // 保留用户名和密码
          localCache.setCache(LOGIN_NAME, name)
          localCache.setCache(LOGIN_PASSWORD, password)
        } else {
          localCache.removeCache(LOGIN_NAME)
          localCache.removeCache(LOGIN_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请您输入正确的用户名和密码！！.')
    }
  })
}

// 向外暴露属性和方法
defineExpose({
  accountLogin
})
</script>

<style lang="less" scoped></style>
