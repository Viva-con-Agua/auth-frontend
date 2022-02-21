<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>
            <RegisterForm/>
            <div class="vca-center text-center">
                <h2>
                    <i18n path="sign.register.login">
                        <span class="link" @click="login">{{ $t('sign.login.title') }}</span>
                    </i18n>
                </h2>
            </div>
        </vca-card>
    </div>
</template>
<script>

import RegisterForm from '@/components/RegisterForm'
export default {
    name: 'RegisterPage',
    props: {
        login_challenge: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.commit('register/login_challenge', this.$route.query.login_challenge)
    },
    components: {
        RegisterForm, 
    },
    methods: {
        login() {
            this.$router.push({name: 'Login', query: { login_challenge: this.$route.query.login_challenge, language: this.$route.query.language }})
        }
    }
}
</script>
