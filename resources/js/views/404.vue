<template>
  <div class="p404">
    <div class="p404__loading">
      <i-loading :show="true" />
    </div>
    <h1>{{ __("Page Not Found") }}</h1>
  </div>
</template>

<script>

import ILoading from '@components/i-loading'

export default {
  components: {
    ILoading,
  },
  setup() {
    
  },
}
</script>

<style scoped lang="scss">

  .p404 {
    font-size: 30px;
    text-align: center;
    color: darken(#e2e8f0, 50%);

    h1 {
      font-weight: normal;
    }

    &__loading {
      min-height: 120px;

      &::v-deep .svg {
        color: #ff1f0f;
      }
    }

    .loading {
      transform: none;
      position: static;

      width: auto;
      height: auto;

      background-color: transparent;
      
      opacity: 1;
    }

  }

</style>