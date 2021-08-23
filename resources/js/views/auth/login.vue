<template>
  <div class="login">
    <div class="bg"></div>
    <form action="#" @submit.prevent="submitHandler">
      <h3>{{ __("Authorization") }}</h3>
      <div>
        <input  type="text"
                name="email"
                :placeholder="__('E-mail')"

                v-model="form.email.$value"

                :class="{
                  invalid: form.email.$errors.length
                }"
              />
        <i-form-error :value="form.email.$errors" />
      </div>
      <div>
        <input  type="password"
                name="password"
                :placeholder="__('Password')"

                v-model="form.password.$value"

                :class="{
                  invalid: form.password.$errors.length
                }"
              />
        <i-form-error :value="form.password.$errors" />
      </div>
      <div class="nav">
        <div>
          <i-checkbox :label="__('Remember me')"
                      
                      v-model="form.rememberMe.$value"
                    />
          <router-link :to="{ params: { tab: 'registration' } }">{{ __("Registration") }}</router-link>
        </div>
      </div>
      <button class="success">{{ __('Login') }}</button>
    </form>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useValidation, ValidationError } from 'vue3-form-validation'

import { __ } from '@plugins/i18n'
import { email, required } from '@utils/rules'

import ICheckbox from '@components/i-checkbox'
import Index from '@components/i-icon/index.vue'
import IFormError from '@components/i-form-error'

export default {
  components: {
    Index,
    ICheckbox,
    IFormError,
  },
  setup() {

    const $store = useStore()
    const $router = useRouter()
    
    const { form, errors, validateFields, resetFields } = useValidation({
      email: {
        $value: "",
        $rules: [
          required(__("Required field!")),
          email(__("Invalid email address!")),
        ],
      },
      password: {
        $value: "",
        $rules: [
          required(__("Required field!")),
        ],
      },
      rememberMe: {
        $rules: [],
        $value: false,
      },
    })

    const submitHandler = async () => {
      try {
        const formData = await validateFields()
        
        if (!errors.length) {
          $store.dispatch('doLoading')

          const response = await $store.dispatch('account/doLogin', formData)

          if (response.status != 200)
            resetFields({
              password: null,
            })
          else
            $router.push({
              name: 'Main'
            })

          $store.dispatch('doLoading', false)
        }

      } catch(err) {
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

  .login {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 15px;

    overflow: hidden;

    color: white;

    .bg {
      background-image: url("/image/login.png");
    }
  }

</style>