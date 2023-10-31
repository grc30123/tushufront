import request from '@/utils/request'

export function roleList() {
  return request({
    url: '/role/roleList',
    method: 'post'
  })
}

export function getRoleList(data) {
  const { current, size } = data
  const body = data.condition
  return request({
    url: '/role/rolePageList',
    method: 'post',
    params: { current, size },
    data: body
  })
}

export function getRoleById(data) {
  return request({
    url: '/role/roleGet',
    method: 'post',
    params: data
  })
}

export function roleInsert(data) {
  return request({
    url: '/role/roleInsert',
    method: 'post',
    params: data
  })
}

export function roleUpdate(data) {
  // const  { ,oldRoleName } = data
  return request({
    url: '/role/roleUpdate',
    method: 'post',
    params: data
  })
}

export function roleDelete(data) {
  return request({
    url: '/role/roleDelete',
    method: 'post',
    params: data
  })
}

export function roleResourceConnect(data) {
  return request({
    url: '/role/roleResourceConnect',
    method: 'post',
    params: data
  })
}

export function roleResourceDeleteById(data) {
  return request({
    url: '/role/roleResourceDeleteById',
    method: 'delete',
    params: data
  })
}
