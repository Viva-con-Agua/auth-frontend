<template>
    <vca-form>
        <vca-field>
            <vca-field-row>
                <vca-input 
                ref="de_DE"
                first
                errorMsg="Bitte Label eintragen"
                placeholder="DE Label"
                v-model.trim="entry.label.de_DE" 
                :rules="$v.entry.label.de_DE">
                </vca-input>
                <vca-input
                    ref="en_EN"
                    last
                    errorMsg="Bitte Label eintragen"
                    placeholder="en label"
                    v-model.trim="entry.label.en_EN" 
                    :rules="$v.entry.label.en_EN">
                </vca-input>
            </vca-field-row>
            <vca-input
                ref="url"
                errorMsg="link angeben"
                placeholder="Link"
                v-model.trim="entry.url" 
                :rules="$v.entry.url">
            </vca-input>
            <vca-input
                ref="role"
                placeholder="Role"
                v-model.trim="entry.role_name"> 
            </vca-input>
            <vca-input
                ref="style"
                placeholder="style"
                v-model.trim="entry.style" >
            </vca-input>
        </vca-field>
        <button
            class="vca-button-primary button"
            @click.prevent="validate">
            Add Entry
        </button>
    </vca-form>
</template>
<script>
import { required} from 'vuelidate/lib/validators'
export default {
    name: 'CreateEntry',
    data() {
        return {
            entry: {
                label: {
                    de_DE: '',
                    en_EN: ''
                },
                url: '',
                role_name:'',
                entrys: [],
                style: ''
            },
            headers: {
                'Content-Type': 'application/json'
            },
        }
    },
    validations: {
            entry: {
                label: {
                    de_DE: { required },
                    en_EN: {required },
                },
                url: { required },
            }
        },
    methods: {
        validate() {
            this.errorStat = ''
            if (this.$v.$invalid === true ) {
                this.$refs.de_DE.validate()
                this.$refs.en_EN.validate()
                this.$refs.url.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            this.$emit("submit", this.entry)
        }
    }
}

</script>
