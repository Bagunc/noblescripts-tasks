<template>
  <nav class="languages">
    <a  v-for="lang in languages"  
        
        href="#"
        
        :key="lang.code"
        :class="{
          selected: $store.getters['getLocalCode'] === lang.code,
        }"
        
        @click.prevent="$store.dispatch('doSwitchLang', { code: lang.code })">
      {{ lang.label }}
    </a>
  </nav>
</template>

<script>
export default {
  setup() {
    const languages = [
      {
        code: 'hy',
        label: 'Հայերեն',
      },
      {
        code: 'ru',
        label: 'Русский',
      },
      {
        code: 'en',
        label: 'English',
      },
    ]

    return {
      languages,
    }
  },
}
</script>

<style scoped lang="scss">

  .languages {
    top: 0;
    right: 0;
    position: fixed;
    align-items: center;

    padding: 10px 30px;

    gap: 15px;
    display: flex;
    flex-wrap: wrap;

    a {
      font-size: 13px;
      color: darken(#e2e8f0, 20%);
      
      transition: color .3s;

      &:hover {
        text-decoration: underline;
        color: darken(#e2e8f0, 30%);
      }

      &.selected {
        color: darken(#e2e8f0, 50%);
      }
    }
  }

</style>