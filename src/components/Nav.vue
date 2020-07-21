<template>
    <div>
        <vca-card>
        {{ nav.name}}
        <div v-for="entry in nav.entrys" :key="entry.id">
            <EntryRender :entry="entry"/>
        </div>
        </vca-card>
    <vca-card>
    <CreateNav @submit="addNav"/>
    </vca-card>
    <vca-card>
    <CreateEntry @submit="addEntry"/>
    </vca-card>
            
    <button
        class="vca-button-primary button"
        @click.prevent="validate">
        Add Nav
    </button>
    </div>
</template>
<script>
import axios from 'axios'
import CreateNav from '@/components/nav/CreateNav'
import CreateEntry from '@/components/nav/CreateEntry'
import EntryRender from '@/components/nav/EntryRender'

export default {
    name: 'Nav',
    components: {CreateNav, CreateEntry, EntryRender},
    data () {
        return {
            nav: '',
            headers: {
    '           Content-Type': 'application/json'
            },
        }
    },
    methods: {
        addNav(nav) {
            this.nav = nav  
        },
        addEntry(entry) {
            this.nav.entrys.push(entry)
        },
        submit() {
            axios.post(process.env.VUE_APP_BACKEND_URL + "/v1/navigation", this.nav, {headers: this.headers})
                .then(response => {
                    if ( response.status === 201 ) {
                        alert.call("store nav")
                    }
                })
                .catch( error => {
                    console.log(error)
                })
        }
    }

}
</script>
