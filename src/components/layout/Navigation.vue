<template>
  <div id="header" class="header">
    <img src="~@/assets/img/vca_logo_neutral.png" title="Viva con Agua" />
    <h1>{{$t('header.sso')}}</h1>
    <vca-popup :show="moreInfo" @close="moreInfo = false" class="text-left" :title="$t('header.moreInfo.title')">
        <div v-html="$t('header.moreInfo.description')"></div>
    </vca-popup>
    <h2 class="link" @click="moreInfo = true">{{ $t('header.moreInfo.button') }}</h2>

  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
        moreInfo: false
    }
  }
}
</script>
<style lang="scss">

.header {
    img {
        width: 100%;
        @include media(large) {
            width: auto;
        }
    }
}

</style>
