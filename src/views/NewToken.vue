<template>
    <div id=newToken>
        <vca-card>

            <NewToken :emailP="emailP"/>
        </vca-card>
    </div>

</template>
<script>
import NewToken from '@/components/NewToken'
export default {
    name: 'Confirm',
    props: {
        emailP: {
            type: String,
            default: ''
        }
    },
    components: { NewToken }
}
</script>
