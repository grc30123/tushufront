import request from '@/utils/request'

export function resourceList() {
  return request({
    url: '/resource/list',
    method: 'get'
  })
}

export function List() {
  return request({
    url: '/resource/resourceList',
    method: 'get'
  })
}

export function pageList(data) {
  return request({
    url: '/resource/pageList',
    method: 'get',
    params: data
  })
}

export function getById(data) {
  return request({
    url: '/resource/getById',
    method: 'get',
    params: data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/resource/saveOrUpdate',
    method: 'post',
    data: data
  })
}

export function deleteById(data) {
  return request({
    url: '/resource/deleteById',
    method: 'post',
    params: data
  })
}

export function roleResourceList(data) {
  console.log(data)
  return request({
    url: '/role/roleResourceList',
    method: 'get',
    params: data
  })
}
