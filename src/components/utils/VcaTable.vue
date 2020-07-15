<template>
    <table>
        <tr>
            <slot name="head"></slot>
        </tr>
        <slot name="table"></slot>
    </table>
</template>
<script>
export default {
    name: 'VcaTable'
}
</script>
