import {
  genSdnum
} from '@/api/sdnum'

const state = {
  sdnum: ''
}

const mutations = {
  SET_SDNUM: (state, data) => {
    state.sdnum = data
  }
}

const actions = {
  // user login
  genSdnum({
    commit
  }, info) {
    return new Promise((resolve, reject) => {
      genSdnum(info).then(response => {
        const {
          data
        } = response
        commit('SET_SDNUM', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
