import api from '@/store/api.js'
const webapp = {
    namespaced: true,
    state: () => ({
        list: []
    }),
    mutations: {
        list(state, val){
            state.list = val
        }
    },
    getters: {
        list(state) {
            return state.list
        }
    },
    actions: {
        list({state, commit}) {
            return new Promise((resolve, reject) => {
                api.get('/auth/webapp', state.challenge)
                    .then(response => {
                        commit("list", response.data.payload)
                        resolve()
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })
            })
        },

    }
    
}
export default webapp
