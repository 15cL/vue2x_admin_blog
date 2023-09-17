import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 主页面导航路由
export const uRoutes = [
  {
    path: 'article',
    name: 'article',
    component: () => import('@/views/article/articlePage.vue'),
    meta: {
      title: '文章管理'
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/article/list/listPage.vue'),
        meta: {
          title: '文章列表'
        }
      },
      {
        path: 'cate',
        name: 'cate',
        component: () => import('@/views/article/cate/catePage.vue'),
        meta: {
          title: '文章分类'
        }
      },
      {
        path: 'tag',
        name: 'tag',
        component: () => import('@/views/article/tag/tagPage.vue'),
        meta: {
          title: '标签云'
        }
      }
    ]
  },
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/user/userPage.vue'),
    meta: { title: '个人中心' },
    children: [
      {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('@/views/user/userinfo/userinfoPage.vue'),
        meta: { title: '个人信息' }
      },
      {
        path: 'pwd',
        name: 'pwd',
        component: () => import('@/views/user/repwd/repwdPage.vue'),
        meta: { title: '重置密码' }
      }
    ]
  }
]

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/loginPage.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home/homePage.vue'),
    children: [...uRoutes]
  }
]

// 路由配置
const RouterConfig = {
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routes
}

// 防止重复点击
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

// export const router = new Router(RouterConfig)
const createRouter = () => new Router(RouterConfig)

// 创建路由实例
const router = createRouter()

// 添加动态路由
// addAsyncRouter()

export default router
