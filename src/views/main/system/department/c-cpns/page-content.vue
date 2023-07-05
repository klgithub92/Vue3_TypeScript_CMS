<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="createNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <!-- 用户列表 -->
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="部门名称"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="部门领导"
          prop="leader"
          width="150px"
        />
        <el-table-column
          align="center"
          label="上级部门"
          prop="parentId"
          width="150px"
        />
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column width="150px" align="center" label="操作">
          <template #default="scope">
            <el-button
              text
              type="primary"
              size="small"
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              text
              type="danger"
              size="small"
              icon="Delete"
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'

const emit = defineEmits(['newClick', 'editClick'])

// 1.发起action 请求userlist数据
const currentPage = ref(1) // 页码
const pageSize = ref(10) // 每页多少
const systemStore = useSystemStore()
fetchPageListData()

// 2.获取userList数据并展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数，用于发送网络请求
function fetchPageListData(searchForm: any = {}) {
  // 1.获取size和offset
  const size = pageSize.value // 每页多少条
  const offset = (currentPage.value - 1) * size // 偏移量
  const pageInfo = { size, offset }
  // 包含头部查询
  const queryInfo = { ...pageInfo, ...searchForm }

  // 2.发起网络请求
  systemStore.postPageListAction('department', queryInfo)
}

// 5.删除/新建/编辑用户
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction('department', id)
}
function createNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 向外暴露
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
