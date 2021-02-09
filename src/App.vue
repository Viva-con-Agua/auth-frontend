<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <div class="app-wrap">
      <Navigation />
      <router-view/>
    </div>
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
  position: relative;
  min-height: 100%;
  
  @include media(large) {
    min-height: 100vh;
  }
}

.app-wrap {
  padding-bottom: 100px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
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
