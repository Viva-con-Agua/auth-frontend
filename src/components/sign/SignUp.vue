<template>
    <vca-form>
        <vca-field>
            <vca-input
                ref="email"
                errorMsg="Bitte E-Mail Adresse eintragen"
                placeholder="E-Mail Adresse"
                v-model.trim="credentials.email" 
                :rules="$v.credentials.email">
            </vca-input>
            <vca-input
                ref="password"
                errorMsg="Bitte Passwort eingeben"
                placeholder="Passwort"
                v-model.trim="credentials.password" 
                :rules="$v.credentials.password">
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
    name: 'SignUp',
    data() {
        return {
            credentials: {
                email: '',
                password: ''
            },
        }
    },
    validations: {
        credentials: {
            email: {
                required,
                email
            },
            password: {
                required
            }
        }
    },
    methods: {
        validate() {
            if (this.$v.invalid === true ) {
                this.$refs.email.validate()
                this.$refs.password.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/signup', this.credentials)
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
