<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>
            <WebAppSelection/>
        </vca-card>
    </div>
</template>
<script>
import WebAppSelection from '@/components/WebAppSelection'
export default {
    name: 'WebAppPage',
    components:{
        WebAppSelection
    }
}
</script>
