<template>
    <div>
    <template v-slot:head>
        <th>{{ name }}</th>
    </template>
    <template v-slot:table>
        <td> <slot></slot></td>
    </template>
    </div>
</template>
<script>
export default {
    name: 'VcaTableColumn',
    props: {
        name: {
            type: String,
            default: 'not set'
        }
    }
}
</script>
