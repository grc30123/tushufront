<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
// 导入判断是否为外部链接 (使用正则表达式 /^(https?:|mailto:|tel:)/ 来匹配路径这个正则表达式意义是:^ 表示开头https?: 匹配 http 或 httpsmailto: 匹配邮件链接tel: 匹配电话链接)
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true // 使用这个组件必须要传递这个 to 参数 因为这里to属性的值会用来渲染链接
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)// 判断这个传递进来的链接是否为外部链接 为外部链接返回true
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
