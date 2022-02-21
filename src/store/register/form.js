import { required, email, sameAs } from 'vuelidate/lib/validators'
import apiSession from "../api"
const form = {
    namespaced: true,
    state: () => ({
        data: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            display_name: '',
            country: 'de_DE',
            privacy_policy: false,
            offset: {
                known_from: "UNKOWN",
                newsletter: false,
            },
            login_challenge: ''
        },
        msg: {
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
                },
                unknown: {
                    title: "messages.title.error",
                    body: "messages.defaults.error.unknown",
                    type: "error"
                }
            }
        }
    }),
    mutations:{
        email(state, val) {
            state.data.email = val.toLowerCase()
        },
        password(state, val) {
            state.data.password = val
        },
        display_name(state, val) {
            state.data.display_name = val
        },
        first_name(state, val) {
            state.data.first_name = val
        },
        last_name(state, val) {
            state.data.last_name = val
        },
        country(state, val) {
            state.data.country = val
        },
        privacy_policy(state, val) {
            state.data.privacy_policy = val
        }
    },
    getters:{
        validations() {
            return {
                email: {
                    required,
                    email
                },
                password: {
                    required
                },
                display_name: {
                    required
                },
                first_name: {
                    required
                },
                last_name: {
                    required
                },             
                privacy_policy: {
                    sameAs: sameAs( () => true ) 
                },
                password_check: {
                    required, 
                    sameAs: sameAs(function () { return this.user.password })
                }

            }
        }
    },
    actions: {
        register({state}) {
            return new Promise((resolve, reject) => {
                apiSession.post('/auth/register', state.data)
                    .then(response => {
                        resolve(response.data.payload)
                    })
                    .catch(error => {
                        if (error.response.status === 409) {
                            reject(state.msg.errors.conflict)
                        } else if (error.response.status === 400) {
                            console.log(error.response.data[0].Key)
                            if (error.response.data[0].Key === "'Register.DisplayName'") {
                                reject(state.msg.errors.username)
                            } else {
                                reject(state.msg.errors.password)
                            }
                        }
                        reject(state.msg.errors.unknown)
                    })
            })
        }
    }
}
export default form


