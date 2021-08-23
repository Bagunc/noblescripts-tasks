import store from '@/store/'

import locals from './local.json'

export function __ (text, values = []) {
  const { code } = store.getters.getLocal

  let val = text

  if (locals[text])
    if (locals[text][code])
      val = locals[text][code]

  if (typeof values === 'object' && values.length)
    values.forEach((v, i) => {
      val = val.replace(new RegExp(`\\{${i}\\}`, 'gi'), v)
    })

  return val;
}

export default {
  install: (app, options) => {
    app.config.globalProperties.__  = (text, values) => __(text, values)

    app.provide('i18n', options)
  }
}