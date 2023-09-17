
import request from '@/until/request'

// 获取所有标签
export function getTags () {
  return request({
    url: '/tag/all',
    method: 'get'
  })
}

// 更新标签
export function updateTag (data) {
  return request({
    url: '/tag/update',
    data,
    method: 'post'
  })
}

// 删除标签
export function delTag (id) {
  return request({
    url: '/tag/del',
    data: {
      id
    },
    method: 'post'
  })
}

// 新增标签
export function addTag (tagName) {
  return request({
    url: '/tag/new',
    data: { tagName },
    method: 'post'
  })
}
