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
      </ul>
      <div class="language-container">
        <div class="language-fit"><LanguageSelection /></div>
      </div>
    </div>

  </div>
</template>
<script>

import LanguageSelection from "@/components/elements/LanguageSelection"
export default {
  name: 'Footer',
  components: { LanguageSelection }
};
</script>
<style lang="scss">

.legal {
  display: flex;
  color: $white;
  height: 220px;
  background-color: $dark_blue;
  bottom: 0;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    list-style-type: none;
    color: $white;
  }
  a:hover {
    text-decoration: underline;
  }

  @include media(large) {
    flex-wrap: nowrap;
    padding: 10px 10px;
    height: 80px;
  }
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
.links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;

  li {
    list-style: none;
  }

  li a {
    display: block;
    padding: 10px 10px;
  }

  @include media(large) {
    float: left;
    flex-direction: row;
    justify-content: unset;
    flex-basis: 100%;

    li {
      margin-top: auto;
      margin-bottom: auto;
    }
  }

}

</style>
