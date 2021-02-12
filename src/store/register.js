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
                signin: {
                    title: "Moin! ",
                    body: "Du bist nun erfolgreich reingeloggt. Wir haben dir eine E-Mail mit einem Link zur Bestätugng deiner E-Mail Adresse zugeschickt.",
                    type: "success"
                },
                errors: {
                    confict: {
                        title: "Ahh ",
                        body: "Du hast wohl schon einen Account, log dich einfach ein!",
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
            defaults: {
                errors: {
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
        user(state, value) {
            state.user = value
        },
        scope(state, value) {
            state.user.scope = value
        },
        code(state, value) {
            state.code.code = value
        }
    },
    actions: {
        register({commit, state}) {
            return new Promise((resolve, reject) => {
                apiSession.post('/v1/auth/register', state.user)
                .then(response => {
                    commit('redirectData', response.data), 
                    commit('cleanCredentials'),
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 409) {
                        reject(state.msg.sign_up.errors.confict)
                    }
                    reject(state.msg.defaults.errors.unknown)
                })
            })
        },
        confirm({state}) {
            return new Promise((resolve, reject) =>{
                apiSession.post('/v1/auth/register/confirm', state.code)
                .then(response => {
                    if (response.status === 201) {
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
            } )
        }

    }
}
export default register
