import { delTag, getTags, updateTag, addTag } from '@/api/tag'

const state = {}

const mutations = {}

const actions = {

  // 获取所有标签
  async getTags () {
    return await getTags()
  },

  // 更新标签
  async updateTag (context, data) {
    return await updateTag(data)
  },

  // 删除标签
  async delTag (context, id) {
    return await delTag(id)
  },

  // 新增标签
  async addTag (context, tagName) {
    return await addTag(tagName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
