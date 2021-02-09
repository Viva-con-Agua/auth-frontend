<template>
    <div id="sign-view" class="tabs-details">
        <vca-card>
            <vca-tabs>
                <vca-tab :title="$t('sign.register.title')" selected=true>
                    <Register />
                </vca-tab>
                <vca-tab :title="$t('sign.login.title')">
                    <Login />
                </vca-tab>
            </vca-tabs>
        </vca-card>
    </div>
</template>
<script>

import Register from '@/components/Register'
import Login from '@/components/Login'

export default {
    name: 'Sign',
    components: {
        Register, 
        Login
    }
}
</script>
