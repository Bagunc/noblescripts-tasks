const initialState = {
  size: 3,
  id: null,
  logs: [],
  winner: null,
  p1_name: null,
  p2_name: null,
  winLine: [],
}

export default {
  namespaced: true,
  state: {
    data: {
      ...initialState
    },
  },
  mutations: {
    setData: (state, payload) => state.data = payload,
    setRepeatd: (state, payload) => state.repeat = payload,
    setDatum: (state, payload) => state.data = {...state.data, ...payload},

  },
  getters: {
    getData: state => state.data,
    getId: state => state.data.id,
    getDatum: state => key => state.data[key],

    getPlayerName: state => key => state.data[`p${key}_name`],
    getSymbol: state => key => !key ? 'circle' : 'cancel',

    isCancel: state => (row, col) => {
      return state.data?.logs?.filter(log => log.player == 0 && log.coords.split('|')[0] == row && log.coords.split('|')[1] == col).length
    },
    isCircle: state => (row, col) => {
      return state.data?.logs?.filter(log => log.player == 1 && log.coords.split('|')[0] == row && log.coords.split('|')[1] == col).length
    },
  },
  actions: {
    doReset({ commit }) {
      commit('setData', initialState);
    },
    async doPlay({ commit, getters, dispatch  }, [row, col]) {
      try {
        const response = await axios.put(`/api/game/${getters.getId}`, {
          play: {
            row,
            col,
          }
        })

        if (response.status == 200)
          commit('setData', response.data?.payload)

        return response
      } catch (err) {
        console.error(err)
        dispatch('doSysMsg', {
          type: 'danger',
          value: err.response?.data?.errors,
          title: err.response?.data?.message,
        }, { root: true })

        return err.response
      }
    },
    async doFetch({ commit, dispatch }, payload) {
      try {
        const response = await axios.get(`/api/game/${payload}`)
        
        if (response.status === 200)
          commit('setData', response.data)

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
    async doSave({ getters, dispatch }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { size, p1_name, p2_name } = getters.getData

          const formData = {
            size,
            p1_name,
            p2_name,
          }

          const response = await axios.post('/api/game', formData)

          if (response.status === 201)
            dispatch('doSysMsg', {
              type: 'success',
              title: response?.data?.message,
            }, { root: true })
          
          resolve(response)
        } catch (err) {
          dispatch('doSysMsg', {
            type: 'danger',
            value: err.response?.data?.errors,
            title: err.response?.data?.message,
          }, { root: true })
          
          reject(err.response)
        }
      })
    },
  },
}