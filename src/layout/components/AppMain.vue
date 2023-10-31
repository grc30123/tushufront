<template>
  <section class="app-main">
    <!--    <transition name="fade-transform" mode="out-in">-->
    <!--      <router-view :key="key" />-->
    <router-view />
    <!--    </transition>-->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // 用于触发数据变动 以便于让transition组件功能生效，实测不需要加这个key()也可以生效。但是个人认为没必要 注释
    // key() {
    //   // 获取当前页面的路径
    //   return this.$route.path
    // }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
