<template>
    <vca-tabs>
    <vca-tab>
        <SignIn/>
    </vca-tab>
    <vca-tab>
        content
    </vca-tab>
</vca-tabs>
</template>
<script>
import SignIn from '@/components/sign/SignIn'
export default {
    name: 'Sign',
    components: {SignIn}
}
</script>
