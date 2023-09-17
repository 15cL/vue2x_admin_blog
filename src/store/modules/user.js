
import { setToken, getToken, removeToken, setTimeStamp, removeTimeStamp } from '@/until/authToken'
import { login, reAvatar, getUserinfo, updateInfo, updatePwd, getAvatar } from '@/api/user'

const state = {
  token: getToken()
}

const mutations = {
  // 设置token
  setToken (state, token) {
    state.token = token
    setToken(token)
  },

  // 删除token
  removeToken (state) {
    state.token = null
    removeToken()
    removeTimeStamp()
  }
}

const actions = {

  async login (context, data) {
    const res = await login(data)

    // 保存token
    context.commit('setToken', res.data.token)

    // 设置当前时间戳
    setTimeStamp()
    return res.data.token
  },
  // 更换头像
  async reAvatar (context, data) {
    return await reAvatar(data)
  },

  // 获取个人信息
  async getUserinfo () {
    return await getUserinfo()
  },

  // 更新用户信息
  async updateInfo (context, data) {
    return await updateInfo(data)
  },

  // 重置密码
  async updatePwd (context, data) {
    return await updatePwd(data)
  },

  // 获取用户头像
  async getAvatar (context, data) {
    return await getAvatar(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
