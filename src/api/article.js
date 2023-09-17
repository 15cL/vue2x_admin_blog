import request from '@/until/request'

// 获取所有文章
export function getArticleList (start) {
  return request({
    url: '/article/all',
    method: 'get',
    params: {
      start
    }
  })
}

// 删除文章
export function delArticle (id) {
  return request({
    url: '/article/del',
    data: { id },
    method: 'post'
  })
}

// 更新文章
export function updateArticle (data) {
  return request({
    url: '/article/update',
    data,
    method: 'post'
  })
}

// 新增文章
export function addArticle (data) {
  return request({
    url: '/article/new',
    data,
    method: 'post'
  })
}

export function getAvatar (params) {
  return request({
    url: '/article/getAvatar',
    params,
    method: 'get'
  })
}
