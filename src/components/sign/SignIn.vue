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
                ref="email"
                errorMsg="Bitte Passwort eingeben"
                placeholder="Passwort"
                v-model.trim="credentials.password" 
                :rules="$v.credentials.password">
            </vca-input>
        </vca-field>
        <button v-if="login"
            class="vca-button-primary button"
            @click.prevent="signout">
            options.signout
        </button>
        <button v-if="!login"
            class="vca-button-primary button"
            @click.prevent="validate">
            options.signin
        </button>
        <div v-if="eState === 'credential_error'">
            <span> Credential Error </span>
        </div>
        <div v-if="eState === 'confirm_error'"> 
            <span> Email nicht confirmed</span>
            <button  @click.prevent="newMail"> neue Email </button> 
        </div>
    </vca-form>
</template>

<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'SignIn',
    data() {
        return {
            login: false,
            eState: '',
            credentials: {
                email: '',
                password: ''
            },
            
            
                headers: {
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/json'
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
    mounted () {
        axios.create({ withCredentials: true, })
        axios.defaults.withCredentials = true
        axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/current', { headers: this.headers  } )
                .then(response => {
                    this.login = true
                    console.log(response)
                })
                .catch (error => {
                    console.log(error)
                })

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
            axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/signin', this.credentials,  {headers: this.headers })
                .then(response => {
                    this.login = true
                    console.log(response)
                })
                .catch(error => {
                    if(error.response.status === 401) {
                        this.eState = 'credential_error'
                    }
                    if(error.response.status === 403) {
                        this.eState = "confirm_error"
                    }

                })
        },
        newMail() {
            axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/signup/token', {'email': this.credentials.email}, {withCredentials: true})
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        signout() {
            axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/signout', { headers: this.headers  } )
                .then(response => {
                    this.login = true
                    console.log(response)
                })
                .catch (error => {
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
