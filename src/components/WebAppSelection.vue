<template>
    <div>
    <div v-for="item in list" :key="item.id">
        <a :href="item.login_redirect_url"> {{ item.name }} </a>
</div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'WebAppSelection',
    computed:{
        ...mapGetters({
            list: 'webapp/list'
        })
    },
    created(){
        this.$store.dispatch("webapp/list")
            .catch(() => {
                       this.$router.push("login")
                   })
    }
}
</script>
