import apiSession from "../api"
const confirmation = {
    namespaced:true,
    state: () => ({
        code: null,
        reset: {
            email: ''
        },
        msg: {
            success: {
                    new_token: {
                        title: "messages.title.success",
                        body: "messages.sign_up.success.new_token",
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
                },
                unknown: {
                    title: "messages.title.error",
                    body: "messages.defaults.error.unknown",
                    type: "error"
                }
            }
        }
    }),
    mutations: {
        code(state, val) {
            state.code = val
        },
        reset(state, val) {
            state.reset.email = val
        }
    },
    actions: {
        reset({state}) {
            return new Promise((resolve, reject) =>{
                apiSession.post('/auth/register/reset', state.reset)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(state.msg.success.new_token)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            reject(state.msg.errors.email)
                        } else if (error.response.status === 409) {
                            reject(state.msg.errors.already_confirmed)
                        }
                        reject(state.msg.errors.unknown)
                    })
            })
        },
        submit({state}) {
            return new Promise((resolve, reject) =>{
                apiSession.get('/auth/register/confirm/' + state.code)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(state.msg.success.new_token)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            reject(state.msg.errors.email)
                        } else if (error.response.status === 409) {
                            reject(state.msg.errors.already_confirmed)
                        }
                        reject(state.msg.errors.unknown)
                    })
            })

        }
    }


}
export default confirmation
