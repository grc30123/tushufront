<template>
  <div>
    <div style="width: 100%; height: 50px">
      <el-row style="float: left; line-height: 40px">
        <el-col class="dt" :span="4">资源名</el-col>
        <el-col class="dd" :span="14">
          <el-input v-model="queryName" class="wide" clearable placeholder="关键字" />
        </el-col>
        <el-col :span="6" class="dd text-right">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" style="float: right" @click="onEdit(0)">添加</el-button>
    </div>
    <el-table :data="Datalist" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="资源名" />
      <el-table-column prop="url" label="地址" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createDate |formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="onEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="onDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="margin-top: 15px; float: right">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="total"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="onSizeChange"
        @current-change="onPageChange"
      />
    </div>

    <edit ref="edit" @onRefresh="onRefresh" />

  </div>
</template>

<script>
import { pageList, resourceList } from '@/api/resource'
import { format } from 'date-fns'
import Edit from '@/views/resource/edit.vue'
import { deleteById } from '@/api/resource'

export default {
  name: 'Resource',
  components: { Edit },
  filters: {
    formatDateTime(dateTime) {
      return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss')
    }
  },
  data() {
    return {
      Datalist: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      queryName: ''
    }
  },
  created() {
    // this.handleSearch()
    this.pageList()
  },
  methods: {
    resourceList,
    pageList() {
      pageList({
        current: this.currentPage,
        size: this.pageSize,
        name: this.queryName
      }).then(res => {
        this.Datalist = res.data.records
        this.total = res.data.total
        // this.$emit('page', { total: this.total, currentPage: this.currentPage })
      })
    },
    onPageChange(val) {
      this.currentPage = val
      this.pageList()
    },
    onSizeChange(val) {
      this.pageSize = val
      this.pageList()
    },
    handleSearch() {
      this.pageList()
    },
    onEdit(id) {
      this.$refs.edit.onOpen(id)
    },
    onRefresh() {
      this.pageList()
    },
    onDelete(id) {
      this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById({ id: id }).then(res => {
          if (res.data === true) {
            this.$message.success('删除成功!')
            this.pageList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
