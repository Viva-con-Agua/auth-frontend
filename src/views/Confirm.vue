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
import axios from 'axios'
import NewToken from '@/components/NewToken'
export default {
    name: 'Confirm',
    props: ['token'],
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
                    
        axios.get(process.env.VUE_APP_BACKEND_URL + '/auth/signup/confirm/' + this.token, this.credentials)
                .then(response => {
                    if (response.status === 200 ){
                        this.$router.push({name: 'default'})
                    }
                })
                .catch(error => {
                    this.text = error
                    this.error = true
                })

    }
}

</script>
<style scoped>


#signin {
    width: 100%;
    flex: 1;
}
</style>
