<template>
  <div class="language-selection">
    {{ $t("language.title") }}:
    <div class="flag-cont" v-for="(lang, index) in languages" :key="index" @click="changeLanguage(lang)">
      <country-flag class="flag-el" v-if="language == lang" :country="lang" size="normal"/>
      <country-flag v-else :country="lang" size="small"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LanguageSelection',
  data() {
    return {
      languages: ['de', 'ch', 'za'],
      language: localStorage.language
    }
  },
  created() {
    if (localStorage.language === undefined) {
      localStorage.language = this.$i18n.locale.toLowerCase()
    } else {
      this.$i18n.locale = localStorage.language
    }
  },
  methods: {
    changeLanguage(language)  {
      localStorage.language = language
      this.$i18n.locale = language
      this.language = language
    }
  }
};
</script>
<style lang="scss">
  .language-selection {
    .flag-cont {
      display: inline-block;
      cursor: pointer;
      margin: 0 3px;
    }
  }
</style>