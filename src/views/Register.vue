<template>
    <div class="tabs-details">
        <vca-card>
                    <Register/>
        </vca-card>
    </div>
</template>
<script>

import Register from '@/components/Register'
export default {
    name: 'RegisterView',
    props: {
        scope: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.commit('register/scope', this.scope)
    },
    components: {
        Register, 
    }
}
</script>
