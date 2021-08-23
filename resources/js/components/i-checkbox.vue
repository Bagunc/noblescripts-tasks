<template>
  <label class="checkbox">
    <input  type="checkbox"

            :id="id"
            :name="name"

            v-model="checked"
          />
    <span class="virtual">
      <i-icon name="tick" />
    </span>
    <label  v-if="label || $slots.label"

            :for="id">
      <slot name="label" v-if="$slots.label"></slot>
      <template v-else>{{ label }}</template>
    </label>
  </label>
</template>

<script>

import { ref, watch } from 'vue'

import IIcon from '@components/i-icon'

export default {
  components: { 
    IIcon,
  },
  props: {
    name: String,
    label: String,
    modelValue: Boolean,
  },
  setup(props, { emit }) {
    const checked = ref(props.modelValue)
    watch(checked, val => emit('update:modelValue', val))

    return {
      checked,
      id: Math.random().toString(36).substr(2),
    }
  },
}
</script>

<style scoped lang="scss">
  
  .checkbox {
    gap: 10px;
    display: flex;
    align-items: center;

    .virtual {
      flex: 0 0 25px;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 25px;
      max-width: 25px;

      border-radius: 5px;
      border: 1px solid #e2e8f0;

      transition: background-color .2s;

      .svg {
        width: 60%;
        height: 60%;

        color: #000;

        opacity: 0;

        transition: opacity .3s;
      }
    }

    input {
      display: none;

      &:checked + .virtual {
        background-color: #e2e8f0;

        .svg {
          opacity: 1;
        }
      }
    }

    label {
      flex: 0 0 auto;
      
      cursor: pointer;
    }

  }

</style>