import Cookies from 'js-cookie'

const token = 'token'

export function getToken() {
  return Cookies.get(token)
}

export function setToken(newtoken) {
  return Cookies.set(token, ' Bearer.' + newtoken)
}

export function removeToken() {
  return Cookies.remove(token)
}
