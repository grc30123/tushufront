<template>
  <el-dialog :title="dlgTitle" width="width:600px" :visible.sync="dialogVisible" @before-close="resetForm">
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px">
      <el-form-item v-if="falg !== 0" label="ID">
        <el-input v-if="form.idUser !== 0" v-model="form.idUser" :disabled="form.idUser > 0" />
      </el-form-item>
      <el-form-item label="账户名">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onEditSave">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { GetById, SaveOrUpdate } from '@/api/user'
export default {
  components: {},
  data() {
    return {
      falg: null,
      dlgTitle: '',
      dialogVisible: false,
      form: {
        idUser: 0,
        account: '',
        password: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
  },
  methods: {
    resetForm() {
      this.form = {
        idUser: '',
        account: '',
        password: '',
        phone: '',
        email: ''
      }
    },
    onOpen(data) {
      console.log(data)
      this.form.idUser = data
      this.falg = data
      // eslint-disable-next-line eqeqeq
      if (data == 0) {
        this.dlgTitle = '添加图书'
        this.resetForm()
      } else {
        const id = { id: data }
        console.log(id)
        GetById(id).then((rsp) => {
          console.log(rsp)
          if (rsp.data.code === 200) {
            this.form = rsp.data.data
          } else {
            this.$message.error(rsp.msg)
          }
        })
        this.dlgTitle = '修改图书'
      }
      this.dialogVisible = true
    },
    onEditSave() {
      if (this.form.author === '' || this.form.name === '' || this.form.price === '' || this.form.publicationDate === '') {
        this.$message.error('请将数据填写完整')
        return
      }
      const data = this.form
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

