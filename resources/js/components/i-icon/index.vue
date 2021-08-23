<template>
  <svg :class="clsx">
    <use :xlink:href="xlink"></use>
  </svg>
</template>

<script>

import { computed, reactive } from 'vue'

import icons from './icons.svg'

export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
  },
  setup({ name, disabled, size }) {
    const xlink = computed(() => `${icons}#${name}`)
    
    const clsx = reactive({
      svg: true,
      [`svg--${name}`]: name,
      [`svg--${size}`]: size,
      'svg--disabled': disabled,
    })

    return {
      clsx,
      xlink,
    }
  },
}

</script>

<style scoped lang="scss">

  .svg {
    align-items: center;
    display: inline-flex;
    justify-content: center;

    width: 30px;
    height: 30px;
    max-width: 100%;

    vertical-align: middle;

    color: inherit;

    &--small {
      width: 15px;
      height: 15px;
    }

    &--large {
      width: 50px;
      height: 50px;
    }
    
    &--disabled {
      opacity: .75;

      cursor: not-allowed;
      pointer-events: none;

      transition: opacity .3s ease-in-out;
    }

  }

</style>