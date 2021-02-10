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
            .then(response => {
                console.log(response)
                window.location = this.callback
           })
           .catch(error=> {
                console.log(error)
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