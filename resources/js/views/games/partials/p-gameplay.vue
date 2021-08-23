<template>
  <section ref="root" class="console">
    <div class="gameplay box">
      <div  v-for="(row, index) in matrix"

            :key="row">
        <a  v-for="(col, cIndex) in row"

            :key="`${row}.${col}`"
            :class="{
              'busy': isBusy(index, cIndex),
              'win': isWin(index, cIndex),
            }"

            href="#"
            
            @click.prevent="() => playHandler(index, cIndex)">
            <span v-if="debug"
                  
                  class="debug">
              {{ `${index}/${cIndex}` }}
            </span>
          <i-icon v-if="$store.getters['game/isCancel'](index, cIndex)"
                  
                  name="cancel"
                />
          <i-icon v-if="$store.getters['game/isCircle'](index, cIndex)"
                  
                  name="circle"
                />
        </a>
      </div>
    </div>
    <p-logs v-if="$route.params.id" />
  </section>
</template>

<script>

import { ref, computed } from 'vue'

import { useStore } from 'vuex'

import IIcon from '@components/i-icon'

import PLogs from './p-logs'

export default {
  components: {
    IIcon,

    PLogs,
  },
  setup() {

    const $store = useStore()

    const debug = true
    const root = ref(null)
    
    const playMatrix = ref([])
    const matrix = computed(() => {
      let local = [],
          size = $store.getters['game/getDatum']('size')

      if (size < 3) size = 3

      for (let i = 0; i < size; i++) {
        local[i] = []
        for(let j = 0; j < size; j++)
          local[i][j] = playMatrix.value[i] != null && playMatrix.value[i][j] != null
      }

      return local
    })

    const playHandler = async (row, col) => {
      console.log($store.getters['getLoading'])
      if (!$store.getters['game/getId'] || $store.getters['getLoading']) return

      $store.dispatch('doLoading')
      await $store.dispatch('game/doPlay', [row, col])

      ref.value?.scrollIntoView()

      $store.dispatch('doLoading', false)
    }

    const isBusy = (index, cIndex) => {
      
      if ($store.getters['game/getDatum']('winner') != null) return true

      return $store.getters['game/isCancel'](index, cIndex) || $store.getters['game/isCircle'](index, cIndex)
    }

    const isWin = (index, cIndex) => (
      $store.getters['game/getDatum']('winner') == 0 & $store.getters['game/isCancel'](index, cIndex) ||
        $store.getters['game/getDatum']('winner') == 1 & $store.getters['game/isCircle'](index, cIndex)
    )
    
    return {
      root,
      debug,
      matrix,
      
      isWin,
      isBusy,
      playHandler,
    }
  },
}
</script>

<style scoped lang="scss">

  .console {
    top: 0;
    position: sticky;

    gap: 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;

    width: 100%;
  }

  .gameplay {
    overflow-x: auto;

    .debug {
      top: 0;
      left: 0;
      position: absolute;

      font-size: 11px;
      font-style: italic;
      color: darken(#e2e8f0, 10%);
    }

    & > div {
      display: flex;

      &:not(:first-child) {
        border-top: 1px solid #e2e8f0;
      }

      & > a {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 70px;
        height: 70px;

        &:not(:first-child) {
          border-left: 1px solid #e2e8f0;
        }

        &:not(.busy):hover {
          background-color: lighten(#e2e8f0, 7%);
        }

        &.busy {
          cursor: not-allowed;
        }
        
        &.win {
          background-color: rgb(0, 180, 30);

          color: white;
        }

        .svg {
          transform: scale(.9);

          transition: transform .3s;
        }

        &.busy {
           .svg {
            transform: scale(1);
          }
        }
      }

    }

  }

</style>