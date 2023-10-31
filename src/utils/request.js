import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // headers: {
  //   'Content-Type': 'application/x-www-user-urlencoded'
  //   // 'Content-Type': 'application/json;charset=UTF-8'
  // },
  // headers: {
  //   'Authorization': getToken()
  // },
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    // console.log('request====================', store.getters.token)
    if (store.getters.token) {
      // console.log('request====================', store.getters.token)
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// service.interceptors.response.use(
//   response => {
//     const res = response.data
//
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })
//
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
