import api from '@/store/api.js'
import axios from 'axios'
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
            var api_refresh = axios.create({
                baseURL: process.env.VUE_APP_BACKEND_URL,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return new Promise((resolve, reject) => {
                api_refresh.get('/auth/refresh')
                    .then((response) => {
                        commit("user", response.payload)
                        resolve()
                    })
                    .catch((error) => {
                        if (error.response.status == 401) {
                            reject(null)
                        }
                        reject(error)
                    })

            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                api.get('/auth/logout')
                    .then((response) => {
                        console.log(response)
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



