<template>
    <div id=confirm>
        {{ text }}
        <div v-if="error">
            <button @click.prevent="submit" class="vca-button">{{ $t('sign.login.new_token') }}</button>
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
    },
    mounted() {
        this.$store.commit("register/code", this.code)
        this.$store.dispatch({type: 'register/confirm'})
            .then(data => {
                if (data.payload.message === "no_token") {
                    this.$router({name: "Login", query: {scope: data.scope}})
                } else if(data.message === "has_session") {
                    window.location = data.payload.redirect_url + "?code=" + data.payload.code
                } else {
                    this.open(data)
                }
            })
            .catch( (error) => { 
                this.error = true
                this.open(error)
            })
    }
}

</script>
