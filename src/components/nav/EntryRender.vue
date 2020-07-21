<template>
    <div>
    <span>{{ entry.label.de_DE }}</span>
    <div v-for="entry in entry.entrys" :key="entry.id">
        <EntryRender :entry="entry"/>
    </div>
    <button
        class="vca-button-primary button"
        @click.prevent="add">
        Add Entry
    </button>
    <CreateEntry v-if="show === 'add'" @submit="submit"/>
    </div>
</template>
<script>
import CreateEntry from '@/components/nav/CreateEntry'
export default {
    name: 'EntryRender',
    props: ['entry'],
    components: {CreateEntry},
    data () {
        return {
            show: "default"
        }
    },
    methods: {
        add () {
            this.show = "add"
        },
        submit(entry){
            this.show = "default"
            this.entry.entrys.push(entry)
        }
    }
}
</script>
