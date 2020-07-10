<template>
    <vca-form>
        <vca-field>
            <vca-input
                ref="email"
                errorMsg="Bitte E-Mail Adresse eintragen"
                placeholder="E-Mail Adresse"
                v-model.trim="email" 
                :rules="$v.email">
            </vca-input>
        </vca-field>
        <button
            class="vca-button-primary button"
            @click.prevent="validate">
            options.signin
        </button>

    </vca-form>
</template>
<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'NewToken',
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
            axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/signup/token', {'email': this.email})
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
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
