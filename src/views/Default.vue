<template>
    <div id=signin>
        <vca-column>
        <vca-card>   
        <Sign/>
        </vca-card>
        </vca-column>
    </div>
</template>
<script>
import Sign from '@/components/Sign.vue'
export default {
    name: 'Default',
    components: { Sign }
}
</script>
<style scoped>


#signin {
    width: 100%;
    flex: 1;
}
</style>
