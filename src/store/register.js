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
        }
    }),
    mutations: {
        user(state, value) {
            state.user = value
        },
        scope(state, value) {
            state.user.scope = value
        }
    },
    actions: {
        up({commit, state}) {
            return new Promise((resolve, reject) => {
                apiSession.post('/register', state.user)
                .then(response => {
                    commit('redirectData', response.data), 
                    commit('cleanCredentials'),
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default register
