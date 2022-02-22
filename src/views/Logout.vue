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
            default: "/login"
        }
    },
    created () {
        this.$store.dispatch({type: 'login/logout'})
            .then(() => {
                /* TODO change to this.callback when callback encoded */
                window.location = this.callback
           })
           .catch(() => {
                /* TODO change to this.callback when callback encoded */
                window.location = this.callback
           })
    }
}
</script>
<style lang="scss">
    .redirect-info {
        text-align: center;
    }
</style>
