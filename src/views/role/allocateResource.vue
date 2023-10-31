<template>
  <div class="role-resource-allocation">
    <!-- 角色拥有的资源列表 -->
    <div class="resource-list">
      <h3>当前角色拥有的资源:{{ totaled }}</h3>
      <el-table :data="roleResources" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="资源名" />
        <el-table-column prop="url" label="地址" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="unassignResource(scope.row.roleResourceId)">取消分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 可分配的资源列表 -->
    <div class="resource-list">
      <h3>可分配的资源:{{ waitTotal }}</h3>
      <el-table :data="unmatchedResources" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="资源名" />
        <el-table-column prop="url" label="地址" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="assignResource(scope.row.id)">分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { roleResourceConnect, getRoleById, roleResourceDeleteById } from '@/api/role' // 导入相关的API方法
import { roleResourceList } from '@/api/resource'

export default {
  name: 'AllocateResource',
  data() {
    return {
      roleName: '',
      idRole: '',
      roleResources: [], // 当前角色拥有的资源
      unmatchedResources: [], // 可分配的资源
      totaled: 0,
      waitTotal: 0
    }
  },
  mounted() {
    // 获取当前角色拥有的资源列表
    this.id = this.$route.query.id
    getRoleById({ id: this.id }).then(res => {
      console.log(res)
      this.roleName = res.data.data.roleName
      this.idRole = res.data.data.idRole
      const data = {
        current: 1,
        size: 20,
        roleName: this.roleName
      }
      this.roleResourceList(data)
    })
  },
  methods: {
    roleResourceList(data) {
      roleResourceList(data).then((res) => {
        console.log(res)
        this.roleResources = res.data.data
        this.unmatchedResources = res.data.unmatchedResources
        this.totaled = res.data.total
        this.waitTotal = res.data.unmatchedTotal
      })
    },
    assignResource(resourceId) {
      // 调用后端接口将资源分配给角色
      const role = { roleId: this.idRole, resourseId: resourceId }
      roleResourceConnect(role).then((res) => {
        // 刷新页面或处理其他逻辑
        if (res.data === true) {
          this.$message.success('添加成功!')
          console.log('资源分配成功')
        } else {
          this.$message.error('添加失败!')
        }
        this.roleResourceList({
          current: 1,
          size: 20,
          roleName: this.roleName
        })
      })
    },
    unassignResource(roleResourceId) {
      this.$confirm('此操作将永久取消资源分配, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleResourceDeleteById({ id: roleResourceId }).then((res) => {
          console.log(res)
          // 刷新页面或处理其他逻辑
          if (res.data === true) {
            this.$message.success('资源取消分配成功!')
            console.log('资源取消分配成功')
          } else {
            this.$message.error('资源取消分配失败!')
          }
          this.roleResourceList({
            current: 1,
            size: 20,
            roleName: this.roleName
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.resource-list {
  margin-bottom: 20px;
}
</style>
