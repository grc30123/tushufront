<template>
  <el-dialog :title="dlgTitle" width="width:600px" :visible.sync="dialogVisible" @before-close="resetForm">
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px">
      <el-form-item v-if="falg !== 0" label="ID">
        <el-input v-if="form.id !== 0" v-model="form.id" :disabled="form.id > 0" />
      </el-form-item>
      <el-form-item label="角色名">
        <el-input v-model="form.roleName" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onEditSave">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getRoleById, roleInsert, roleUpdate, roleList } from '@/api/role'

export default {
  components: {},
  data() {
    return {
      falg: null,
      dlgTitle: '',
      dialogVisible: false,
      form: {
        id: '',
        idRole: '',
        roleName: ''
      },
      oldRoleName: '',
      insertRole: null
    }
  },
  computed: {},
  methods: {
    resetForm() {
      this.form = {
        id: '',
        idRole: '',
        roleName: ''
      }
    },
    onOpen(data) {
      this.form.id = data
      this.falg = data
      if (data === 0) {
        this.dlgTitle = '添加角色'
        this.insertRole = true
        this.resetForm()
      } else {
        this.insertRole = false
        const id = { id: data }
        getRoleById(id).then((rsp) => {
          if (rsp.data.code === 200) {
            this.form = rsp.data.data
            this.oldRoleName = this.form.roleName
          } else {
            this.$message.error(rsp.msg)
          }
        })
        roleList().then(res => {
          console.log(res)
          this.Datalist = res.data.data
        })
        this.dlgTitle = '更改角色'
      }
      this.dialogVisible = true
    },
    onEditSave() {
      if (this.form.roleName === '') {
        this.$message.error('请将数据填写完整')
        return
      }
      if (this.insertRole) {
        const data = {
          RoleName: this.form.roleName
        }
        roleInsert(data).then((rsp) => {
          if (rsp.data.code === 200) {
            this.resetForm()
            this.$message.success('添加成功!')
            this.dialogVisible = false
            this.insertRole = false
            this.$emit('onRefresh')
          } else {
            this.$message.error(rsp.data.data)
            this.dialogVisible = false
            this.$emit('onRefresh')
          }
        })
      } else {
        const data = {
          oldRoleName: this.oldRoleName,
          newRoleName: this.form.roleName
        }
        roleUpdate(data).then((rsp) => {
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
}
</script>

