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
                    },
                    already_confirmed: {
                        title: "Uuuups",
                        body: "Das Konto ist bereits bestätigt oder existiert nicht.",
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
