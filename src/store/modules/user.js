import { getInfo, login, logout } from '@/api/user'
// eslint-disable-next-line no-unused-vars
import { getToken, removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    role: '',
    id: ''
  }
}

const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_ID: (state, id) => {
    state.id = id
  }
}

const actions = {
  // 通过dispatch实现的登录操作  action就是用来 处理数据的 也可以说 就是用来写函数的
  login({ commit }, userInfo) { // 第一个参数用于提交结果 第二个参数 提供的基础数据(也就是要用这个基础数据进行操作)
    const { account, password } = userInfo // 这样得到的是一个json格式的数据
    return new Promise((resolve, reject) => {
      login({ account, password }).then(response => {
        const { data } = response.data
        // console.log(data)
        console.log('登录请求')
        commit('SET_TOKEN', data.token)
        setToken(data.token)// 在cookies中存入token
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const name = data.data.account
        const role = data.data.role
        const id = data.data.idUser
        commit('SET_NAME', name)
        commit('SET_ROLE', role)
        commit('SET_ID', id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 所谓注销 就是将token删除 并自动跳转到登录界面
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        console.log('成功清除缓存')
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      console.log('移除token已经执行------------------------------')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

