import api from '@/store/api.js'
import credentials from './credentials'
const login = {
    namespaced: true,
    modules: {
        credentials: credentials
    },
    state: () => ({
        challenge: {
            challenge: null
        },
        user: null
    }),
    mutations: {
        login_challenge(state, val) {
            state.credentials.data.login_challenge = val
            state.challenge.challenge = val
        },
        consent_challenge(state, val) {
            state.challenge.challenge = val
        },
        user(state, val) {
            state.user = val
        }
    },
    actions: {
        login_challenge({state}) {
            return new Promise((resolve, reject) => {
                api.post('/auth/login_challenge', state.challenge)
                    .then(response => {
                        console.log(response.data)
                        resolve(response.data.Payload)
                    })
                    .catch(error => {
                        
                        console.log(error)
                        reject()
                    })
            })
        },
        consent_challenge({state}) {
            return new Promise((resolve, reject) => {
                api.post('/auth/consent_challenge', state.challenge)
                    .then(response => {
                        console.log(response.data)
                        resolve(response.data.Payload)
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })
            })
        },
        refresh({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/auth/refresh')
                    .then((response) => {
                        commit("user", response.payload)
                        resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
                
                })
        }
    }

}
export default login



