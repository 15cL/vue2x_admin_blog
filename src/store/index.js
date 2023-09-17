
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import article from './modules/article'
import tag from './modules/tag'
import cate from './modules/cate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, article, tag, cate
  },
  getters
})
