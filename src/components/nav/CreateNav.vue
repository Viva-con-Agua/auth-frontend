<template>
    <vca-form>
        <vca-field>
            <vca-input
                ref="name"
                errorMsg="Name angeben"
                placeholder="Name"
                v-model.trim="nav.name" 
                :rules="$v.nav.name">
            </vca-input>
        </vca-field>
        <button
            class="vca-button-primary button"
            @click.prevent="validate">
            Add Nav
        </button>
    </vca-form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'CreateNav',
    data() {
        return {
            nav: {
                name: '',
                entrys: []
            },
            headers: {
                'Content-Type': 'application/json'
            },
        }
    },
    validations: {
        nav: {
            name: {
                required,
            }
        }
    },
    methods: {
        validate() {
            this.errorStat = ''
            if (this.$v.$invalid === true ) {
                this.$refs.name.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$emit("submit", this.nav)
        }
    }

    
}
</script>
