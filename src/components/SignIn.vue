<template>
    <div>
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
            type="password"
            placeholder="Passwort"
            v-model.trim="credentials.password" 
            :rules="$v.credentials.password">
        </vca-input>
        <vca-field-row>
            <button 
                    class="vca-button button"
                    @click.prevent="validate">
                Anmelden
            </button>
        </vca-field-row>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'SignIn',
    computed: {
        credentials: {
            get () {
                return this.$store.state.credentials
            },
            set (value) {
                this.$store.commit('credentials', value)
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
            this.$store.dispatch({type: 'signin'})
                .then((data)=> {
                    window.location = data.redirect_url + "?code=" + data.code
                })
                .catch ((errorMsg) => {
                    this.open(errorMsg)
                })
        },
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
