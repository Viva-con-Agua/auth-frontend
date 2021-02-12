<template>
    <div class="text-left">
        <vca-input
            ref="email"
            :errorMsg="$t('sign.new_token.email.error')"
            @input="lower"
            :placeholder="$t('sign.new_token.email.placeholder')"
            v-model.trim="reset.email" 
            :rules="$v.reset.email">
        </vca-input>
        <button
            class="vca-button"
            @click.prevent="validate">
            {{ $t('sign.new_token.title') }}
        </button>

    </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'NewToken',
    computed: {
        reset: {
            get () {
                return this.$store.state.login.resetPassword
            },
            set (value) {
                this.$store.commit('login/resetPassword', value)
            }
 
        }
    },
    validations: {
        reset: {
            email: {
                required,
                email
            }
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid === true) {
                this.$refs.email.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'login/resetConfirmationToken'})
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
        lower() {
            this.reset.email = this.reset.email.toLowerCase()
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
