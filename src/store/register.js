import apiSession from './api.js'
const register = {
    namespaced: true,
    state: () => ({
        user: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            display_name: '',
            country: 'de_DE',
            privacy_policy: false,
            offset: {
                known_from: "UNKOWN",
                newsletter: false
            },
            scope: '',
        },
        code: {
            code: ""
        },
        msg: {
            sign_up: {
                errors: {
                    conflict: {
                        title: "messages.title.warn",
                        body: "messages.sign_up.error.conflict",
                        type: "warn"
                    },
                    password: {
                        title: "messages.title.error",
                        body: "messages.sign_up.error.password",
                        type: "error"
                    },
                    username: {
                        title: "messages.title.error",
                        body: "messages.sign_up.error.username",
                        type: "error"
                    }
                }
            },
            confirm_token: {
                errors: {                    
                    unknown: {
                        title: "messages.title.error",
                        body: "messages.confirm_token.error.unknown",
                        type: "error"
                    },
                    already_confirmed: {
                        title: "messages.title.error",
                        body: "messages.confirm_token.error.already_confirmed",
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
        user(state, value) {
            state.user = value
        },
        scope(state, value) {
            state.user.scope = value
        },
        code(state, value) {
            state.code.code = value
        },
        country(state, value) {
            state.user.country = value
        }
    },
    actions: {
        register({commit, state}) {
            return new Promise((resolve, reject) => {
                apiSession.post('/v1/auth/register', state.user)
                .then(response => {
                    commit('login/redirectData', response.data), 
                    commit('cleanCredentials'),
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 409) {
                        reject(state.msg.sign_up.errors.conflict)
                    } else if (error.response.status === 400) {
                        console.log(error.response.data[0].Key)
                        if (error.response.data[0].Key === "'Register.DisplayName'") {
                            reject(state.msg.sign_up.errors.username)
                        } else {
                            reject(state.msg.sign_up.errors.password)
                        }
                    }
                    reject(state.msg.defaults.errors.unknown)
                })
            })
        },
        confirm({state}) {
            return new Promise((resolve, reject) =>{
                apiSession.post('/v1/auth/register/confirm', state.code)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        reject(state.msg.confirm_token.errors.unknown)
                    } else if (error.response.status === 404) {
                        reject(state.msg.confirm_token.errors.already_confirmed)
                    }
                    reject(state.msg.defaults.errors.unknown)
                })
            } )
        }

    }
}
export default register
