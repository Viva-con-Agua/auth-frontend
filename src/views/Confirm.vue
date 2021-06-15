<template>
    <div >
        {{ text }}
        <div v-if="error">
            <div>{{ $t('sign.login.resend') }}</div>
            <button @click.prevent="submit" class="vca-button">{{ $t('sign.login.new_token') }}</button>
            <button @click.prevent="login" class="vca-button-small">{{ $t('sign.login.title') }}</button>
        </div>
        <vca-card v-if="mail">
            <NewToken/>
        </vca-card>
    </div>

</template>
<script>
import NewToken from '@/components/NewToken'
export default {
    name: 'Confirm',
    props: {
        code: {
            type: String,
            default: ""
        }
    },
    components: { NewToken },
    data () {
        return {
            mail: false,
            error: false,
            text: ""
        }
    },
    methods: {
        submit() {
            this.mail = true
        },
        login() {
            this.$router.push({name: "Login", query: {scope: 'move4water'}})
        }
    },
    mounted() {
        this.$store.commit("register/code", this.code)
        this.$store.dispatch({type: 'register/confirm'})
            .then(data => {
                console.log("DATA")
                console.log(data)
                if (data.payload.message === "no_token") {
                    /* TODO get scope from data.scope */
                    this.$router.push({name: "Login", query: {scope: 'move4water', msg: data.message, source: 'confirm'}})
                } else if(data.payload.message === "has_token") {
                    window.location = data.payload.redirect_url + "?code=" + data.payload.code
                } else {
                    this.error = true
                    this.notification({ title: this.$t('confirm.error.title'), body: this.$t('confirm.error.body'), type: "error" })
                }
            })
            .catch( (error) => { 
                this.error = true
                this.notification(error)
            })
    }
}

</script>
