import Vue from 'vue'
import Vuex from 'vuex'
import register from './register.js'
import login from './login.js'
//import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        namespaced: true,
        register: register,
        login: login
    },
    state: {
        callback: null
    },
    getters: {
        callback(state) {
            return state.callback
        }
    },
    mutations: {
        callback(state, value) {
            state.callback = value
        }
    }
})
