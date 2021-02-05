<template>
    <div id=confirm>
        {{ text }}
        <div v-if="error">
            <button @click.prevent="submit">Neue Email?</button>
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
        }
    },
    mounted() {
        this.$store.commit("register/code", this.code)
        this.$store.dispatch({type: 'register/confirm'})
            .then( data => {
                if (data.message === "no_session") {
                    this.$router({name: "Login", query: {scope: data.scope}})
                } else if(data.message === "has_session") {
                    window.location = data.redirect_url + "?code=" + data.code
                }
            })
            .catch( () => { this.error = true})
    }
}

</script>
<style scoped>


#signin {
    width: 100%;
    flex: 1;
}
</style>
