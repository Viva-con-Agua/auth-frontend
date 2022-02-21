<template>
    <div class="text-left">
        <form>
            <vca-input
                ref="email"
                :errorMsg="$t('sign.login.email.error')"
                :placeholder="$t('sign.login.email.placeholder')"
                v-model.trim="email" 
                :rules="$v.email">
            </vca-input>
            <vca-input 
                ref="password"
                type="password"
                :errorMsg="$t('sign.login.password.error')"
                :placeholder="$t('sign.login.password.placeholder')"
                v-model.trim="password" 
                :rules="$v.password">
            </vca-input>
            <vca-field-row>
                <button 
                    class="vca-button button"
                    @click.prevent="validate">
                    {{ $t('sign.login.title') }}
                </button>
            </vca-field-row>
        </form>
        <div class="vca-center text-center">
            <h2>
                <i18n path="sign.login.register">
                    <span class="link" @click="register">{{ $t('sign.register.title') }}</span>
                </i18n>
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    computed: {
        email: {
            get () {
                return this.$store.state.login.credentials.data.email
            },
            set (value) {
                this.$store.commit('login/credentials/email', value)
            }
        },
        password: {
            get () {
                return this.$store.state.login.credentials.data.password
            },
            set (value) {
                this.$store.commit('login/credentials/password', value)
            }
        }
    },
    validations() {
        return this.$store.getters['login/credentials/validations']
    },
    created() {
        this.$i18n.locale = this.$route.query.language
        if (this.$route.query.msg && this.$route.query.source) {
            this.notification({
                title: this.$t('sign.login.msg.' + this.$route.query.msg + '.' + this.$route.query.source + '.title'),
                body: this.$t('sign.login.msg.' + this.$route.query.msg + '.' + this.$route.query.source + '.body'),
                type: this.$t('sign.login.msg.' + this.$route.query.msg + '.' + this.$route.query.source + '.type')
            })
        }

    },
    methods: {
        validate() {
            if (this.$v.$invalid === true) {
                this.$refs.email.validate()
                this.$refs.password.validate()
            } else {
                this.submit()
            }
        },
        submit(){
            this.$store.dispatch('login/credentials/submit')
                .then((response) => {
                console.log(response)
                window.location = response.redirect_to
            })
                       .catch ((error) => {
                    this.notification(error)
                })
        },
        register() {
            this.$router.push({name: 'Register', query: { login_challenge: this.$route.query.login_challenge, language: this.$route.query.language }})
        }
    }
}
</script>
