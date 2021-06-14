<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <CustomNavigation />
    <router-view class="app-content"/>
    <Footer class="app-footer"/>
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: min-content;
}

.app-content {
    flex-shrink: 0;
    flex-grow: 1;
}

.app-footer {
    flex-shrink: 0;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.link {
    color: $blue;
    cursor: pointer;
    text-decoration: underline;
}
</style>
