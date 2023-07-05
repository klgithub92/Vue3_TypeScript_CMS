<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <!-- 2.个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://ts1.cn.mm.bing.net/th/id/R-C.91ce2b250bcc9defa4b833ae455efe8a?rik=%2bxD19qm1D7FN%2bQ&riu=http%3a%2f%2fwww.gx8899.com%2fuploads%2fallimg%2f2018040208%2fkbpelqqyfvx.jpg&ehk=zF%2bYcl2wF2U%2f6vV74IMOAneYS6M4H0jV6ygP2mk%2fvlo%3d&risl=&pid=ImgRaw&r=0"
          />
          <span class="name">{{ username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
// 退出登录
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}

// 用户名
const loginStore = useLoginStore()
const username = loginStore.userInfo.name
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  // 注意：vue特性：父组件可以直接修改子组件根元素的样试 但是子组件里面的子元素要加deep()
  // 这里的元素被转移到了app根外面了
  // :deep()是调用子组件 :global()是调用全局
  :global(.el-dropdown-menu__item) {
    line-height: 32px !important;
    padding: 6px 20px;
  }
}
</style>
