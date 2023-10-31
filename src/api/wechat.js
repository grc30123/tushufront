import request from '@/utils/request'
export function getNativePay(data) {
  return request({
    url: '/shopping/GetNativePay',
    method: 'POST',
    data
  })
}

export function judgePayState(data) {
  return request({
    url: '/shopping/JudgePayState',
    method: 'POST',
    data
  })
}
