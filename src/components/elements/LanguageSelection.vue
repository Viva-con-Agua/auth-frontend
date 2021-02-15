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

    /* 
     * Language priority - empty localStorage
     * 1. If no language is already set, check for query
     * 2. If no query is set, use default lang 
     * Language priority - lang in localStorage
     * 1. is localStorage differs from query, use query (I guess someone tried to change lang in query then - H4XX0RE S7YL3)
     * 2. use localStorage
     */

    if (localStorage.language === undefined) {

      if (this.$route.query.language != undefined && this.languages.includes(this.$route.query.language)) {
        this.changeLanguage(this.$route.query.language)
      } else {
        this.changeLanguage(this.$i18n.locale.toLowerCase())
      }

    } else if (this.$route.query.language != undefined && localStorage.language != this.$route.query.language) {
      this.changeLanguage(this.$route.query.language)
    }

    this.changeLanguage(localStorage.language)
  },
  methods: {
    changeLanguage(language)  {

      this.$i18n.locale = language
      this.language = language
      localStorage.language = language
      this.$store.commit('register/country', language)
      /* We need to replace the language in the query if one is set to get a stringent language handling */
      if (this.$route.query.language !== undefined && this.$route.query.language != language) {
        this.$router.replace({query: {...this.$route.query, language: language}})
      }
    }
  },    
  watch :{
    $route: function() {
      if (this.$route.query.language !== undefined && localStorage.language != this.$route.query.language) {
        this.changeLanguage(this.$route.query.language)
      }
    },
  },
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