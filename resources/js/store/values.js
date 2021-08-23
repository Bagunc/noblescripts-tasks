export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setItems: (state, payload) => state.items = payload,
    setItem: (state, payload) => state.items = [payload, ...state.items],

    updateItem: (state, payload) => {
      const index = state.items.findIndex(i => i.id == payload.id)

      if (index > -1)
        state.items[index] = {...state.items[index], ...payload}
    },

    deleteItem: (state, payload) => {
      const index = state.items.findIndex(i => i.id == payload)

      if (index > -1)
        state.items.splice(index, 1)
    },
    deleteItemByIndex: (state, index) => {
      state.items.splice(index, 1)
    }
  },
  getters: {
    getItems: state => state.items,
    getItem: state => id => {
      if (!state.items.length) return

      const search = state.items.filter(i => i.id == id)

      if (search.length) return search.pop()
    }
  },
  actions: {
    doClean({ state, commit }) {
      state.items.forEach((item, index) => {
        if (!item.id)
          commit('deleteItemByIndex', index)
      })
    },
    async doFetch({ commit, dispatch }) {
      try {
        const response = await axios.get('/api/value')

        if (response.status == 200) {
          commit('setItems', response.data)

          dispatch('doSysMsg', {
            type: 'success',
            title: response.data.message,
          }, { root: true })
        }

        return response
      } catch (err) {
        dispatch('doSysMsg', {
          type: 'danger',
          title: err.response.message,
        }, { root: true })

        return err.response
      }
    },
    async doDelete({ commit, dispatch }, id) {
      try {
        const response = await axios.delete(`/api/value/${id}`)

        if (response.status == 200) {
          commit('deleteItem', response.data.payload?.id)

          dispatch('doSysMsg', {
            timeout: 1000,
            type: 'success',
            title: response.data.message,
          }, { root: true })
        }
        
        return response
      } catch (err) {
        dispatch('doSysMsg', {
          type: 'danger',
          value: err.response.data.errros,
          title: err.response.data.message,
        }, { root: true })

        return err.response
      }
    },
  }
}