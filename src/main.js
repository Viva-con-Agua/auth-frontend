import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VcaUi from 'vca-ui'
import router from './router'
import 'vca-ui/dist/vca-ui.css'
import store from './store'

Vue.use(Vuelidate)
Vue.use(VcaUi)
Vue.config.productionTip = false

new Vue({
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
