<template>
  <el-dialog :title="dlgTitle" width="width:600px" :visible.sync="dialogVisible" @before-close="resetForm">
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px">
      <el-form-item v-if="falg !== 0" label="ID">
        <el-input v-if="form.orderId !== 0" v-model="form.orderId" :disabled="form.orderId > 0" />
      </el-form-item>
      <el-form-item label="顾客名">
        <el-input v-model="form.customerName" />
      </el-form-item>
      <el-form-item label="提交时间">
        <el-input v-model="form.orderDate" />
      </el-form-item>
      <el-form-item label="用户账户">
        <el-input v-model="form.account" />
      </el-form-item>
      <!--      <el-form-item label="待支付">-->
      <!--        <el-input v-model="form.paid" />-->
      <!--      </el-form-item>-->
      <el-form-item label="订单金额">
        <el-input v-model="form.totalAmount" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onEditSave">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { GetById, SaveOrUpdate } from '@/api/orders'

export default {
  components: {},
  data() {
    return {
      falg: null,
      dlgTitle: '',
      dialogVisible: false,
      form: {
        orderId: null,
        customerName: '',
        orderDate: '',
        account: '',
        paid: '2',
        totalAmount: null
      }
    }
  },
  computed: {},
  methods: {
    resetForm() {
      this.form = {
        orderId: 0,
        customerName: '',
        orderDate: '',
        account: '',
        paid: '0',
        totalAmount: null
      }
    },
    onOpen(data) {
      this.form.id = data
      this.falg = data
      if (data === 0) {
        this.dlgTitle = '添加订单'
        this.insertRole = true
        this.resetForm()
      } else {
        const id = { id: data }
        GetById(id).then((rsp) => {
          if (rsp.data.code === 200) {
            this.form = rsp.data.data
            this.oldRoleName = this.form.roleName
          } else {
            this.$message.error(rsp.msg)
          }
        })
        this.dlgTitle = '更改订单'
      }
      this.dialogVisible = true
    },
    onEditSave() {
      const data = {
        orderId: this.form.orderId,
        customerName: this.form.customerName,
        orderDate: this.form.orderDate,
        account: this.form.account,
        paid: this.form.paid,
        totalAmount: this.form.totalAmount
      }
      SaveOrUpdate(data).then((rsp) => {
        if (rsp.data.code === 200) {
          this.resetForm()
          this.$message.success('保存成功!')
          this.dialogVisible = false
          this.$emit('onRefresh')
        } else {
          this.$message.error(rsp.msg)
        }
      })
    }
  }

}
</script>

