import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
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
  hidden: true,
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '三单查看',
      icon: 'example'
    },
    hidden: true
  }]
},

{
  path: '/form',
  name: 'Form',
  component: Layout,
  hidden: true,
  children: [{
    path: 'index',
    name: 'New',
    component: () => import('@/views/form/index'),
    meta: {
      title: '三单编辑',
      icon: 'example'
    },
    hidden: true
  }]
},

{
  path: '/table',
  component: Layout,
  redirect: '/example/plTable',
  name: 'table',
  meta: {
    title: '要号统计',
    icon: 'table'
  },
  children: [{
    path: 'plTable',
    name: 'plTable',
    component: () => import('@/views/table/index'),
    meta: {
      title: '偏离单',
      icon: 'icon'
    }
  },
  {
    path: 'ggTable',
    name: 'ggTable',
    component: () => import('@/views/table/index'),
    meta: {
      title: '更改单',
      icon: 'icon'
    }
  },
  {
    path: 'wxFax',
    name: 'wxFax',
    component: () => import('@/views/table/index'),
    meta: {
      title: '外协传真',
      icon: 'icon'
    }
  },
  {
    path: 'jjTable',
    name: 'jjTable',
    component: () => import('@/views/table/index'),
    meta: {
      title: '交接单',
      icon: 'icon'
    }
  },
  {
    path: 'hyRecord',
    name: 'hyRecord',
    component: () => import('@/views/table/index'),
    meta: {
      title: '会议记录',
      icon: 'icon'
    }
  },
  {
    path: 'codeRule',
    name: 'codeRule',
    component: () => import('@/views/codeRule/index'),
    meta: {
      title: '三单定义规则',
      icon: 'edit'
    }
  }

  ]
},
// {
//   path: '/tree',
//   name: 'Tree',
//   component: Layout,
//   children: [{
//     path: 'index',
//     name: 'Form',
//     component: () => import('@/views/tree/index'),
//     meta: {
//       title: '三单查询',
//       icon: 'eye-open'
//     }
//   }]
// },

// {
//   path: '/nested',
//   component: Layout,
//   redirect: '/nested/menu1',
//   name: 'Nested',
//   meta: {
//     title: 'Nested',
//     icon: 'nested'
//   },
//   children: [
//     {
//       path: 'menu1',
//       component: () => import('@/views/nested/menu1/index'), // Parent router-view
//       name: 'Menu1',
//       meta: { title: 'Menu1' },
//       children: [
//         {
//           path: 'menu1-1',
//           component: () => import('@/views/nested/menu1/menu1-1'),
//           name: 'Menu1-1',
//           meta: { title: 'Menu1-1' }
//         },
//         {
//           path: 'menu1-2',
//           component: () => import('@/views/nested/menu1/menu1-2'),
//           name: 'Menu1-2',
//           meta: { title: 'Menu1-2' },
//           children: [
//             {
//               path: 'menu1-2-1',
//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
//               name: 'Menu1-2-1',
//               meta: { title: 'Menu1-2-1' }
//             },
//             {
//               path: 'menu1-2-2',
//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
//               name: 'Menu1-2-2',
//               meta: { title: 'Menu1-2-2' }
//             }
//           ]
//         },
//         {
//           path: 'menu1-3',
//           component: () => import('@/views/nested/menu1/menu1-3'),
//           name: 'Menu1-3',
//           meta: { title: 'Menu1-3' }
//         }
//       ]
//     },
//     {
//       path: 'menu2',
//       component: () => import('@/views/nested/menu2/index'),
//       meta: { title: 'menu2' }
//     }
//   ]
// },

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
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
