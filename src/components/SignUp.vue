<template>
    <div>
        <vca-input
            ref="email"
            errorMsg="Bitte E-Mail Adresse eintragen"
            placeholder="E-Mail Adresse"
            v-model.trim="user.email" 
            :rules="$v.user.email">
        </vca-input>
        <vca-input
            ref="password"
            type="password"
            errorMsg="Bitte Passwort eingeben"
            placeholder="Passwort"
            v-model.trim="user.password" 
            :rules="$v.user.password">
        </vca-input>
        <vca-input
            ref="password_check"
            type="password"
            :errorMsg="pwError"
            placeholder="Passwort"
            v-model.trim="password_check" 
            :rules="$v.password_check">
        </vca-input>
         <vca-input
            ref="display_name"
            errorMsg="username angeben"
            placeholder="Username"
            v-model.trim="user.display_name" 
            :rules="$v.user.display_name">
        </vca-input>
        
        <vca-checkbox 
            ref="privacy_policy"
            v-model="user.privacy_policy"
            :rules="$v.user.privacy_policy"
            errorMsg="Bitte bestätige die Datenschutzerklärung und die AGB" > 
                    Ich habe die <a href="https://www.vivaconagua.org/datenschutzerklaerung" target="_blank">Datenschutzerklärung</a> und die <a href="https://www.vivaconagua.org/agb" target="_blank">AGB</a> gelesen.
        </vca-checkbox>
        <button
            class="vca-button button"
            @click.prevent="validate">
            Registrieren
        </button>
    </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
export default {
    name: 'SignUp',
    computed: {
        user: {
            get () {
                return this.$store.state.register.user
            },
            set (value) {
                this.$store.commit('register/user', value)
            }
        },
        pwError () {
            if (this.$v.password_check.required && !this.$v.password_check.sameAs) {
                return 'Deine Passwörter stimmen nicht überein'
            }
            return 'Bitte Passwort eingeben'
        }
    },
    data () {
        return {
            password_check: ''
        }
    },
    validations: {
        user: {
                email: {
                    required,
                    email
                },
                password: {
                    required
                },
                display_name: {
                    required
                },
                
                privacy_policy: {
                    sameAs: sameAs( () => true ) 
                }
        },
        password_check: {
            required,
            sameAs: sameAs(function () { return this.user.password })
        }
    },
    methods: {
        validate() {
            if (this.$v.$invalid === true) {
                this.$refs.email.validate()
                this.$refs.password.validate()
                this.$refs.password_check.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$store.commit('loadingFlow')
            this.$store.dispatch({type: 'register/up'})
                .then(() => {
                    this.$store.dispatch({type: 'navigation/current', data: 'Home'})
                    this.$router.push({ name: 'Donation' })
                })
                .catch (error => {
                    this.open(error)
                })
                .finally(() => {
                    this.$store.commit('loadingFlow')
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
