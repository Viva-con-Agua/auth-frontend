<template>
    <div id=signin>
    <VcAFrame>
        <VcAColumn>
            <Credentials/>
        </VcAColumn>
    </VcAFrame>
    </div>
</template>
<script>
import { VcAFrame, VcAColumn } from 'vca-widget-base'
import Credentials from '@/components/Credentials.vue'
import 'vca-widget-base/dist/vca-widget-base.css'
    
export default {
    name: 'SignIn',
    components: { Credentials, VcAFrame, VcAColumn }
}
</script>
<style scoped>


#signin {
    width: 100%;
    flex: 1;
}
</style>
