import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import VcaUi from 'vca-ui'
import 'vca-ui/dist/vca-ui.css'

Vue.use(Vuelidate)
Vue.use(VcaUi)
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
