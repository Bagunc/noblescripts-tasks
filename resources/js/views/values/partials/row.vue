<template>
  <div  :class="{
          'row': true,
          'row--new': !payload.id,
          'row--editing': isEditMode(payload.id),
        }">
    <div @click="() => !isEditMode(payload.id) && editingHandler(payload)">
      <input  v-if="isEditMode(payload.id)"
              
              ref="field"
              v-model="single.value"

              @keydown.enter="saveHandler"
              @keydown.tab="goSiblingHandler"
              @keydown.escape="$store.dispatch('value/doReset')"
            />
      <span v-else>
        {{ payload.value }}
      </span>
    </div>
    <div class="buttons">
      <button v-if="isEditMode(payload.id) || !payload.id"
            
            class="success has-icon small"
            
            @click="saveHandler">
        <i-icon name="tick-alt" />
        {{ __('Save') }}
      </button>
      <button v-else
              
              class="default has-icon small"
              
              @click="() => editingHandler(payload)">
        <i-icon name="edit" />
        {{ __('Edit') }}
      </button>
      <button class="danger small has-icon"
      
              @click="() => deleteHandler(payload.id)">
        <i-icon name="trash" />
        {{ __('Delete') }}
      </button>
    </div>
  </div>
</template>

<script>

import { ref, computed } from 'vue'

import { useStore } from 'vuex'

import IIcon from '@components/i-icon'

export default {
  components: {
    IIcon,
  },
  props: {
    isNew: Boolean,
    payload: Object,
  },
  setup() {

    const $store = useStore()
    
    const field = ref(null)
    
    const single = computed(() => $store.getters['value/getData'])

    const isEditMode = id => single.value.id === id

    const goSiblingHandler = event => {
      const { srcElement } = event

      const side = event.shiftKey ?  "previous" : "next"
      const sibling = srcElement.closest('.row')[`${side}ElementSibling`]

      if (sibling.classList.contains('row'))
        sibling.querySelector('.buttons button').click()
    }

    const editingHandler = datum => {
      $store.dispatch('value/doLoad', {...datum})

      setTimeout(() => field.value.focus(), 1)
    }

    const deleteHandler = async id => {
      if (!id) {
        $store.dispatch('value/doReset')
        return $store.dispatch('values/doClean');
      }

      $store.dispatch('doConfirm', {
        show: true,
        on: {
          success: async () => {
            $store.dispatch('doLoading')
            const response = await $store.dispatch('values/doDelete', id)
            if (response.status === 200)
              $store.dispatch('doLoading', false)
          }
        }
      })
    }

    const saveHandler = async () => {
      $store.dispatch('doLoading')

      const response = await $store.dispatch('value/doSave')

      $store.dispatch('value/doReset')
      $store.dispatch('values/doClean')

      switch (response.status) {
        case 200: {
          $store.commit('values/updateItem', response.data.payload)
          break
        }
        case 201: {
          $store.commit('values/setItem', response.data.payload)
          break
        }
      }
      $store.dispatch('doLoading', false)
    }

    return {
      field,
      single,

      isEditMode,
      saveHandler,
      deleteHandler,
      editingHandler,
      goSiblingHandler,
    }
  },
}
</script>

<style scoped lang="scss">

  .row {
    display: grid;
    grid-template-columns: 1fr;

    border-top: 1px solid darken(#f7fafc, 10%);

    @media screen and (min-width: 568px) {
      grid-template-columns: 1fr 150px;
    }

    @media screen and (min-width: 768px) {
      align-items: center;
      grid-template-columns: 1fr 300px;
    }

    &--editing {
      & > div:first-child {
        padding: 2px 0;
        
        @media screen and (min-width: 568px) {
          padding-right: 15px;
        }
      }

    }

    &:not(.row--editing) {
      div:first-child {
        cursor: text;

        transition: background-color .3s;

        &:hover {
          background-color: lighten(#e2e8f0, 5%);
        }
      }
    }

    & > div {
      padding: 10px 15px;

      input {
        width: 100%;
      }
    } 

    .buttons {
      gap: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;

      button {
        min-width: 120px;
      }
    }
  }

</style>