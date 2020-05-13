import {
  login,
  logout,
  getInfo,
  getUserList,
  changePwd
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userId: 100000,
  userList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_LIST: (state, userList) => {
    state.userList = userList
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USERID', data.userId)
        localStorage.setItem('user', data.userId)
        localStorage.setItem('userName', data.userName)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changePwd({
    commit
  }, userInfo) {
    const {
      id,
      oldPass,
      pass
    } = userInfo
    return new Promise((resolve, reject) => {
      changePwd({
        id: id.trim(),
        oldPass: oldPass.trim(),
        pass: pass.trim()
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserList({
    commit,
    state
  },) {
    return new Promise((resolve, reject) => {
      getUserList().then(res => {
        const userList = []
        if (res.code === 200) {
          const uuList = res.data.list
          uuList.forEach((uu) => {
            userList.push({
              id: uu.id,
              userName: uu.username
            })
          })
          commit('SET_USER_LIST', userList)
          resolve(userList)
        }
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
        localStorage.removeItem('user')
        localStorage.setItem('userName')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
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
