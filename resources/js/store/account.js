import { _ls_auth_token_ } from '@/utils/config'

const initialState = {
  id: null,
  name: null,
  email: null,
}

export default {
  namespaced: true,
  state: {
    data: {
      ...initialState
    },
    token: sessionStorage.getItem(_ls_auth_token_) ? sessionStorage.getItem(_ls_auth_token_) : null,
  },
  mutations: {
    setData: (state, payload) => state.data = {...state.data, ...payload},
    setToken: (state, { token, remember }) => {
      if (token) {
        state.token = token

        if (remember)
          localStorage.setItem(_ls_auth_token_, token)

        sessionStorage.setItem(_ls_auth_token_, token)

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },
    setUnToken: state => {
      state.token = null
      state.user = {...initialState}
      
      localStorage.removeItem(_ls_auth_token_)
      sessionStorage.removeItem(_ls_auth_token_)

      delete axios.defaults.headers.common['Authorization']
    }
  },
  getters: {
    getData: state => state.data,
    getToken: state => state.token,
    getDatum: state => key => state.data[key],

    authenticated: state => state.token !== null,

    isCurrentUser: state => id => state.data.id && state.data.id === id,
  },
  actions: {
    async doFetch({ commit, dispatch }, token) {
      commit('setToken', { token })

      try {
        const response = await axios.post('/api/auth')

        if (response.status == 200)
          commit('setData', response.data)

        return true
      } catch (err) {
        dispatch('doLogout')

        return false
      }
    },
    async doLogin({ commit, dispatch }, payload) {
      return new Promise(async resolve => {
        try {
            const response = await axios.post('/api/login', payload)
    
            if (response.status == 200) {
              dispatch('doSysMsg', {
                type: 'success',
                title: response?.data?.message,
              }, { root: true })
    
              setTimeout(() => {
                if (response.data.access_token)
                  commit('setToken', { token: response.data.access_token, remember: payload.rememberMe })
                if (response.data.user)
                  commit('setData', response.data.user)
    
                resolve(response)
              }, 2000)
            }
        } catch (err) {
          dispatch('doSysMsg', {
            type: 'danger',
            value: err.response?.data?.errors,
            title: err.response?.data?.message,
          }, { root: true })
            
          resolve(err.response)
        }
      })
    },
    async doLogout({ commit, dispatch }) {
      try {
        const response = await axios.post('/api/logout')

        if (response.status = 204)
          commit('setUnToken', null)

        return response
      } catch (err) {
        dispatch('doSysMsg', {
          type: 'danger',
          value: err.response?.data?.errors,
          title: err.response?.data?.message,
        }, { root: true })

        return err.response
      }
    },
    async doRegister({ commit, dispatch }, payload) {
      return new Promise(async resolve => {
        try {
          const response = await axios.post('/api/register', payload)
  
          if (response.status == 200) {
            dispatch('doSysMsg', {
              type: 'success',
              title: response?.data?.message,
            }, { root: true })
  
            setTimeout(() => {
              if (response.data.access_token)
                commit('setToken', { token: response.data.access_token })
              if (response.data.user)
                commit('setData', response.data.user)
  
              resolve(response)
            }, 2000)
          }
        } catch (err) {
          dispatch('doSysMsg', {
            type: 'danger',
            value: err.response?.data?.errors,
            title: err.response?.data?.message,
          }, { root: true })
          
          resolve(err.response)
        }
      })
    }
  }
}