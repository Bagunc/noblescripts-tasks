<template>
  <div  v-if="data.length"
          
        ref="table">
    <p-row  v-for="(datum, index) in data"
        
            :key="index"
            :payload="datum"
          />
  </div>
  <div  v-else
        
        class="empty">
    {{ __("Not data yet") }}
  </div>
</template>

<script>

import { ref, computed , onMounted } from 'vue'

import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import PRow from './row'

export default {
  components: {
    PRow,
  },
  setup() {

    const $store = useStore()
    const $route = useRoute()

    const table = ref(null)

    onMounted(async () => {
      $store.dispatch('doLoading')
      await $store.dispatch('values/doFetch')
      $store.dispatch('doLoading', false)
    })


    const data = computed(() => {
      let local = [...$store.getters['values/getItems']];
      
      switch ($route.params.sort) {
        case 'asc':
          return local.sort((a, b) => {
            if (!b.id) return 1

            return a.value?.localeCompare(b.value)
          })
        case 'desc':
          return local.sort((a, b) => {
            if (!a.id) return -1

            return b.value?.localeCompare(a.value)
          })
      }

      return local;
    })

    return {
      data,
      table,
    }
  },
}
</script>

<style scoped lang="scss">

  .empty {
    padding: 10px 15px;

    color: #999;
    font-size: 13px;
    font-style: italic;
  }

</style>