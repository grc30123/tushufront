import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/book/getlist',
    method: 'post',
    data: data
  })
}
export function getbyid(data) {
  return request({
    url: '/book/getbyid',
    method: 'get',
    params: data
  })
}
export function savebook(data) {
  return request({
    url: '/book/savebook',
    method: 'post',
    data
  })
}
export function deletebook(data) {
  return request({
    url: '/book/deletebook',
    method: 'delete',
    params: data
  })
}
