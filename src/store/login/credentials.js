import { required, email } from 'vuelidate/lib/validators'
import api from "../api"
const credentials = {
    namespaced: true,
    state: () => ({
        data: {
            email: null,
            password: null,
            login_challenge: null
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
                },
                not_confirmed: {
                    title: "messages.title.error",
                    body: "messages.sign_in.error.not_confirmed",
                    type: "error"
                }
            }
        }
    }),
    mutations: {
        email(state, val) {
            state.data.email = val.toLowerCase()
        },
        password(state, val) {
            state.data.password = val
        },
        login_challenge(state, val) {
            state.data.login_challenge = val
        },
        user(rootState, val) {
            rootState.user = val
        }

    },
    getters: {
        validations() {
            return {
                email: {
                    required,
                    email,
                },
                password: {
                    required
                }
            }
        }
    },
    actions: {
        submit({state, commit}) {
            return new Promise((resolve, reject) => {
                api.post('/auth/login', state.data)
                    .then(response => {
                        commit("user", response.payload)
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            reject(state.msg.sign_in.errors.email)
                        } else if (error.response.status === 401 && error.response.data.message == 'invalid_password') {
                            reject(state.msg.sign_in.errors.password)
                        } else if (error.response.status === 401 && error.response.data.message == 'not_confirmed') {
                            reject(state.msg.sign_in.errors.not_confirmed)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })

        }
    }
}
export default credentials
