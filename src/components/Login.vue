<template>
    <div>
        <vca-input
            ref="email"
            :errorMsg="$t('sign.login.email.error')"
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
    },
    methods: {
        validate() {
            if (this.$v.$invalid) {
                this.$refs.email.validate()
                this.$refs.password.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'login/signin'})
                .then((data)=> {
                    window.location = data.redirect_url + "?code=" + data.code + "&callback=" + this.$store.getters.callback
                })
                .catch ((error) => {
                    this.open({ title: this.$t('error.title'), body: error, type: "error" })
                })
        },
        register() {
            this.$router.push({name: 'Register', query: { scope: this.$route.query.scope, language: this.$route.query.language }})
        },
        open(msg) {
            if (msg !== undefined) {
                this.$notify({
                    title: msg.title,
                    text: msg.body,
                    type: msg.type,
                    duration: 6000
                });
            }
        }
    }
}
</script>
