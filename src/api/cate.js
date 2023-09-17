
import request from '@/until/request'

// 获取分类
export function getCates () {
  return request({
    url: '/cate/all',
    method: 'get'
  })
}

// 添加分类
export function addCate (cateName) {
  return request({
    url: '/cate/new',
    data: {
      cateName
    },
    method: 'post'
  })
}

// 更新分类
export function updateCate (data) {
  return request({
    url: '/cate/update',
    data,
    method: 'post'
  })
}

// 删除分类
export function delCate (id) {
  return request({
    url: '/cate/del',
    data: {
      id
    },
    method: 'post'
  })
}
