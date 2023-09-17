import { addArticle, delArticle, getArticleList, updateArticle, getAvatar } from '@/api/article'

const state = {}

const mutations = {}

const actions = {

  // 获取所有文章
  async getArticleList (context, start = 0) {
    return await getArticleList(start)
  },

  // 删除文章
  async delArticle (context, id) {
    return await delArticle(id)
  },

  // 更新文章
  async updateArticle (context, data) {
    return await updateArticle(data)
  },

  // 新增文章
  async addArticle (constext, data) {
    return await addArticle(data)
  },

  // 获取文章大图
  async getAvatar (context, data) {
    const res = await getAvatar(data)
    return res.data.baseUrl
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
