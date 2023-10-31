import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'

// if (process.env.NODE_ENV === 'production') {
//   console.log(process.env.NODE_ENV)
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    const date = new Date(value)
    return date.toLocaleDateString() // 根据需要选择合适的格式化方式
  }
  return ''
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
