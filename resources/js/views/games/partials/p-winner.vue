<template>
  <div  v-if="label"
        
        :class="{
          'state-messsage': true,
          [`state-messsage--${game.winner}`]: game.winner,
        }">
    {{ label }}
  </div>
</template>

<script>

import { computed } from 'vue'
import { useStore } from 'vuex'

import { __ } from '@plugins/i18n'

import IIcon from '@components/i-icon'

export default {
  components: {
    IIcon,
  },
  setup() {

    const $store = useStore()

    const game = computed(() => $store.getters['game/getData'])
    const label = computed(() => {
      if (game.value.winner == null) return false

      if (game.value.winner == 3) return __("The game ended in a draw")

      let player = +game.value.winner + 1
          player = game.value[`p${player}_name`]
          
      return __("{0} is win", [player])
    })

    return {
      game,
      label,
    }
  },
}
</script>

<style scoped lang="scss">

  .state-messsage {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: rgb(0, 180, 30);

    &--3 {
      color: darken(#e2e8f0, 20%);
    }
  }

</style>