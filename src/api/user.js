import request from '@/utils/request'

export function login(data) {
  const format = new FormData()
  for (const key in data) {
    format.append(key, data[key])
  }
  return request({
    url: '/user/login',
    method: 'post',
    data: format,
    headers: {
      'Content-Type': 'multipart/user-data'
    }
  })
}

export function getInfo() {
  // const format = new FormData()
  // for (const key in data) {
  //   format.append(key, data[key])
  // }
  return request({
    url: '/user/getinfo',
    method: 'get'
    // headers: {
    //   'Content-Type': 'multipart/user-data'
    // }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function GetList(data) {
  const body = data.condition
  const { current, size } = data
  return request({
    // url: '/user/GetList',
    url: '/user/getUserAndRole',
    method: 'post',
    data: body,
    params: { current, size }
  })
}

export function GetById(data) {
  return request({
    url: '/user/GetById',
    method: 'get',
    params: data
  })
}

export function SaveOrUpdate(data) {
  return request({
    url: '/user/SaveOrUpdate',
    method: 'post',
    data: data
  })
}

export function DeleteById(data) {
  return request({
    url: '/user/DeleteById',
    method: 'post',
    params: data
  })
}

export function getRoleByUserId() {
  return request({
    url: '/user/getRoleByUserId',
    method: 'get'
  })
}

export function updateIdRole(data) {
  return request({
    url: '/user-role/updateIdRole',
    method: 'post',
    params: data
  })
}

