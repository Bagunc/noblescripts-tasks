const initialData = {
  id: null,
  new: false,
  value: null,
}

export default {
  namespaced: true,
  state: {
    data: {
      ...initialData,
    }
  },
  mutations: {
    setData: (state, payload) => state.data = payload,
    setDatum: (state, payload) => state.data = {...state.data, ...payload},
  },
  getters: {
    getData: state => state.data,
    getId: state => state.data.id,
    getDatum: state => key => state.data[key],
  },
  actions: {
    doLoad({ commit }, payload) {
      commit('setData', payload)
    },
    doReset({ commit }, isNew = false) {
      commit('setData', {...initialData, new: isNew})
    },
    async doSave({ getters, dispatch }) {
      try {
        const method = getters.getId ? 'put' : 'post'
        const url = `/api/value${(getters.getId ? '/' + getters.getId : '')}`

        const response = await axios[method](url, getters.getData)

        if ([200, 201].includes(response.status))
          dispatch('doSysMsg', {
            timeout: 1000,
            type: 'success',
            title: response.data.message,
          }, { root: true })  

        return response
      } catch (err) {
        dispatch('doSysMsg', {
          type: 'danger',
          value: err.response.data.errors,
          title: err.response.data.message,
        }, { root: true })        

        return err.response
      }
    },
  }
}