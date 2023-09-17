
import Axios from 'axios'
import store from '@/store/index'
import { getTimeStamp } from './authToken'
import router from '@/router/index'

const request = Axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://39.105.171.221:3000/',
  timeout: 5000
  // withCredentials: true
})

// 添加一个请求拦截器
request.interceptors.request.use(
  config => {
    // 判断是否含有token
    if (store.getters.token) {
      // 判断token是否超时
      if (isTokenTimeout()) {
        router.push('/login')
        store.commit('user/removeToken')
        return Promise.reject(new Error('token超时了'))
      }

      // 请求注入token
      config.headers.Authorization = store.getters.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 添加一个响应
request.interceptors.response.use(
  function (res) {
    return res
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 判断token是否超时的函数
function isTokenTimeout () {
  const timeOut = 3600 // 1h
  const now = Date.now()
  const bef = getTimeStamp()
  return (now - bef) / 1000 > timeOut
}

export default request
