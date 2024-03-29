import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VcaUi from 'vca-ui'
import router from './router'
import 'vca-ui/dist/vca-ui.css'
import store from './store'
import VueI18n from 'vue-i18n'
import Notifications from 'vue-notification'
import FlagIcon from 'vue-flag-icon'
import ch from '@/lang/de_CH.json';
import de from '@/lang/de_DE.json';
import za from '@/lang/en_ZA.json';
import gb from '@/lang/en_GB.json';

Vue.use(Vuelidate)
Vue.use(VcaUi)
Vue.use(FlagIcon)
Vue.use(VueI18n)
Vue.use(Notifications)

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

Vue.mixin({
  methods: {
    notification: function (msg) {
        console.log(msg)
        if (msg !== undefined) {
            this.$notify({
                title: this.$t(msg.title),
                text: this.$t(msg.body),
                type: msg.type,
                duration: 6000
            });
        }
    }
  },
})

new Vue({
    i18n,
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
