export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setItems: (state, payload) => state.items = payload,
    setItem: (state, payload) => state.items = [payload, ...state.items],

    deleteItem: (state, payload) => {
      const index = state.items.findIndex(i => i.id === payload)

      if (index > -1) state.items.splice(index, 1)
    },
  },
  getters: {
    getItems: state => state.items,
  },
  actions: {
    async doFetch({ commit, dispatch }) {
      try {
        const response = await axios.get('/api/game')

        if (response.status == 200)
          commit('setItems', response.data)
        
        return response
      } catch (err) {
        dispatch('doSysMsg', {
          type: 'danger',
          title: err.response.data?.message,
          value: err.response.data?.errors,
        }, { root: true })
        
        return err.response
      }
    },
    async doDelete({ commit, dispatch }, payload) {
      try {
        const response = await axios.delete(`/api/game/${payload}`)

        if (response.status === 200) {
          dispatch('doSysMsg', {
            type: 'success',
            title: response.data?.message,
          }, { root: true })

          commit('deleteItem', response.data?.payload?.id)
        }

        return response
      } catch (err) {
        dispatch('doSysMsg', {
          type: 'danger',
          title: err.response.data?.message,
          value: err.response.data?.errors,
        }, { root: true })

        return err.response
      }
    },
  }
}