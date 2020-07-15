<template>
    <div>
    <RoleCreate @created="created"/>
    <RoleList ref="roleList"/>
    </div>
</template>
<script>
import RoleCreate from '@/components/RoleCreate'
import RoleList from '@/components/RoleList'
export default {
    name: 'Admin',
    components: {RoleCreate, RoleList},
    methods:{
        created() {
            this.$refs.roleList.getRoles()
        }
    }
}
</script>
