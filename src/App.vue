<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <Navigation />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
export default {
  name: 'Auth',
  components: { Navigation, Footer }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.register {
  text-align: left;
}

.text-center {
  text-align: center;
}

.link {
    color: $dark_blue;
    cursor: pointer;
}
</style>
