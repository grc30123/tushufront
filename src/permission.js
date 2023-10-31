import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
    NProgress.start()
  }// 加载图标开始运行
  const hastoken = getToken()
  // console.log(hastoken)
  if (hastoken) {
    console.log('permisson', hastoken)
    // 如果有token 也就是已经登录了 如果再次进入login页面 则直接跳转到首页 实现持久性不用输入密码而登录
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      const hasrole = store.getters.role
      // console.log('999999999999999999999999999999', hasrole)
      if (hasrole) {
        // console.log('role------------------------------------:', hasrole)
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(hastoken)
      await store.dispatch('user/resetToken')
      console.log('删除了token', hastoken)
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
