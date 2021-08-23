<template>
  <div  :class="{
          box: true,
          game: true,
          [`winner--${payload.winner}`]: payload.winner != null,
        }">
    <i-icon v-if="payload.winner !== null && payload.winner !== 3"
        
        name="win"
      />
    <header>
      <div>
        {{ payload.p1_name || __("Unknown") }}
      </div>
      <span>vs</span>
      <div>
        {{ payload.p2_name || __("Unknown") }}
      </div>
    </header>
    <nav>
      <router-link  v-if="payload.winner == null"
                    
                    :to="{
                      name: 'Game',
                      params: {
                        id: payload.id,
                      },
                    }">
        <i-icon name="play" />
      </router-link>
      <router-link  v-else
                    
                    :to="{
                      name: 'Game',
                      params: {
                        id: payload.id,
                      },
                    }">
        <i-icon name="eye" />
      </router-link>
      <a  v-if="$store.getters['account/isCurrentUser'](payload.user_id)"
          
          href="#"
          class="trash"
          
          @click.prevent="deleteHandler">
        <i-icon name="trash" />
      </a>
    </nav>
  </div>
</template>

<script>

import { useStore } from 'vuex'

import { __ } from '@plugins/i18n'

import IIcon from '@components/i-icon'

export default {
  components: {
    IIcon,
  },
  props: {
    payload: Object,
  },
  setup(props) {

    const $store = useStore()

    const deleteHandler = async () => {
      $store.dispatch('doConfirm', {
        show: true,
        on: {
          success: async () => {
            $store.dispatch('doLoading')
            await $store.dispatch('games/doDelete', props.payload.id)
            $store.dispatch('doLoading', false)
          }
        }
      })
    }

    return {
      deleteHandler,
    }
  },
}
</script>

<style scoped lang="scss">

  .game {
    position: relative;

    display: flex;
    flex-direction: column;

    padding: 0;

    overflow: hidden;

    .svg--win {
      top: 0;
      left: 0;
      z-index: 0;
      position: absolute;
      transform: translate(-30%, -10%);

      width: 70px;
      height: 70px;

      opacity: .35;

      color: rgb(255, 187, 0);
    }
    
    &:not(.wnner--0, .wnner--1) {
      .svg--win {
        display: none;
      } 
    }

    &.winner--1 {
      .svg--win {
        right: 0;
        left: auto;
        transform: translate(30%, -10%);
      }
    }

    header {
      flex: 1;

      gap: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      padding: 15px;

      text-align: center;


      div {
        flex: 1;
      }

      span {
        flex: 0 0 auto;

        font-size: 18px;
        font-weight: bold;
        font-style: italic;
        color: darken(#e2e8f0, 30%);
      }
    }

    &.winner--0 {
      header {
        div:first-child {
          color: rgb(0, 180, 30);
        }
        div:last-child {
          color: #ff1f0f;
        }
      }
    }

    &.winner--1 {
      header {
        div:first-child {
          color: #ff1f0f;
        }
        div:last-child {
          color: rgb(0, 180, 30);
        }
      }
    }

    nav {
      display: flex;
      justify-content: flex-end;

      border-top: 1px solid #e2e8f0;

      a {
        padding: 10px;

        border-left: 1px solid #e2e8f0;

        color: #a6abb1;

        transition: color .3s, background-color .3s;

        &:hover {
          background-color: lighten(#e2e8f0, 5%);

          color: darken(#a6abb1, 20%);
        }

        &.trash {
          color: #ff1f0f;

          &:hover {
            color: darken(#ff1f0f, 10%)
          }
        }

        .svg {
          width: 20px;
          height: 20px;
        }

      }
    }

  }

</style>