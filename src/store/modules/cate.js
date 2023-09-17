import { delCate, getCates, updateCate, addCate } from '@/api/cate'

const state = {}

const mutations = {}

const actions = {

  // 获取所有分类
  async getCates () {
    return await getCates()
  },

  // 更新分类
  async updateCate (context, data) {
    return await updateCate(data)
  },

  // 删除分类
  async delCate (context, id) {
    return await delCate(id)
  },

  // 新增分类
  async addCate (context, CateName) {
    return await addCate(CateName)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
