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
            scope: '',
        },
        code: {
            code: ""
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
                    reject(error)
                })
            })
        },
        confirm({state}) {
            return new Promise((resolve, reject) =>{
                apiSession.post('/v1/auth/register/confirm', state.code)
                .then(response => {
                    if (response.status === 201) {
                        resolve(response.data)
                    }
                    resolve()
                })
                .catch(error => {
                    console.log(error)
                    reject()
                })
            } )
        }

    }
}
export default register
