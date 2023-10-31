import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/Register',
    method: 'post',
    data
  })
}

export function SmsRegister(data) {
  return request({
    url: '/Sms/SmsRegister',
    method: 'post',
    params: data
  })
}

export function SmsReset(data) {
  return request({
    url: '/Sms/SmsReset',
    method: 'post',
    data
  })
}

