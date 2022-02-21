
const reset_password = {
    namespaced: true,
    state: () => ({
        init: {
            email: null
        },
        reset: {
            code: null,
            password: null
        }
    }),
    mutations: {
        email(state, val) {
            state.init.email = val 
        },
        code(state, val) {
            state.reset.code = val
        },
        password(state, val) {
            state.reset.password = val
        }
    },
    actions:{
    
    }
}
