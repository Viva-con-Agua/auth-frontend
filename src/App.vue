<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <CustomNavigation />
    <router-view id="app-content"/>
    <Footer id="app-footer"/>
  </div>
</template>

<script>
import CustomNavigation from '@/components/layout/CustomNavigation.vue'
import Footer from '@/components/layout/Footer.vue'
export default {
  name: 'Auth',
  components: { CustomNavigation, Footer }
}
</script>