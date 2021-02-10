<template>
    <vca-card>
        <vca-field>
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
        </vca-field>
    </vca-card>
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
            reset: {
                token: this.token,
                password: ''
            
            },
            password_check: ''
        }
    },
    validations: {
        reset: {
            token: {
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
    computed: {
        pwError () {
            if (this.$v.password_check.required && !this.$v.password_check.sameAs) {
                return this.$t('sign.reset_pw.password2.error.same')
            }
            return this.$t('sign.reset_pw.password2.error.enter')
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
            this.$store.dispatch({type: "user/resetPassword", data: this.reset})
                .then(
                    //this.$router.push({name: 'Sign'})
                )
                .catch(error => {
                     this.open(error)
                })/*
                .finally(() => {
                    this.$store.commit('loadingFlow')
                })*/
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
