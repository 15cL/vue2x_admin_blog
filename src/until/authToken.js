
// 设置token
export function setToken (token) {
  return window.localStorage.setItem('token', token)
}

// 获取token
export function getToken () {
  return window.localStorage.getItem('token')
}

// 移除token
export function removeToken () {
  return window.localStorage.removeItem('token')
}

// 设置时间戳
export function setTimeStamp () {
  return window.localStorage.setItem('timeStamp', Date.now())
}

// 获取时间戳
export function getTimeStamp () {
  return window.localStorage.getItem('timeStamp')
}

// 移除时间戳
export function removeTimeStamp () {
  return window.localStorage.removeItem('timeStamp')
}
