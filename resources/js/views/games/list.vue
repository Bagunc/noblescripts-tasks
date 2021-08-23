<template>
  <div  v-if="data.length"

        class="games">
    <p-single v-for="datum in data"
              
              :key="datum.id"
              :payload="datum"
            />
  </div>
  <div  v-else
        
        class="empty">
    {{ __("Not played games yet") }}
  </div>
</template>

<script>

import { computed, onMounted } from 'vue'

import { useStore } from 'vuex'

import IIcon from '@components/i-icon'

import PSingle from './partials/p-single'

export default {
  components: {
    IIcon,
    
    PSingle,
  },
  setup() {

    const $store = useStore()

    const data = computed(() => $store.getters['games/getItems'])

    onMounted(async () => {
      $store.dispatch('doLoading')
      await $store.dispatch('games/doFetch')
      $store.dispatch('doLoading', false)
    })

    return {
      data,
    }
  },
}
</script>

<style scoped lang="scss">

  .games {
    width: 100%;

    gap: 15px;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
  }

  .empty {
    font-size: 22px;
    color: #a6abb1;
    font-style: italic;
  }

</style>