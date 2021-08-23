<template>
  <div>
    {{ __("Game") }}:
    {{ `#${$route.params.id}` }}
  </div>
  <p-winner />
  <p-gameplay />
</template>

<script>
import { onMounted, onUnmounted } from 'vue'

import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import PGameplay from './partials/p-gameplay'
import PWinner from './partials/p-winner'

export default {
  components: {
    PWinner,
    PGameplay,
  },
  setup() {
    const $store = useStore()
    const $route = useRoute()
    const $router = useRouter()

    onMounted(async () => {
      $store.dispatch('doLoading')
      const response = await $store.dispatch('game/doFetch', $route.params.id)

      if (response.status == 404)
        $router.push({
          name: 'NotFound'
        })

      $store.dispatch('doLoading', false)
    })

    onUnmounted(() => {
      $store.dispatch('game/doReset')
    })
  },
}
</script>