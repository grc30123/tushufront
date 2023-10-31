<template>
  <el-dialog title="分配角色" width="30%" :visible.sync="dialogVisible" @before-close="resetForm">
    <el-select v-model="value" style="width: 80%" placeholder="请选择">
      <el-option
        v-for="item in Datalist"
        :key="item.roleName"
        :label="item.roleName"
        :value="item.idRole"
      />
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-form ref="form" :model="form" label-width="80px">
        <!--        <el-form-item>-->
        <el-button type="primary" size="small" @click="onEditSave">保存</el-button>
        <!--        </el-form-item>-->
      </el-form>
    </span>

  </el-dialog>
</template>

<script>
import { updateIdRole } from '@/api/user'
import { roleList } from '@/api/role' // 获取角色列表

export default {
  components: {},
  data() {
    return {
      idUser: '', // 传入的用户ID
      value: '', // 角色对应ID
      falg: null,
      dlgTitle: '',
      dialogVisible: false,
      form: {},
      Datalist: []
    }
  },
  methods: {
    resetForm() {
      this.form = {}
    },
    onOpen(userId) {
      this.idUser = userId
      roleList().then(res => {
        console.log(res)
        this.Datalist = res.data.data
      })
      this.dialogVisible = true
    },
    onEditSave() { // 将用户ID和角色ID绑定 this.value为角色ID
      // 通过用户ID更改新的角色ID
      console.log(this.value)
      const data = {
        idUser: this.idUser,
        idRole: this.value
      }
      updateIdRole(data).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.resetForm()
          this.$message.success('保存成功!')
          this.dialogVisible = false
          this.$emit('onRefresh')
        } else {
          this.$message.error(res.data.msg)
        }
      })
      console.log(this.value)
    }
  }
}
</script>
<style scoped>

</style>
