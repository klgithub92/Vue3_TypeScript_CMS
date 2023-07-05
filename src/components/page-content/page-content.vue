<template>
  <div class="content">
    <div class="header">
      <h3 class="title">
        {{ contentConfig?.header?.title ?? '数据列表' }}
      </h3>
      <el-button v-if="isCreate" type="primary" @click="createNewUserClick">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <!-- 用户列表 -->
      <!-- <el-table
        :data="pageList"
        border
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      > -->
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- <el-table-column
            align="center"
            :type="item.type"
            :label="item.label"
            :width="item.width"
            :prop="item.prop"
          /> -->
          <!-- 简写 -->
          <!-- <el-table-column align="center" v-bind="item" /> -->
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <!--作用域插槽 -->
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handle'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  text
                  type="primary"
                  size="small"
                  icon="Edit"
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
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
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <!-- 底部分页 -->
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
import { usePermissions } from '@/hooks'

// 自定义事件和数据
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const emit = defineEmits(['newClick', 'editClick'])
const props = defineProps<IProps>()

// 0.获取是否有对应的增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起action 请求userlist数据
const currentPage = ref(1) // 页码
const pageSize = ref(10) // 每页多少
const systemStore = useSystemStore()
// 6.监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  // after确保action执行完成成功之后执行
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
      pageSize.value = 10
    }
  })
})
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
// 获取查询数据
function fetchPageListData(searchForm: any = {}) {
  if (!isQuery) return // 查询权限

  // 1.获取size和offset
  const size = pageSize.value // 每页多少条
  const offset = (currentPage.value - 1) * size // 偏移量
  const pageInfo = { size, offset }
  // 包含头部查询
  const queryInfo = { ...pageInfo, ...searchForm }

  // 2.发起网络请求
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5.删除/新建/编辑用户
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function createNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 重置回到第一页
function handleReset() {
  currentPage.value = 1
  pageSize.value = 10
  fetchPageListData()
}

function handleQuery() {
  currentPage.value = 1
  pageSize.value = 10
}
// 向外暴露
defineExpose({ fetchPageListData, handleReset, handleQuery })
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
