
const confirmation = {
    namespaced:true,
    state: () => ({
        code: null
    }),
    mutations: {
        code(state, val) {
            state.code = val
        }
    }

}
export default confirmation
