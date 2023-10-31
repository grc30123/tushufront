<template>
  <div class="dashboard-container">
    <div class="dashboard-text"> {{ name }}</div>
    <div class="dashboard-text"> 首页</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      dialogVisible: true,
      form: {
        imageUrl: ''
      }
    }
  },
  created() {
    if (this.name) {
      if (this.name.indexOf('admin') !== -1) {
        this.$router.push('/')
      } else {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

    submitForm() {
      // 处理表单提交逻辑
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
