require('./bootstrap');

import { createApp } from 'vue'

import store from '@/store/index'
import router from '@/router/index'

import i18n from '@plugins/i18n'
import { _ls_auth_token_ } from '@utils/config'

import App from './App.vue'

if (localStorage.getItem(_ls_auth_token_))
  sessionStorage.setItem(_ls_auth_token_, localStorage.getItem(_ls_auth_token_))

const app = createApp(App);

      app.use(store)
      app.use(router)
      app.use(i18n, { local: "en" })

      app.mount("#app")