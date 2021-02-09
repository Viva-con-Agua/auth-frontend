<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>
            <Login />
        </vca-card>
    </div>
</template>
<script>

import Login from '@/components/Login'
export default {
    name: 'LoginView',
    props: {
        scope: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.commit('login/scope', this.scope)
    },
    components: {
        Login, 
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
