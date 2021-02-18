import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VcaUi from 'vca-ui'
import router from './router'
import 'vca-ui/dist/vca-ui.css'
import store from './store'
import VueI18n from 'vue-i18n'
import Notifications from 'vue-notification'
import CountryFlag from 'vue-country-flag'
import ch from '@/lang/de_CH.json';
import de from '@/lang/de_DE.json';
import za from '@/lang/en_ZA.json';
import gb from '@/lang/en_GB.json';

Vue.use(Vuelidate)
Vue.use(VcaUi)
Vue.use(VueI18n)
Vue.use(Notifications)

Vue.component('country-flag', CountryFlag)

Vue.config.productionTip = false

const i18n = new VueI18n({
    locale: process.env.VUE_APP_COUNTRY,
    fallbackLocale: "de",
    messages: {
        'de-DE': de,
        'de-CH': ch,
        'en-ZA': za,
        'en-GB': gb,
        'de': de,
        'ch': ch,
        'za': za,
        'gb': gb
    }
});

new Vue({
    i18n,
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
