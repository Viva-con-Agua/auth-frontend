<template>
    <div class="text-left">
        <vca-field>
            <form>
                <vca-input
                    ref="password"
                    type="password"
                    :errorMsg="$t('sign.register.password1.error')"
                    :placeholder="$t('sign.reset_pw.password1.placeholder')"
                    v-model.trim="reset.password" 
                    :rules="$v.reset.password">
                </vca-input>
                <vca-input
                    ref="password_check"
                    type="password"
                    :errorMsg="pwError"
                    :placeholder="$t('sign.reset_pw.password2.placeholder')"
                    v-model.trim="password_check" 
                    :rules="$v.password_check">
                </vca-input>
                <button
                    class="vca-button"
                    @click.prevent="validate">
                    {{ $t('sign.reset_pw.title') }}
                </button>
            </form>
        </vca-field>
    </div>
</template>
<script>

import { required, sameAs } from 'vuelidate/lib/validators'
export default {
    name: 'PasswordReset',
    props: {
        token: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            password_check: ''
        }
    },
    created() {
        this.reset.code = this.token
    },
    computed:{
        pwError () {
            if (this.$v.password_check.required && !this.$v.password_check.sameAs) {
                return this.$t('sign.reset_pw.password2.error.same')
            }
            return this.$t('sign.reset_pw.password2.error.enter')
        },

        reset: {
            get () {
                return this.$store.state.login.resetPasswordToken
            },
            set (value) {
                this.$store.commit('login/resetPasswordToken', value)
            }
 
        }
    },

    validations: {
        reset: {
            code: {
                required
            },
            password: {
                required
            }
        },
        password_check: {
            required,
            sameAs: sameAs(function () { return this.reset.password })
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid === true) {
                this.$refs.password.validate()
                this.$refs.password_check.validate()
            } else {
                this.submit()
            }
        },
        submit(){
            //this.$store.commit('loadingFlow')
            this.$store.dispatch({type: "login/resetPassword", data: this.reset})
                .then((response) => {
                    this.notification(response)
                    this.$router.push({name: 'Login', query:{scope: 'move4water'}})
                })
                .catch(error => {
                     this.notification(error)
                })/*
                .finally(() => {
                    this.$store.commit('loadingFlow')
                })*/
        }
    }
}
</script>
