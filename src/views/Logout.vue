<template>
    <div></div>
</template>
<script>
export default {
    name: 'Logout',
    created () {
        this.$store.dispatch({type: 'logout'})
            .then(() => {
                this.$router.push({name: 'Root'})
            })
    }
}
</script>
