
import router from '@/router/index'
import store from '@/store/index'

const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  // 是否含有token
  if (store.getters.token) {
    next()
  } else {
    // 是否为白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
