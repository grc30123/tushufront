<template>
  <div>
    <div style="width: 100%; height: 50px">
      <el-row style="float: left; line-height: 40px">
        <el-col class="dt" :span="4">用户名</el-col>
        <el-col class="dd" :span="14">
          <el-input v-model="queryName" class="wide" clearable placeholder="关键字" />
        </el-col>
        <el-col :span="6" class="dd text-right">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" style="float: right" @click="onEdit(0)">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="idUser" label="用户ID" />
      <el-table-column prop="account" label="账户名" />
      <el-table-column prop="roleName" label="角色" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="phone" label="手机" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="onRole(scope.row.idUser)">分配角色</el-button>
          <el-button type="text" @click="onEdit(scope.row.idUser)">编辑</el-button>
          <el-button type="text" @click="onDelete(scope.row.idUser)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="margin-top: 15px; float: right">
      <el-pagination
        v-if="total > 0"
        background
        :current-page="queryCondidate.current"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="queryCondidate.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
    <editform ref="editform" @onRefresh="onRefresh" />
    <role ref="role" @onRefresh="onRefresh" />
  </div>
</template>

<script>
import { GetList, DeleteById } from '@/api/user'
import editform from '../user/edit.vue'
import role from '../user/role.vue'

export default {
  components: { editform, role },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      queryCondidate: {
        current: 1,
        size: 10,
        condition: {
          account: null
        }
      },
      queryName: ''
    }
  },
  computed: {},
  created() {
    this.queryCondidate.current = 1
    this.GetList()
  },
  methods: {
    GetList() {
      GetList(this.queryCondidate).then((response) => {
        if (response.data.code === 200) {
          this.tableData = response.data.data.list
          console.log(response)
          console.log(this.tableData)
          this.total = response.data.data.total
          const page = {
            total: this.total,
            size: this.queryCondidate.size,
            index: this.queryCondidate.current
          }
          this.$emit('page', page)
        } else {
          this.$message.error('获取列表出错！原因：' + response.msg)
        }
      })
    },

    // ------------------分页-查询-----------------------------
    handleSearch() {
      const condition = { account: this.queryName }
      // this.queryCondidate.size = condition
      this.queryCondidate.condition = condition
      this.queryCondidate.current = 1
      this.GetList()
    },
    onSizeChange(pageSize) {
      this.queryCondidate.size = pageSize
      this.GetList()
    },
    onCurrentChange(pageIndex) {
      this.queryCondidate.current = pageIndex
      this.GetList()
    },
    onRefresh() {
      this.GetList()
    },
    onRole(id) {
      this.$refs['role'].onOpen(id)
    },
    onEdit(id) {
      this.$refs['editform'].onOpen(id)
    },
    onDelete(idU) {
      this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = { id: idU }
          DeleteById(data).then((response) => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              const index = this.total % this.queryCondidate.size
              if (index === 1) {
                --this.queryCondidate.current
                this.onCurrentChange()
              }
              setTimeout(() => {
                this.onRefresh()
              }, 100)
              // this.onRefresh()
            } else {
              this.$message.error('删除失败！原因：' + response.msg)
            }
          })
        })
        .catch(() => {
        })
    }
  }
}
</script>
