<template>
  <div>
    <div style="width: 100%; height: 50px">
      <el-row style="float: left; line-height: 40px">
        <el-col class="dt" :span="4">角色名</el-col>
        <el-col class="dd" :span="14">
          <el-input v-model="queryName" class="wide" clearable placeholder="关键字" />
        </el-col>
        <el-col :span="6" class="dd text-right">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" style="float: right" @click="onEdit(0)">新增角色</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="idRole" label="编号" />
      <el-table-column prop="roleName" label="角色名" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="onEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="onDelete(scope.row.id)">删除</el-button>
          <el-button type="text" @click="getResource(scope.row.id)">查看资源</el-button>
          <el-button type="text" @click="allocateResource(scope.row.id)">分配资源</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="margin-top: 15px; float: right">
      <el-pagination
        v-if="total > 0"
        :current-page="queryCondidate.current"
        background
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="queryCondidate.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
    <editform ref="editform" @onRefresh="onRefresh" />
  </div>
</template>

<script>
import editform from '@/views/role/edit.vue'
import { getRoleList } from '@/api/role'
import { roleDelete } from '@/api/role'

export default {
  name: 'Role',
  components: { editform },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      queryCondidate: {
        current: 1,
        size: 10,
        condition: {
          id: 0,
          idRole: 0,
          roleName: ''
        }
      },
      queryName: ''
    }
  },
  computed: {},
  created() {
    this.queryCondidate.current = 1
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      getRoleList(this.queryCondidate).then(response => {
        if (response.data.code === 200) {
          const pageData = response.data.data.roleList
          this.tableData = pageData
          this.total = response.data.data.total
          const page = {
            total: this.total,
            size: this.queryCondidate.size,
            index: this.queryCondidate.current
          }
          this.$emit('page', page)
        }
      })
    },
    handleSearch() {
      const condition = { name: this.queryName }
      // this.queryCondidate.size = condition
      // 打印
      this.queryCondidate.condition = condition
      this.queryCondidate.current = 1
      this.getRoleList()
    },
    onSizeChange(pageSize) {
      this.queryCondidate.size = pageSize
      this.getRoleList()
    },
    onCurrentChange(pageIndex) {
      this.queryCondidate.current = pageIndex
      this.getRoleList()
    },
    onRefresh() {
      this.getRoleList()
    },
    onEdit(id) {
      this.$refs['editform'].onOpen(id)
    },
    onDelete(id) {
      this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = { id: id }
          roleDelete(data).then((response) => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })

              const index = this.total % this.queryCondidate.size
              if (index === 1) {
                this.onCurrentChange(--this.queryCondidate.current)
              } else {
                this.onRefresh()
              }
            } else {
              this.$message.error('删除失败！原因：' + response.data.data)
            }
          })
        })
        .catch(() => {
        })
    },
    getResource(id) {
      this.$router.push({
        name: 'getResource',
        query: {
          id: id
        }
      })
    },
    allocateResource(id) {
      this.$router.push({
        name: 'allocateResource',
        query: {
          id: id
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
