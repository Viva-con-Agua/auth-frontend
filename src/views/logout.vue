<template>
    <div></div>
</template>
<script>
export default {
    name: 'Logout',
    props: {
        code: {
            type: String,
            default: null
        }
    },
    created () {
        this.$store.dispatch({type: 'token', code: this.code})
            .then(() => {
                this.$router.push({name: 'Root'})
            })
    }
}
</script>
