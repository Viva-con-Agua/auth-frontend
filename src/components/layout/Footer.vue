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
      <!--div class="language-container">
        <div class="language-fit"><LanguageSelection /></div>
      </div-->
    </div>

  </div>
</template>
<script>

//import LanguageSelection from "@/components/elements/LanguageSelection"
export default {
  name: 'Footer'
  //components: { LanguageSelection }
};
</script>
