<template>
    <vca-form>
        <vca-input
            ref="email"
            :errorMsg="$t('sign.reset_pw.email.error')"
            :placeholder="$t('sign.reset_pw.email.placeholder')"
            v-model.trim="email" 
            :rules="$v.email">
        </vca-input>
        <button
            class="vca-button"
            @click.prevent="validate">
            {{ $t('sign.login.reset_pw') }}
        </button>

    </vca-form>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'ResetPassword',
    data() {
        return {
            login: false,
            email: ''
        }
    },
    validations: {
        email: {
            required,
            email
        }
    },
    methods: {
        validate() {
            if (this.$v.invalid === true ) {
                this.$refs.email.validate()
            } else {
                this.submit()
            }
        },
        submit() {            
            this.$store.dispatch({type: 'user/resetPasswordToken', data: this.newToken})
                .then((response) => {
                    this.open(response)
                })
                .catch ((error) => {
                    this.open(error)
                })
                .finally(() => {
                    //this.$store.commit('loadingFlow')
                })
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
<style scoped>
.button{
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
}
</style>
