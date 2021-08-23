import { createStore } from 'vuex'

import { _ls_local_ } from '@utils/config'

import game from './game'
import games from './games'
import value from './value'
import values from './values'
import account from './account'

const initialSysMsg = {
  show: false,
  title: null, 
  value: null,
  timeout: 3000,
  type: 'danger',
}

const initialConfirm = {
  show: false,
  title: "Are you sure you want to delete?",
  content: null,
  labels: {
    success: "Yes",
    reject: "No",
  },
  on: {
    reject: () => null,
    success: () => null,
  }
}

const store = {
  state: {
    loading: false,
    sysMsg: {
      ...initialSysMsg
    },
    confirm: {
      ...initialConfirm
    },
    local: localStorage.getItem(_ls_local_) ?
            JSON.parse(localStorage.getItem(_ls_local_)) : {
              code: "hy",
            },
  },
  mutations: {
    setLoading: (state, payload) => state.loading = payload,
    setLocal: (state, payload) => {
      state.local = {...state.local, ...payload}

      localStorage.setItem(_ls_local_, JSON.stringify(state.local))
    },
    setSysMsg: (state, payload) => state.sysMsg = {...state.sysMsg, ...payload},
    setConfirm: (state, payload) => state.confirm = {...state.confirm, ...payload},
    
    hideSysMsg: state => state.sysMsg = {...state.sysMsg, show: false},
  },
  getters: {
    getSysMsg: state => state.sysMsg,
    getLoading: state => state.loading,
    getConfirm: state => state.confirm,

    getLocal: state => state.local,
    getLocalCode: state => state.local?.code,

    isAuthUser: (state, getters) => getters["account/authenticated"],
  },
  actions: {
    doSwitchLang({ commit }, payload) {
      commit('setLocal', payload)
    },
    doSysMsg({ commit }, payload) {
      payload.show = payload.title || payload.value

      if (!payload.title) payload.title = null
      if (!payload.value) payload.value = null

      commit('setSysMsg', payload)
    },
    doLoading({ commit }, payload = true) {
      commit('setLoading', payload)
      
      document.body.classList[payload ? 'add' : 'remove']('no-scroll')
    },
    doConfirm({ commit }, payload) {
      commit('setConfirm', !payload ? initialConfirm : payload)
    },
  },
  modules: {
    game,
    games,
    value,
    values,
    account,
  }
}

export default createStore(store)