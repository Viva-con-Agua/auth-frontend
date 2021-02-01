import api from './api.js'

const sign = {
    state: () => ({
        credentials: {
            email: null,
            password: null,
            service: null
        }
    }),
    mutations: {
        credentials (state, value) {
            state.credentials = value
        }
    }



}
export default sign
