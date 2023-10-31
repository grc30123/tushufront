import request from '@/utils/request'

export function GetList(data) {
  const body = data.condition
  const { current, size } = data
  return request({
    url: '/orders/GetList',
    method: 'post',
    data: body,
    params: { current, size }
  })
}

export function GetById(data) {
  return request({
    url: '/orders/GetById',
    method: 'get',
    params: data
  })
}

// 不加id为添加，加了id为修改这个id的订单
export function SaveOrUpdate(data) {
  return request({
    url: '/orders/SaveOrUpdate',
    method: 'post',
    data
  })
}

export function DeleteById(data) {
  return request({
    url: '/orders/DeleteById',
    method: 'delete',
    params: data
  })
}
