<template>
    <div></div>
</template>
<script>
export default {
    name: 'ConsentPage',
    props:{
        consent_challenge:{
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.commit('login/consent_challenge', this.consent_challenge)
        this.$store.dispatch('login/consent_challenge')
            .then((response) => {
                window.location = response.redirect_to
            })
    }
    
}
</script>
