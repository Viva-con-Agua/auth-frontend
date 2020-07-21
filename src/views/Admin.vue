<template>
    <div>
    <RoleCreate @created="created"/>
    <RoleList ref="roleList"/>
    <Nav/>
    </div>
</template>
<script>
import RoleCreate from '@/components/RoleCreate'
import RoleList from '@/components/RoleList'
import Nav from '@/components/Nav'
export default {
    name: 'Admin',
    components: {RoleCreate, RoleList, Nav},
    methods:{
        created() {
            this.$refs.roleList.getRoles()
        }
    }
}
</script>
