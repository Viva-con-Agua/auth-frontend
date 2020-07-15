<template>
    <vca-form>
        <div v-if="step === 'init'">
        <vca-field>
            <vca-input
                ref="email"
                errorMsg="Bitte E-Mail Adresse eintragen"
                placeholder="E-Mail Adresse"
                v-model.trim="userSignUp.email" 
                :rules="$v.userSignUp.email">
            </vca-input>
            <vca-field-row>
                <vca-input 
                ref="first_name"
                first
                errorMsg="Bitte Vornamen eintragen"
                placeholder="Vorname"
                v-model.trim="userSignUp.first_name" 
                :rules="$v.userSignUp.first_name">
                </vca-input>
                <vca-input
                    ref="last_name"
                    last
                    errorMsg="Bitte Nachnamen eintragen"
                    placeholder="Nachname"
                    v-model.trim="userSignUp.last_name" 
                    :rules="$v.userSignUp.last_name">
                </vca-input>
            </vca-field-row>
            <vca-input
                ref="password"
                type="password"
                errorMsg="Bitte Passwort eingeben"
                placeholder="Passwort"
                v-model.trim="userSignUp.password" 
                :rules="$v.userSignUp.password">
            </vca-input>
            <vca-input
                ref="password_check"
                type="password"
                :errorMsg="pwError"
                placeholder="Passwort"
                v-model.trim="password_check" 
                :rules="$v.password_check">
            </vca-input>
        </vca-field>
        <button
            class="vca-button-primary button"
            @click.prevent="validate">
            options.signup
        </button>
        </div>
        <div v-if="step === 'success'">
            Info Email Raus <br>
            Nicht bekommen ? <br>
            <button
                class="vca-button-primary button"
                @click.prevent="newMail">
                options.newMail
            </button>
        </div>
        <div class="error" v-if="errorStat === '409'">
            <span> Email wurde bereits registriert </span>
        </div>
    </vca-form>
</template>

<script>
import axios from 'axios'
import { required, email, sameAs } from 'vuelidate/lib/validators'
export default {
    name: 'SignUp',
    data() {
        return {
            errorStat: '',
            step: 'init',
            userSignUp: {
                email: '',
                first_name: '',
                last_name: '',
                password: ''
            },
            password_check: '',
        }
    },
    computed: {
        pwError () {
            if (this.$v.password_check.required && !this.$v.password_check.sameAs) {
                return 'Passwörter stimmen nicht überein'
            }
            return 'Bitte Passwort eingeben'
        }
    },
    validations: {
        userSignUp: {
            email: {
                required,
                email
            },
            first_name: {
                required
            },
            last_name:  {
                required
            },
            password: {
                required
            }
        },
        password_check: {
            required,
            sameAs: sameAs(function () { return this.userSignUp.password })
        }
    },
    methods: {
        validate() {
            this.errorStat = ''
            if (this.$v.$invalid === true ) {
                this.$refs.email.validate()
                this.$refs.first_name.validate()
                this.$refs.last_name.validate()
                this.$refs.password.validate()
                this.$refs.password_check.validate()
            } else {
                this.submit()
            }
        },
        newMail() {
            this.$router.push({ name: 'newToken', params: { emailP: this.userSignUp.email } })
        },
        submit() {
            axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/signup', this.userSignUp)
                .then(response => {
                    if (response.status === 201) {
                        this.step = "success"
                    }
                })
                .catch(error => {
                    if (error.response.status === 409) {
                        this.errorStat = '409'
                    }
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
