<template>
  <div>
    <div style="width: 100%; height: 50px">
      <el-row style="float: left; line-height: 40px">
        <el-col class="dt" :span="4">图书名</el-col>
        <el-col class="dd" :span="14">
          <el-input v-model="queryName" class="wide" clearable placeholder="关键字" />
        </el-col>
        <el-col :span="6" class="dd text-right">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" style="float: right" @click="onEdit(0)">上架图书</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="bookId" label="图书编号" />
      <el-table-column label="图片地址">
        <template slot-scope="scope">
          <img :src="bookUrl+scope.row.imageUrl" style="width: 100px; height: 100px;">
          <!--          {{ scope.row.imageUrl }}-->
        </template>
      </el-table-column>
      <el-table-column prop="category" label="类别" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="description" label="简介" />
      <el-table-column prop="isbn" label="isbn" />
      <el-table-column prop="name" label="图书" />
      <el-table-column label="价格">
        <template slot-scope="scope">
          <span>￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出版日期">
        <template slot-scope="scop">{{ scop.row.publicationDate|formatDateTime }}</template>
      </el-table-column>
      <el-table-column prop="stockQuantity" label="库存" />
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="onEdit(scope.row.bookId)">修改</el-button>
          <el-button type="text" @click="onDelete(scope.row.bookId)">删除</el-button>
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
  </div>
</template>

<script>
import { getList, deletebook } from '@/api/book'
import editform from '../book/edit.vue'
import { format } from 'date-fns'

export default {
  components: { editform },
  filters: {
    formatDateTime(dateTime) {
      return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss')
    }
  },
  data() {
    return {
      bookUrl: process.env.VUE_APP_BASE_API + 'upLoad/read/',
      loading: false,
      tableData: [],
      total: 0,
      queryCondidate: {
        current: 1,
        size: 10,
        condition: {}
      },
      queryName: ''
    }
  },
  computed: {},
  created() {
    console.log(this.bookUrl)
    this.queryCondidate.current = 1
    this.GetList()
  },
  methods: {
    GetList() {
      getList(this.queryCondidate).then((response) => {
        if (response.data.code === 200) {
          console.log(response.data.data.list)
          this.tableData = response.data.data.list
          this.total = response.data.data.total
          console.log(this.tableData)
          console.log(this.total)
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
      const condition = { name: this.queryName }
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
      console.log('')
      this.GetList()
    },

    onRefresh() {
      this.GetList()
    },
    onEdit(bookId) {
      this.$refs['editform'].onOpen(bookId)
    },
    onDelete(bookid) {
      this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = { id: bookid }
          deletebook(data).then((response) => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              const index = this.total % this.queryCondidate.size
              if (index === 1) {
                this.onCurrentChange(--this.queryCondidate.current)
              }
              this.onRefresh()
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
