import confirmation from './confirmation.js'
import form from './form.js'
const register = {
    namespaced: true,
    modules: {
        form: form,
        confirmation: confirmation
    },
    mutations: {
        login_challenge(state, val) {
            state.form.data.login_challenge = val    
        }
    }
}
export default register

