<template>
  <div>
    <div style="width: 100%; height: 50px">
      <el-row style="float: left; line-height: 40px">
        <el-col class="dt" :span="4" />
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
      <el-table-column prop="orderId" label="订单ID" />
      <el-table-column prop="customerName" label="用户名" />
      <!--      <el-table-column prop="orderDate" label="提交时间" />-->
      <el-table-column prop="orderDate" label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.orderDate | formatDateTime }}
        </template>
      </el-table-column>

      <el-table-column prop="account" label="用户账号" />
      <el-table-column prop="paid" label="支付情况">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.paid === '1'" type="success">已支付</el-tag>
          <el-tag v-else-if="scope.row.paid === '2'" type="warning">待支付</el-tag>
          <el-tag v-else-if="scope.row.paid === '0'" type="danger">已失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="订单金额">
        <template slot-scope="scope">
          <span>￥{{ scope.row.totalAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="onEdit(scope.row.orderId)">修改</el-button>
          <el-button type="text" @click="onDelete(scope.row.orderId)">删除</el-button>
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
import { GetList, DeleteById } from '@/api/orders'
import editform from '../orders/edit.vue'
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
      loading: false,
      tableData: [],
      total: 0,
      queryCondidate: {
        current: 1,
        size: 10,
        condition: {
          account: '',
          customerName: '',
          orderDate: '',
          orderId: 0,
          paid: '',
          totalAmount: 0
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
          // if (response.data.data.list.length === 0) {
          //   --this.queryCondidate.current
          // }
          this.tableData = response.data.data.list
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
          DeleteById(data).then((response) => {
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
<style scoped>

</style>
