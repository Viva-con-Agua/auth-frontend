<template>
    <div id="sign-view" class="tabs-details">
        <vca-card v-if="!session">
            <vca-tabs>
                <vca-tab :title="$t('sign.register')" selected=true>
                    <SignUp />
                </vca-tab>
                <vca-tab title="$t('sign.login')">
                    <SignIn />
                </vca-tab>
            </vca-tabs>
        </vca-card>
    </div>
</template>
<script>

import SignIn from '@/components/user/SignIn'
import SignUp from '@/components/user/SignUp'
import { mapGetters } from 'vuex'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    name: 'SignView',
    components: {
        SignIn, 
        SignUp
    },
    watch :{
        session: function(val) {
            if (val === true) {
                this.$store.dispatch({type: 'navigation/current', data: 'Countdown'})
                this.$router.push({ name: 'Countdown' })
            }
        },
    },
    computed: {
        ...mapGetters({
            session: 'session'
        })
    },
    created () {
        if (this.session === true) {
            this.$store.dispatch({type: 'navigation/current', data: 'Countdown'})
            this.$router.push({ name: 'Countdown' })
        }
    }
}
</script>
