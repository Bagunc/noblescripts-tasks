<template>
  <aside class="logs box">
    <h3>{{ __("Logs") }}</h3>
    <div class="wrapper">
      <div  class="log">
        <ul class="log__list">
          <li v-for="log in game.logs?.reverse()"
              
              :key="log.id">
            <div  :class="{
                    log__player: true,
                    [`log__player--${log.player}`]: true
                  }">
              <span class="avatar"
                    
                    :title="$store.getters['game/getPlayerName'](log.player + 1)">
                {{ $store.getters['game/getPlayerName'](log.player + 1)[0] }}
              </span>
            </div>
            <i-icon :name="$store.getters['game/getSymbol'](log.player)" />
            <span>[{{ log.coords }}]</span>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>

import { computed } from 'vue'
import { useStore } from 'vuex'

import IIcon from '@components/i-icon'

export default {
  components: {
    IIcon,
  },
  setup() {
    const $store = useStore() 

    const game = computed(() => $store.getters['game/getData'])

    return {
      game,
    }
  },
}
</script>

<style scoped lang="scss">

  .logs {
    width: 100%;
    max-width: 250px;

    overflow: hidden;

    padding-left: 0;
    padding-right: 0;

    .wrapper {
      display: flex;
      flex-direction: row;
    }


    h3 {
      margin: 0;

      text-align: center;
    }

    .log {
      flex: 0 0 100%;

      gap: 15px;
      display: flex;
      flex-direction: column;

      width: 100%;
      max-width: 100%;

      padding: 5px 20px;

      overflow: hidden;

      &__player {
        font-size: 16px;
        text-align: center;
        color: darken(#e2e8f0, 15%);

        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30px;
          height: 30px;

          margin: 0 auto;

          border-radius: 30px;
          background-color: #0f47ff;

          color: white;
          font-size: 20px;
          font-weight: bold;
          text-transform: uppercase;
        }

        &--1 {
          .avatar {
            background-color: #ff1f0f;
          }
        }

      }

    }
    
    ul {
      gap: 5px;
      display: flex;
      flex-direction: column;

      margin: 0;
      padding: 0;

      list-style: none;

      li {
        gap: 10px;
        display: flex;
        align-items: center;

        padding-bottom: 5px;

        &:not(:last-child) {
          border-bottom: 1px solid #e2e8f0;
        }

        .svg {
          width: 15px;
          height: 15px;
        }
      }
    }

  }

</style>