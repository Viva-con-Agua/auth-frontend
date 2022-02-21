<template>
    <div class="text-left">
        <form>
            <vca-input
                ref="email"
                :errorMsg="$t('sign.new_token.email.error')"
                @input="lower"
                :placeholder="$t('sign.new_token.email.placeholder')"
                v-model.trim="email" 
                :rules="$v.email">
            </vca-input>
            <button
                class="vca-button"
                @click.prevent="validate">
                {{ $t('sign.new_token.title') }}
            </button>
        </form>
    </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'NewToken',
    computed: {
        email: {
            get () {
                return this.$store.state.register.confirmation.reset.email
            },
            set (value) {
                this.$store.commit('register/confirmation/reset', value)
            }
 
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
            if (this.$v.$invalid === true) {
                this.$refs.email.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.dispatch({type: 'register/confirmation/reset'})
                .then((response) => {
                    this.notification(response)
                })
                .catch ((error) => {
                    this.notification(error)
                })
                .finally(() => {
                    //this.$store.commit('loadingFlow')
                })
        },
        lower() {
            this.email = this.email.toLowerCase()
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
