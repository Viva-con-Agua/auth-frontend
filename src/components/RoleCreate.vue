<template>
    <vca-card>
    <vca-form>
        <vca-field>
            <vca-input
                ref="name"
                errorMsg="Bitte gib deiner Rolle einen Name"
                placeholder="Name der Rolle"
                v-model.trim="role.name" 
                :rules="$v.role.name">
            </vca-input>
            <vca-input
                ref="service_name"
                errorMsg="Bitte Service angeben"
                placeholder="Name des Service"
                v-model.trim="role.service_name" 
                :rules="$v.role.service_name">
            </vca-input>
        </vca-field>
        <button
                class="vca-button-primary button"
                @click.prevent="createRole">
            add role
        </button>
        </vca-form>
    </vca-card>
</template>
<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'RoleCreate',
    data() {
        return {
            role: {
                name: '',
                service_name: ''
            },
            headers: {
                'Content-Type': 'application/json'
            },
        }
    },
    validations: {
        role: {
            name: {
                required
            },
            service_name: {
                required
            }
        }
    },
    computed: {
        user () {
            return this.$store.getters.sessionUser
        }
    },
    methods: {
        createRole() {
            axios.default.withCredentials = true
            axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/roles', this.role, { headers: this.headers })
                .then( response => { 
                    if ( response.status === 201 ) {
                        this.$emit("created")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>
