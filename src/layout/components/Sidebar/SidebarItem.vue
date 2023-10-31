<template>
  <div v-if="!item.hidden">
    <!-- hasOneShowingChild(item.children,item)这个代码是为了执行产生!onlyOneChild.children||onlyOneChild.noShowingChildren   -->
    <!--    这部分是用于做只有一个子界面和没有子界面跳转的-->
    <!--  递归方式--跳出语句  -->
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <!--      /*跳转路径*/-->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!--  el-menu-item用于小于2个子路径的      -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <!--      一个导航栏多个子组件-->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!--递归  没有children就直接全部渲染-->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => { // filter是数组原生的方法
        if (item.hidden) { // 将数组中属性hidden为true的全部删除
          return false
        } else {
          this.onlyOneChild = item
          // console.log('this.onlyOneChild itemitemitemitemitem', this.onlyOneChild)
          return true
        }
      })
      // console.log('showingChildren```````````', showingChildren)
      // 有一个子组件，就先渲染子组件中的数据
      // 主菜单至少有一个 子组件 也就是Children
      if (showingChildren.length === 1) {
        // console.log('this.onlyOneChild：只有一个子菜单', this.onlyOneChild)
        // console.log('this.onlyOneChild：只有一个子菜单children', !this.onlyOneChild.children)
        // console.log('this.onlyOneChild：noShowingChildren', this.onlyOneChild.noShowingChildren)
        // console.log('this.onlyOneChild：判断', (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren))
        return true
      }
      // 没有子组件 就渲染父组件中的 页面
      // 这是用于渲染 最后一个子组件，没有下一个子组件时 就渲染当前 组件 也就是父组件
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        // console.log('parent:', parent)
        // console.log('showingChildren.length === 0 长度为0', this.onlyOneChild)
        return true
      }
      // console.log('这是什么情况---------', showingChildren.length)
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
