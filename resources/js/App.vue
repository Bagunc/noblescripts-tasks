<template>
  <i-sys-msg />
  <i-confirm />
  <i-loading :mode="$store.getters['getLoading']" />
  <main class="main">
    <i-languages />
    <section>
      <p-navbar />
      <router-view></router-view>
    </section>
  </main>
</template>

<script>

import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import PNavbar from '@components/p-navbar'

import ISysMsg from '@components/i-sys-msg'
import ILoading from '@components/i-loading'
import IConfirm from '@components/i-confirm'
import ILanguages from '@components/i-languages'

import { _ls_auth_token_ } from '@utils/config'

export default {
  name: 'App',
  components: {
    PNavbar,

    ISysMsg,
    ILoading,
    IConfirm,
    ILanguages,
  },
  setup() {
    const $store = useStore()
    const $router = useRouter()

    onMounted(async () => {
      if (sessionStorage.getItem(_ls_auth_token_)) {
        const response = await $store.dispatch('account/doFetch', sessionStorage.getItem(_ls_auth_token_))

        if (!response) $router.push({ name: 'Auth' })
      }
    })
  },
}
</script>

<style lang="scss">

  $color--success: rgb(0, 180, 30);
  $color--danger: #ff1f0f;
  $color--primary: #0f47ff;
  $color--default: #dfdfdf;

  @mixin smart-color ($color, $options: ()) {

    $default-options: (
      'factory': 75,

      'prop': color,

      'dark-color': black,
      'light-color': white
    );

    $options: map-merge($default-options, $options);

    $prop: map-get($options, 'prop');
    $factory: map-get($options, 'factory');
    $dark-color: map-get($options, 'dark-color');
    $light-color: map-get($options, 'light-color');

    @if (lightness($color) < $factory) {
      #{$prop}: $light-color;
    } @else {
      #{$prop}: $dark-color;
    }

  }

  body {
    overflow-x: hidden;

    &.no-scroll {
      overflow-y: hidden;
    }
  }

  .box {
    padding: 15px;

    border-radius: 10px;
    border: 0 solid #e2e8f0;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  }

  input,
  select {
    padding: 10px 15px;

    outline: none;
    font-size: 16px;
    border-radius: 5px;
    background-color: #e2e8f0;
    border: 1px solid transparent;

    transition: background-color .3s, border-color .3s;

    &:focus {
      border-color: #e2e8f0;
      background-color: white;
    }
  }

  @mixin button-highlight($color) {
    background-color:  $color;

    @include smart-color($color);

    &:hover {
      background-color: darken($color, 10%);
    }

    &:active {
      background-color: darken($color, 15%);

      transform: scale(.95);
    }
  }

  button,
  .button {
    padding: 10px 15px;

    border-radius: 5px;

    font-size: 16px;
    text-align: center;

    transition: background-color .3s, transform .1s;

    cursor: pointer;

    @include button-highlight($color--default);

    @each $name, $color in (success: $color--success, danger: $color--danger, primary: $color--primary) {
      &.#{$name} {
        @include button-highlight($color);
      }
    }

    &.has-icon {
      gap: 15px;
      align-items: center;
      display: inline-flex;
      justify-content: center;

      .svg {
        flex: 0 0 20px;

        width: 20px;
        height: 20px;
      }
    }

    &.small {
      padding: 7px 12px;

      font-size: 14px;

      &.has-icon {
        gap: 7px;
        
        .svg {
          flex: 0 0 15px;

          width: 15px;
          height: 15px;
        }
      }
    }
  }

</style>

<style scoped lang="scss">

  .main {
    min-width: 100vw;
    min-height: 100vh;

    background-color: #f7fafc;

    section {
      gap: 15px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      height: 100%;
      min-height: 100vh;
      
      padding: 15px;

      @media screen and (min-width: 768px) {
        padding: 30px;
      }
    }
  }

</style>