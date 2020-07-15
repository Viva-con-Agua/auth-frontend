<template>
    <vca-card>
        <table>
        <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Delete?</th>
        </tr>
        <div class="content" v-for="role in roles" :key="role.uuid">
            <tr>
                <td> {{ role.name }}</td>
                <td> {{ role.service_name }} </td>
                <td> 
                    <button
                            class="vca-button-primary button"
                            @click.prevent="deleteRole(role.uuid)">
                        delete
                    </button>
                </td>
            </tr>
            </div>
            </table>
    </vca-card>
</template>
<script>
import axios from 'axios'
//import VcATableColumn from '@/components/utils/VcaTableColumn'
export default {
    name: 'RoleList',
    data () {
        return {
            roles: [],
            headers: {
                'Content-Type': 'application/json'
            },
        }
    },
    mounted() {
        this.getRoles()
    },
    methods: {
        getRoles() {
            axios.defaults.withCredentials = true
            axios.get(process.env.VUE_APP_BACKEND_URL + '/v1/roles', { headers: this.headers })
                .then( response => { 
                    if ( response.status === 200 ) {
                        this.roles = response.data
                    }
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })

        },
        deleteRole(uuid) {
            axios.defaults.withCredentials = true
            axios.delete(process.env.VUE_APP_BACKEND_URL + '/v1/roles',{ headers: this.headers,  data: { 'uuid': uuid}})
                .then( response => { 
                    if ( response.status === 200 ) {
                        this.getRoles()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            
        }
    }
}
</script>
<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
table .content {
    display: contents;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
