import Vue from 'vue'
import Vuex from 'vuex'
import register from './register'
import login from './login'
import webapp from './webapp'
//import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        namespaced: true,
        register: register,
        login: login,
        webapp: webapp
    },
    state: {
        callback: null,
        user: null
    },
    getters: {
        callback(state) {
            return state.callback
        }
    },
    mutations: {
        callback(state, value) {
            state.callback = value
        },
        clear(state) {
            state.user = null
        }

    }
})
