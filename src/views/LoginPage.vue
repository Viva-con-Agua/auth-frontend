<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>
            <Login v-if="flow == 'login'"/>
            <ResetPassword v-if="flow == 'pw_reset'"/>
            <NewToken v-if="flow == 'resend'"/>

            <vca-field-row>
                <button v-if="flow != 'login'"  @click="flow = 'login'" class="vca-button-small">{{ $t('sign.login.title') }}</button>
                <button v-if="flow != 'pw_reset'" @click="flow = 'pw_reset'" class="vca-button-small">{{ $t('sign.login.reset_pw') }}</button>
                <button v-if="flow != 'resend'"  @click="flow = 'resend'" class="vca-button-small">{{ $t('sign.login.new_token') }}</button>
            </vca-field-row>
        </vca-card>
    </div>
</template>
<script>

import Login from '@/components/Login'
import ResetPassword from '@/components/ResetPassword'
import NewToken from '@/components/NewToken'
export default {
    name: 'LoginView',
    components: { Login, NewToken, ResetPassword },
    props: {
        login_challenge: {
            type: String,
            default: ""
        },
        callback: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            flow: 'login'
        }
    },
    created() {
        this.$store.commit('login/login_challenge', this.login_challenge)
        this.$store.dispatch('login/login_challenge')
            .then((response) =>{
                window.location = response.redirect_to
            })
            .catch((error) => {
                this.notification(error)
            })
    }
}
</script>
