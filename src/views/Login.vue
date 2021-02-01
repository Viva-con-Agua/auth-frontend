<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>

                    <SignIn />
        </vca-card>
    </div>
</template>
<script>

import SignIn from '@/components/SignIn'
export default {
    name: 'Login',
    props: {
        scope: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.commit('scope', this.scope)
    },
    components: {
        SignIn, 
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
