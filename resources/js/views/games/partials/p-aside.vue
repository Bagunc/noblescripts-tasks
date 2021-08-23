<template>
  <aside class="aside box">
    <div>
      <div>
        <label>{{ __("Size") }}</label>
        <div>
          <input type="number" v-model="form.size.$value" />
          <i-form-error :value="form.size.$errors" />
        </div>
      </div>
      <div>
        <label>{{ __("Player {0} name", [1]) }}</label>
        <div>
          <input v-model="form.p1_name.$value" />
          <i-form-error :value="form.p1_name.$errors" />
        </div>
      </div>
      <div>
        <label>{{ __("Player {0} name", [2]) }}</label>
        <div>
          <input v-model="form.p2_name.$value" />
          <i-form-error :value="form.p2_name.$errors" />
        </div>
      </div>
    </div>
    
    <button class="success"
            
            @click="submitHandler">
      {{ __("Save") }}
    </button>
  </aside>
</template>

<script>

import { computed, onMounted, onUnmounted } from 'vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { useValidation, ValidationError } from 'vue3-form-validation'

import { __ } from '@plugins/i18n'
import { required } from '@utils/rules'

import IIcon from '@components/i-icon'
import IFormError from '@components/i-form-error'

export default {
  components: {
    IIcon,
    IFormError,
  },
  setup() {

    const $store = useStore()
    const $router = useRouter()

    onMounted(() => {
      form.p1_name.$value =  $store.getters['account/getDatum']('name')
    })

    onUnmounted(() => {
      $store.dispatch('game/doReset')
    })

    const { form, errors, validateFields } = useValidation({
      size: {
        $value: computed({
          get: () => $store.getters['game/getDatum']('size'),
          set: size => $store.commit('game/setDatum', { size }),
        }),
        $rules: [
          required(__("Size is required")),
          val => val >= 3 || __("Size cannot be less than {0}", [3]),
        ],
      },
      p1_name: {
        $value: computed({
          get: () => $store.getters['game/getDatum']('p1_name'),
          set: p1_name => $store.commit('game/setDatum', { p1_name }),
        }),
        $rules: [],
      },
      p2_name: {
        $value: computed({
          get: () => $store.getters['game/getDatum']('p2_name'),
          set: p2_name => $store.commit('game/setDatum', { p2_name }),
        }),
        $rules: [],
      },
    })

    const submitHandler = async () => {
      try {

        await validateFields()

        if (!errors.length) {
          $store.dispatch('doLoading')
          const response = await $store.dispatch('game/doSave')
          
          if (response.status === 201)
            setTimeout(() => $router.push({
              name: 'Game',
              params: {
                id: response.data?.payload?.id,
              },
            }), 200)
          
          $store.dispatch('doLoading', false)
        }

      } catch (err) {
        if (!(err instanceof ValidationError))
          console.error(err)
      }
    }

    return {
      form,

      submitHandler,
    }
  },
}
</script>

<style scoped lang="scss">

  .aside {
    gap: 30px;
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 250px;

    .info {
      font-size: 13px;
      color: #0f47ff;
    }

    select {
      width: 100%;
    }

    & > div {
      flex: 1;
      gap: 15px;
      display: flex;
      flex-direction: column;

      & > div {
        gap: 5px;
        display: flex;
        flex-direction: column;

        label {
          font-size: 13px;
          text-transform: uppercase;
          color: darken(#dfdfdf, 10%);
        }

        & > div {
          display: flex;
          flex-wrap: wrap;

          a {
            flex: 1;
            
            display: flex;
            align-items: center;
            justify-content: center;

            height: 100px;

            border-radius: 5px;

            &:hover {
              background-color: lighten(#e2e8f0, 5%);

              .svg {
                transform: scale(.9);
              }
            }

            .svg {
              transform: scale(.8);

              width: 60px;
              height: 60px;

              transition: transform .2s;
            }

            &.selected {
              background-color: darken(#e2e8f0, 30%);

              color: white;

              .svg {
                transform: scale(1);
              }
            }
          }
        }
      }
    }

    button {
    } 
  }

</style>