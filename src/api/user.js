
import request from '@/until/request'

// 登录
export function login (data) {
  return request({
    url: '/user/login',
    data,
    method: 'post'
  })
}

// 更换头像
export function reAvatar (data) {
  return request({
    url: '/my/update/avatar',
    data,
    method: 'post'
  })
}

// 获取个人信息
export function getUserinfo () {
  return request({
    url: '/my/userinfo',
    method: 'get'
  })
}

// 修改用户信息
export function updateInfo (data) {
  return request({
    url: 'my/update/userinfo',
    data,
    method: 'post'
  })
}

// 重置密码
export function updatePwd (data) {
  return request({
    url: 'my/update/pwd',
    data,
    method: 'post'
  })
}

// 获取头像
export function getAvatar (params) {
  return request({
    url: 'my/avatar',
    params,
    method: 'get'
  })
}
