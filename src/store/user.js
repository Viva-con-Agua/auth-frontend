import api from './api.js'
const user = {
    namespaced: true,
    state: () => ({
        current: null,
        profile: null,
        avatar: null,
        msg: {
            reset_password: {
                success: {
                    updated: {
                        title: "Super! ",
                        body: "Dein Passwort wurde erfolgreich neu gesetzt.",
                        type: "success"
                    }
                },
                errors: {
                    email: {
                        title: "Uuuups",
                        body: "Deine E-Mail Adresse konnte nicht gefunden werden.",
                        type: "error"
                    },
                    not_found: {
                        title: "Uuuups",
                        body: "Das Token konnte nicht gefunden werden.",
                        type: "error"
                    }
                }
            },
            confirm_token: {
                success: {
                    confirmed: {
                        title: "Super! ",
                        body: "Deine E-Mail Adresse wurde erfolgreich bestätigt! Du kannst dich nun mit deiner E-Mail Adresse und deinem Passwort einloggen.",
                        type: "success"
                    }
                },
                errors: {                    
                    unknown: {
                        title: "Uuuups",
                        body: "Dein Konto konnte nicht bestätigt werden! Bitte versuche dich anzumelden, dort kannst du dir die E-Mail Bestätigung erneut zusenden.",
                        type: "error"
                    }
                }
            },
            sign_up: {
                success: {
                    new_token: {
                        title: "Super! ",
                        body: "Wir haben dir eine neue E-Mail zugeschickt!",
                        type: "success"
                    },
                    signin: {
                        title: "Moin! ",
                        body: "Du bist nun erfolgreich reingeloggt. Wir haben dir eine E-Mail mit einem Link zur Bestätugng deiner E-Mail Adresse zugeschickt.",
                        type: "success"
                    }
                },
                errors: {
                    confict: {
                        title: "Ahh ",
                        body: "Du hast wohl schon einen Account, log dich einfach ein!",
                        type: "error"
                    }
                }
            },
            sign_in: {
                success: {
                    new_pw: {
                        title: "Soo! ",
                        body: "Wir haben dir eine Link via Email gesendet, mit dem du dein Passwort neu setzen kannst.",
                        type: "success"
                    },
                    signin: {
                        title: "Moin! ",
                        body: "Du bist nun erfolgreich reingeloggt.",
                        type: "success"
                    }
                },
                errors: {
                    email: {
                        title: "Uuuups",
                        body: "Deine E-Mail Adresse und dein Passwort passen nicht zusammen",
                        type: "error"
                    },
                    password: {
                        title: "Uuuups",
                        body: "Deine E-Mail Adresse und dein Passwort passen nicht zusammen",
                        type: "error"
                    },
                    confirmed: {
                        title: "Hmmm",
                        body: "Deine E-Mail Adresse wurde noch nicht bestätigt. Bitte bestätige deine E-Mail Adresse bevor du dich erneut einloggst. Solltest du Probleme bei der Bestätigung haben schreibe bitte eine E-Mail an support@move4water.org",
                        type: "warn"
                    }
                }
            },
            sign_out: {
                success: {
                    signout: {
                        title: "Tschüss! ",
                        body: "Du bist nun erfolgreich rausgeloggt.",
                        type: "success"

                    }
                }
            },
            defaults: {
                errors: {
                    unauth: {
                        title: "Hmmm",
                        body: "Du bist gerade nicht richtig eingeloggt",
                        type: "warn"
                    },
                    unknown: {
                        title: "Uuuups",
                        body: "Es ist ein unbekannter Fehler aufgetreten. Schreib bitte eine E-Mail an support@move4water.org",
                        type: "error"
                    }
                }
            }
        }
    }),
    mutations: { 
        signin(state, value) {
            state.current = value
            state.profile = value.additional.profile
            state.avatar = value.additional.profile.avatar
        },
        signout(state) {
            state.current = null
            state.profile = null
            state.avatar = null
        },
    },
    actions: { 
        signin({commit, state}, data) {
            return new Promise((resolve, reject) => {
                api.post('/auth/signin', data.data)
                    .then(response => { commit('signin', response.data), commit('currentMsg', state.msg.sign_in.success.signin, {root: true}), resolve()})
                    .catch(error => {
                        if (error.response.status === 401) {
                            if (error.response.data.message === 'password_false') {
                                reject(state.msg.sign_in.errors.password)
                            } else if (error.response.data.message === 'email_false') {
                                reject(state.msg.sign_in.errors.email)
                            } else if (error.response.data.message === 'confirmed_false') {
                                reject(state.msg.sign_in.errors.confirmed)
                            } else {
                                reject(state.msg.defaults.errors.unknown)
                            }
                        } else {
                            reject(state.msg.defaults.errors.unknown)
                        }
                    })
            })
        },
        signup({commit, state}, data) {
            return new Promise((resolve, reject) => {
                api.post('/auth/signup', data.data)
                    .then(response => { commit('signin', response.data), commit('currentMsg', state.msg.sign_up.success.signup, {root: true}), resolve()})
                    .catch(error => {
                        if (error.response.status === 409) {
                            reject(state.msg.sign_up.errors.confict)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })
        },
        current({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/auth/current')
                    .then(response => { commit('signin', response.data), resolve(response)})
                    .catch(error => {reject(error)})
            })
        },
        signout({commit, state}) {
            return new Promise((resolve, reject) =>{
                api.get('/auth/signout')
                    .then(response =>  {commit("signout"), commit('currentMsg', state.msg.sign_out.success.signout, {root: true}), resolve(response)})
                    .catch(error => {
                        console.log(error)
                        if (error.response.status === 401) {
                            commit("signout")
                        }
                        reject(error)
                    })
            })
        },
        resetConfirmationToken({state}, data) {
            return new Promise((resolve, reject) =>{
                api.post('/auth/signup/token', data.data)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(state.msg.sign_up.success.new_token)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            reject(state.msg.defaults.errors.unknown)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })
        },
        resetPasswordToken({state}, data) {
            return new Promise((resolve, reject) => {
                api.post('/auth/password', data.data)
                    .then(response => {
                        if (response.status === 201) {
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

        },
        resetPassword({state}, data) {
            return new Promise((resolve, reject) =>{
                api.put('/auth/password', data.data)
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
        confirmToken({state}, data) {
            return new Promise((resolve, reject) =>{
                console.log(data)
                api.get('/auth/signup/confirm/' + data.data)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(state.msg.confirm_token.success.confirmed)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.response.status === 400) {
                            reject(state.msg.confirm_token.errors.unknown)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })

        }
    },
    getters: { 
        current (state) {
            return state.current
        },
        profile (state) {
            return state.profile
        },
        avatar (state) {
            return state.avatar
        }

    }
}
export default user
