<template>
  <div  ref="root"
        class="container box">
    <header class="header">
      <div :class="{
        sortable: true,
        asc: $route.params.sort == 'asc',
        desc: $route.params.sort == 'desc',
      }">
        <router-link :to="{
                        params: {
                          sort: $route.params.sort == 'asc' ? 'desc' : 'asc',
                        },
                      }">
          {{ __("Value") }}
          <i-icon name="arrow-down" />
        </router-link>
      </div>
      <div class="action">
        <button class="primary small has-icon"
            
                @click="prependHandler">
          <i-icon name="plus" />
          {{ __("Add") }}
        </button>
      </div>
    </header>
    <p-table />
  </div>
</template>

<script>

import { ref, computed } from 'vue'

import { useStore } from 'vuex'

import IIcon from '@components/i-icon'

import PTable from './partials/table.vue'

export default {
  components: {
    IIcon,

    PTable,
  },
  setup() {

    const $store = useStore()

    const root = ref(null)

    const single = computed(() => $store.getters['value/getData'])

    const prependHandler = () => {
      if (!single.value.new && !single.value.id) {
        $store.dispatch('value/doReset', true)
        $store.commit('values/setItem', {...single.value})
      }

      setTimeout(() =>
        root.value.querySelector('.row--new')?.querySelector('input')?.focus(), 100)
    }

    return {
      root,

      prependHandler,
    }
  },
}
</script>

<style scoped lang="scss">

  .container {
    width: 100%;
    max-width: 768px;

    .actions {
      gap: 15px;
      display: flex;
      justify-content: flex-end;
    }

    .header {
      top: 0;
      position: sticky;

      display: grid;
      align-items: center;
      grid-template-columns: 1fr auto;

      margin-top: 30px;

      background-color: #f7fafc;
      border-bottom: 1px solid darken(#f7fafc, 10%);
      
      & > div {
        padding: 10px 15px;

        text-align: left;
        
        &:first-child {
          width: 100%;
        }

        &.action {
          padding-top: 2px;
          padding-bottom: 2px;

          text-align: right;
        }

        &.sortable {
          padding: 0;

          .svg {
            transition: transform .3s;
          }

          &.asc {
            .svg {
              transform: rotate(180deg);
            }
          }
        }

        a {
          gap: 10px;
          display: flex;
          align-items: center;

          padding: 10px 15px;

          transition: background-color .3s;

          &:hover {
            background-color: darken(#f7fafc, 3%);
          }

          .svg {
            width: 15px;
            height: 15px;
          }
        }

        button {
          min-width: 120px;
        }
      }
    }    
  }

</style>