import { genSdnum } from '@/api/sdnum'

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
  genSdnum({ commit }, info) {
    const { typeId, userId } = info
    return new Promise((resolve, reject) => {
      genSdnum({ typeId: typeId, userId: userId }).then(response => {
        const { data } = response
        commit('SET_SDNUM', data)
        resolve()
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

