import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'anonymous'
  },
  mutations: {
    SET_NAME (state, newName) {
      localStorage.setItem('name', newName)
      state.name = newName
    }
  },
  actions: {

  }
})
