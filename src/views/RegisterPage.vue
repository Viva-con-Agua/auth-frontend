<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>

                    <Register/>
        </vca-card>
    </div>
</template>
<script>

import Register from '@/components/Register'
export default {
    name: 'RegisterView',
    props: {
        scope: {
            type: String,
            default: ""
        },
        callback: {
            type: String,
            default: null
        }
    },
    created() {
        this.$store.commit('register/scope', this.scope)
        this.$store.commit('callback', this.callback)
    },
    components: {
        Register, 
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
