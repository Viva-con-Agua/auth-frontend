import Vue from 'vue'
import Vuex from 'vuex'
import apiSession from './api.js'
import register from './register.js'
//import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
export default new Vuex.Store({
    namespace: true,
    modules: {
        'register': register
    },
    state: {
        credentials: {
            email: null,
            password: null,
            scope: null
        },
        redirectData: null

    },
    mutations: {
        credentials(state, value) {
            state.credentials = value
        },
        cleanCredentials(state) {
            state.credentials.email = null
            state.credentials.password = null
            state.credentials.service = null
        },
        scope(state, value) {
            state.credentials.scope = value
            state.register.user.scope = value
        },
        redirectData(state, value) {
            state.redirectData = value
        }
        

    },
    getters: {
        credentials(state) {
            return state.credentials
        }
    },
    actions:{
        signin({commit, state}) {
            return new Promise((resolve, reject) => {
                apiSession.post('/login', state.credentials)
                .then(response => {
                    commit('redirectData', response.data), 
                    commit('cleanCredentials'),
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
            })
        }
    }
})
