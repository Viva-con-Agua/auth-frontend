import apiSession from './api.js'

const login = {
    namespaced: true,
    state: () => ({
        credentials: {
            email: null,
            password: null,
            scope: null
        },
        redirectData: null,
        logout: null

    }),
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
        },
        redirectData(state, value) {
            state.redirectData = value
        },
        logout(state, value) {
            state.logout = value
        }
    },
    getters: {
        credentials(state) {
            return state.credentials
        }
    },
    actions:{
        async logout ({dispatch, commit, state}) {
            commit('logout', await dispatch("logoutReq"))
            var list = state.logout
            var url = list[0]
            list.splice(0, 1)
            var str = ""
            for (var key in list) {
                if (str != "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(list[key]);
            }  
            window.location= url + "?" + str
        },

        signin({commit, state}) {
            return new Promise((resolve, reject) => {
                apiSession.post('/v1/auth/login', state.credentials)
                    .then(response => {
                        console.log(response.data)
                        commit('redirectData', response.data.payload), 
                            commit('cleanCredentials'),
                            resolve(response.data.payload)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        logoutReq() {
            return new Promise((resolve, reject) => {
                apiSession.get('/v1/auth/logout')
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}
export default login
