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
                window.location = this.callback
           })
           .catch(() => {
                window.loaction = this.callback
           })
    }
}
</script>
<style lang="scss">
    .redirect-info {
        text-align: center;
    }
</style>