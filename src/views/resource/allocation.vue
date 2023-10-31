<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="资源名">
        <el-input v-model="form.name" placeholder="请输入资源名" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.url" placeholder="请输入地址" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Allocation'
}
</script>

<style scoped>

</style>
