<template>
  <div class="login">
    <div class="bg"></div>
    <form action="#" @submit.prevent="submitHandler">
      <h3>{{ __("Registration") }}</h3>
      <div>
        <input  type="text"
                name="login"

                v-model="form.email.$value"

                :placeholder="__('E-mail')"
                :class="{
                  invalid: form.email.$errors.length
                }"
              />
        <i-form-error :value="form.email.$errors" />
      </div>
      <div>
        <input  type="password"
                name="password"

                v-model="form.password.$value"

                :placeholder="__('Password')"
                :class="{
                  invalid: form.password.$errors.length
                }"
              />
        <i-form-error :value="form.password.$errors" />
      </div>
      <div>
        <input  type="password"
                name="password_confirmation"

                v-model="form.password_confirmation.$value"

                :placeholder="__('Repeat password')"
                :class="{
                  invalid: form.password_confirmation.$errors.length
                }"
              />
        <i-form-error :value="form.password_confirmation.$errors" />
      </div>
      <div class="nav">
        <div>
          <i-checkbox v-model="form.agreement.$value">
            <template #label>
              {{ __("I agree with the") }} <a href="#">{{ __("condition") }}</a>
            </template>
          </i-checkbox>
          <router-link :to="{ params: { tab: 'login' } }">{{ __("Login") }}</router-link>
        </div>
        <i-form-error class="error"
                      
                      :value="form.agreement.$errors"
                    />
      </div>
      <button class="success">{{ __("Registration") }}</button>
    </form>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useValidation, ValidationError } from 'vue3-form-validation'

import { __ } from '@plugins/i18n'
import { min, email, equal, required, enabled } from '@utils/rules'

import ICheckbox from '@components/i-checkbox'
import IFormError from '@components/i-form-error'

export default {
  components: {
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
          {
            key: "password",
            rule: required(__("Required field!")),
          },
          min(5)(__("Password must contain at least 5 characters!")),
        ],
      },
      password_confirmation: {
        $value: "",
        $rules: [
          {
            key: "password",
            rule: equal(__("Passwords do not match!")),
          },
        ],
      },
      agreement: {
        $value: false,
        $rules: [
          enabled(__("To register, you must agree to the condition.")),
        ],
      }
    })

    const submitHandler = async () => {
      
      try {
        const formData = await validateFields()

        if (!formData.agreement)
          delete formData.agreement

        if (!errors.length) {
          $store.dispatch('doLoading', true)
 
          const response = await $store.dispatch('account/doRegister', formData)
    
          if (response.status != 200) {
            resetFields({
              password: null,
              password_confirmation: null,
            })
          } else {
            $router.push({
              name: 'Main'
            })
          }
          
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

  .login {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 15px;

    overflow: hidden;

    color: white;

    .bg {
      background-image: url("/image/register.jpg");
    }
  }

</style>