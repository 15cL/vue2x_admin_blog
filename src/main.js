import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/permission'

// 导入公共样式
import '@/assets/css/base.scss'
import '@/assets/icon/iconfont.scss'

// 引入mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
