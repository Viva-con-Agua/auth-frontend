<template>    
    <div class="redirect-info">
        <h1>{{ $t('logout.redirect') }}</h1>
    </div>
</template>
<script>
export default {
    name: 'Logout',
    created () {
        /*this.$store.dispatch({type: 'logout'})
            .then(() => {
                this.$router.push({name: 'Root'})
            })*/
    }
}
</script>
<style lang="scss">
    .redirect-info {
        text-align: center;
    }
</style>