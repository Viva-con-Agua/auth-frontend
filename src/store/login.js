import apiSession from './api.js'

const login = {
    namespaced: true,
    state: () => ({
        credentials: {
            email: null,
            password: null,
            scope: null
        },
        resetPassword: {
            email: null,
            scope: null
        },
        resetPasswordToken: {
            code: null,
            password: null,
            scope: null
        },
        redirectData: null,
        logout: null,
        msg: {
            reset_password: {
                success: {
                    updated: {
                        title: "messages.title.success",
                        body: "messages.reset_password.success.updated",
                        type: "success"
                    }
                },
                errors: {
                    email: {
                        title: "messages.title.error",
                        body: "messages.reset_password.error.email",
                        type: "error"
                    },
                    not_found: {
                        title: "messages.title.error",
                        body: "messages.reset_password.error.not_found",
                        type: "error"
                    },
                    already_confirmed: {
                        title: "messages.title.error",
                        body: "messages.reset_password.error.already_confirmed",
                        type: "error"
                    }
                }
            },
            sign_up: {
                success: {
                    new_token: {
                        title: "messages.title.success",
                        body: "messages.sign_up.success.new_token",
                        type: "success"
                    }
                }
            },
            sign_in: {
                success: {
                    new_pw: {
                        title: "messages.title.success",
                        body: "messages.sign_in.success.new_pw",
                        type: "success"
                    }
                },
                errors: {
                    email: {
                        title: "messages.title.error",
                        body: "messages.sign_in.error.email",
                        type: "error"
                    },
                    password: {
                        title: "messages.title.error",
                        body: "messages.sign_in.error.password",
                        type: "error"
                    }
                }
            },
            defaults: {
                errors: {
                    unknown: {
                        title: "messages.title.error",
                        body: "messages.defaults.error.unknown",
                        type: "error"
                    }
                }
            }
        }

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
            state.resetPassword.scope = value
            state.resetPasswordToken.scope = value
        },
        redirectData(state, value) {
            state.redirectData = value
        },
        logout(state, value) {
            state.logout = value
        },
        resetPassword(state, value) {
            state.resetPassword = value
        },
        resetPasswordToken(state, value) {
            state.resetPasswordToken = value
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
                        if (error.response.status === 404) {
                            reject(state.msg.sign_in.errors.email)
                        } else if (error.response.status === 401) {
                            reject(state.msg.sign_in.errors.password)
                        }
                        reject(state.msg.defaults.errors.unknown)
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
        },
        resetConfirmationToken({state}) {
            return new Promise((resolve, reject) =>{
                apiSession.post('/v1/auth/register/reset', state.resetPassword)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(state.msg.sign_up.success.new_token)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            reject(state.msg.reset_password.errors.email)
                        } else if (error.response.status === 409) {
                            reject(state.msg.reset_password.errors.already_confirmed)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })
        },
        resetPassword({state}) {
            return new Promise((resolve, reject) =>{
                apiSession.put('/v1/auth/login/reset', state.resetPasswordToken)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(state.msg.reset_password.success.updated)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 400) {
                            reject(state.msg.defaults.errors.unknown)
                        } else if (error.response.status === 404) {
                            reject(state.msg.reset_password.errors.not_found)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })

        },
        resetPasswordToken({state}) {
            return new Promise((resolve, reject) => {
                apiSession.post('/v1/auth/login/reset', state.resetPassword)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(state.msg.sign_in.success.new_pw)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 400) {
                            reject(state.msg.defaults.errors.unknown)
                        } else if (error.response.status === 404) {
                            reject(state.msg.reset_password.errors.email)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })
            }

    }
}
export default login
