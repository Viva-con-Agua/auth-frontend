<template>    
    <div class="redirect-info">
        <h1>{{ $t('logout.redirect') }}</h1>
    </div>
</template>
<script>
export default {
    name: 'Logout',
    props:{
        callback: {
            type: String,
            default: "/#/login?scope=move4water"
        }
    },
    created () {
        this.$store.dispatch({type: 'login/logoutReq'})
            .then(() => {
                /* TODO change to this.callback when callback encoded */
                window.location = 'https://www.move4water.org'
           })
           .catch(() => {
                /* TODO change to this.callback when callback encoded */
                window.location = 'https://www.move4water.org'
           })
    }
}
</script>
<style lang="scss">
    .redirect-info {
        text-align: center;
    }
</style>