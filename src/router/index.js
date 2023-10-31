import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import layout from '@/layout/index.vue'

Vue.use(Router)

/**
 公共界面  任何人都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/role',
    component: layout,
    meta: { title: '权限管理', icon: 'tree' },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/role'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/resource'),
        meta: { title: '资源列表', icon: 'tree' }
        // hidden: true
      },
      {
        path: 'getResource',
        name: 'getResource',
        component: () => import('@/views/role/getResource.vue'),
        // meta: { title: '资源列表', icon: 'tree' },
        hidden: true
      },
      {
        path: 'allocateResource',
        name: 'allocateResource',
        component: () => import('@/views/role/allocateResource.vue'),
        // meta: { title: '资源列表', icon: 'tree' },
        hidden: true
      }

    ]
  },
  {
    path: '/book',
    component: layout,
    children: [
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/book'),
        meta: { title: '图书管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/orders',
    name: 'Example',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    // test: { test: '12321412' },
    // ttt: () => import('@/views/orders/index'),
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/orders/index'),
        meta: { title: '订单', icon: 'table' }
      },
      {
        path: 'wechat',
        name: 'Wechat',
        component: () => import('@/views/wechat/index'),
        meta: { title: '购买商品', icon: 'tree' }
      }
    ]
  },

  {
    path: '/nested',
    hidden: true,
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '嵌套',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), // 设置页面滚动到顶部保持不变
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
