<template>
<div  :class="{
          confirm: true,
          'confirm--zoom': zoom,
          'confirm--show': payload.show,
        }"
      
        @click="closeHandler">
    <main @click.stop>
      <h4>{{ __(payload?.title) }}</h4>
      <section v-if="payload?.content">
        <slot name="content"></slot>
        {{ __(payload?.content) }}
      </section>
      <footer>
        <button class="success small"
                
                @click="() => closeHandler('success')">
          {{ __(payload?.labels?.success) }}
        </button>
        <button class="danger small"
                
                @click="() => closeHandler('reject')">
          {{ __(payload?.labels?.reject) }}
        </button>
      </footer>
    </main>
  </div>
</template>

<script>

import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

import { useStore } from 'vuex'

import IIcon from '@components/i-icon'

export default {
  components: {
    IIcon,
  },
  setup() {

    const $store = useStore()

    const root = ref(null)
    const zoom = ref(false)

    const payload = computed(() => $store.getters['getConfirm'])

    $store.subscribe(mutation => {
      if (mutation.type === 'setConfirm' && mutation.payload?.show) {
        zoom.value = true

        document.body.classList.add('no-scroll')
      }
    })

    watch(zoom, val => {
      if (!val)
        setTimeout(() => {
          $store.dispatch('doConfirm', false)
          
          document.body.classList.remove('no-scroll')
        }, 100)
    })

    onMounted(() => {
      window.addEventListener('keydown', keydownHandler)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', keydownHandler)
    })

    function keydownHandler(event) {
      if (zoom.value) {
        const { key } = event

        if (key == 'Escape') closeHandler('reject')
        if (key == 'Enter') closeHandler('success')
      }
    }

    const closeHandler = type => {
      zoom.value = false

      if (typeof payload.value?.on[type] === 'function')
        payload.value?.on[type]()
    }

    return {
      root,
      zoom,
      payload,

      closeHandler,
    }
  },
}
</script>

<style scoped lang="scss">

  .confirm {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    position: fixed;
    transform: translateX(100%);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    padding: 15px;

    background-color: rgba(0, 0, 0, 0.2);

    opacity: 0;
    pointer-events: none;

    transition: opacity .3s;

    &--show {
      transform: translateX(0);

      opacity: 1;
      pointer-events: auto;
    }

    h4 {
      margin: 0;

      font-size: 14px;

      @media screen and (min-width: 768px) {
        font-size: 20px;
      }
    }

    main {
      transform: scale(.5);

      width: 100%;
      max-width: 420px;

      padding: 15px;

      border-radius: 5px;
      background-color: white;

      transition: transform .2s;

      text-align: center;

      section {
        margin-top: 20px;
      }
    }

    &--zoom {
      main {
        transform: scale(1);
      }
    }

    footer {
      gap: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 20px;
    }
  }

</style>