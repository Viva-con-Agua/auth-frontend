<template>
    <div class="text-left">
        <form>
            <vca-input
                ref="email"
                :errorMsg="$t('sign.login.email.error')"
                @input="lower"
                :placeholder="$t('sign.login.email.placeholder')"
                v-model.trim="credentials.email" 
                :rules="$v.credentials.email">
            </vca-input>
            <vca-input 
                ref="password"
                type="password"
                :errorMsg="$t('sign.login.password.error')"
                :placeholder="$t('sign.login.password.placeholder')"
                v-model.trim="credentials.password" 
                :rules="$v.credentials.password">
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
                <i18n path="sign.login.register" class="typo-veneer">
                    <span class="link typo-veneer" @click="register">{{ $t('sign.register.title') }}</span>
                </i18n>
            </h2>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    computed: {
        credentials: {
            get () {
                return this.$store.state.login.credentials
            },
            set (value) {
                this.$store.commit('login/credentials', value)
            }
        }
    },
    validations: {
        credentials: {
            email: {
                required,
                email,
            },
            password: {
                required
            }
        },
    },
    created() {
        this.$store.commit('login/scope', this.$route.query.scope)
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
        lower() {
            this.credentials.email = this.credentials.email.toLowerCase()
        },
        submit() {
            this.$store.dispatch({type: 'login/signin'})
                .then((data)=> {
                    window.location = data.redirect_url + "?code=" + data.code + "&callback=" + this.$store.getters.callback
                })
                .catch ((error) => {
                    this.notification(error)
                })
        },
        register() {
            this.$router.push({name: 'Register', query: { scope: this.$route.query.scope, language: this.$route.query.language }})
        }
    }
}
</script>
