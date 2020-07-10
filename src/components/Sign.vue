<template>
    <vca-tabs>
    <vca-tab title="SignIn" selected=true>
        <SignIn/>
    </vca-tab>
    <vca-tab title="SignUp">
        <SignUp/>
    </vca-tab>
</vca-tabs>
</template>
<script>
import SignIn from '@/components/sign/SignIn'
import SignUp from '@/components/sign/SignUp'
export default {
    name: 'Sign',
    components: {SignIn, SignUp}
}
</script>
