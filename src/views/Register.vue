<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>

                    <SignUp />
        </vca-card>
    </div>
</template>
<script>

import SignUp from '@/components/SignUp'
export default {
    name: 'Register',
    props: {
        scope: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.commit('register/scope', this.scope)
    },
    components: {
        SignUp, 
    }
    /*
    watch :{
        session: function(val) {
            if (val === true) {
                this.$store.dispatch({type: 'navigation/current', data: 'Home'})
                this.$router.push({ name: 'Home' })
            }
        },
    },*/
    /*
    created () {
        if (this.session === true) {
            this.$store.dispatch({type: 'navigation/current', data: 'Home'})
            this.$router.push({ name: 'Home' })
        }
    }*/
}
</script>
