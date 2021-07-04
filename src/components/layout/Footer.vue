<template>
  <div class="footer">
    <div class="legal vca-left">
      <ul class="links">
        <li>
          <a href="https://vivaconagua.org" target="_blank">
            © 2021 Viva con Agua de Sankt Pauli e.V.
          </a>
        </li>
        <li>
          <a href="https://www.vivaconagua.org/datenschutzerklaerung/" target="_blank">
            {{ $t("footer.legal.dataSecurity") }}
          </a>
        </li>
        <li>
          <a href="https://www.vivaconagua.org/impressum/" target="_blank">
            {{ $t("footer.legal.imprint") }}
          </a>
        </li>
        <li>
          <a href="mailto:support@vivaconagua.org" target="_blank">
            {{ $t("footer.legal.contact") }}
          </a>
        </li>
      </ul>
      <div class="language-container">
        <div class="language-fit"><LanguageSelection /></div>
      </div>
    </div>
  </div>
</template>
<script>

import LanguageSelection from "@/components/utils/LanguageSelection"
export default {
  name: 'Footer',
  components: { LanguageSelection }
};
</script>
<style lang="scss">
.legal {
  padding-bottom: 30px;
}
.language-container {
  padding-right: 15px;
  position: relative;
  flex-basis: 100%;
  justify-content: center;
  display: flex;
  .language-fit {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  @include media(large) {
    height: 100%;
    justify-content: flex-end;
  }
}
</style>