<template>
  <div>
    <div style="width: 100%; height: 50px">
      <el-row style="float: left; line-height: 40px">
        <!--        <el-col class="dt" :span="4">{{ queryName }}</el-col>-->
        <span style="border: #772727" v-text="queryName+'：资源列表'" />
        <!--        <el-col class="dd" :span="14">-->
        <!--          <el-input v-model="queryName" class="wide" clearable placeholder="关键字" />-->
        <!--        </el-col>-->
        <!--        <el-col :span="6" class="dd text-right">-->
        <!--          <el-button type="primary" @click="handleSearch">查询</el-button>-->
        <!--        </el-col>-->
      </el-row>
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
    <div style="margin-top: 50px; float: right">
      <el-button type="primary" @click="goBack()">返回</el-button>
    </div>
  </div>
</template>

<script>
import { roleResourceList } from '@/api/resource'
import { format } from 'date-fns'
import { getRoleById } from '@/api/role'

export default {
  name: 'GetResource',
  filters: {
    formatDateTime(dateTime) {
      return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss')
    }
  },
  data() {
    return {
      id: '',
      Datalist: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      queryName: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    getRoleById({ id: this.id }).then(res => {
      this.queryName = res.data.data.roleName
      this.pageList()
      console.log(res)
    })
  },
  methods: {
    pageList() {
      const data = {
        current: this.currentPage,
        size: this.pageSize,
        roleName: this.queryName
      }
      console.log(this.queryName)
      roleResourceList(data).then(res => {
        console.log(res)
        this.Datalist = res.data.data
        this.total = res.data.total
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
    onRefresh() {
      this.pageList()
    },
    goBack() {
      this.$router.go(-1)
    }

  }
}
</script>

<style scoped>

</style>
