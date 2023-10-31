<template>
  <div>
    <el-dialog
      :title="dlgTitle"
      width="width:600px"
      :visible.sync="dialogVisible"
      @before-close="resetForm"
    >
      <el-form ref="form" :model="form" label-width="80px" style="width: 500px">
        <el-form-item v-if="falg!== 0" label="ID">
          <el-input v-if="form.id!== 0" v-model="form.id" :disabled="form.id > 0" />
        </el-form-item>
        <!--        <el-form-item label="创建时间">-->
        <!--          <el-date-picker v-model="form.createDate" type="date" placeholder="选择日期" :disabled="form.id" />-->
        <!--        </el-form-item>-->
        <el-form-item label="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onEditSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getById } from '@/api/resource'
import { saveOrUpdate } from '@/api/resource'

export default {
  name: 'Edit',
  data() {
    return {
      falg: null,
      dlgTitle: '',
      dialogVisible: false,
      form: {
        id: 0,
        name: '',
        createDate: '',
        url: ''
      }
    }
  },
  computed: {},
  methods: {
    resetForm() {
      this.form = {
        id: 0,
        name: '',
        createDate: '',
        url: ''
      }
    },
    onOpen(id) {
      console.log(id)
      this.form.idUser = id
      this.falg = id
      if (id === 0) {
        this.dlgTitle = '添加资源'
        this.resetForm()
        this.dialogVisible = true
      } else {
        this.dialogVisible = true
        getById({ id: id }).then(res => {
          this.form = res.data
        })
      }
    },
    onEditSave() {
      saveOrUpdate(this.form).then(res => {
        if (res.data !== null) {
          this.$message.success('保存成功!')
          this.dialogVisible = false
          this.$emit('onRefresh')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
