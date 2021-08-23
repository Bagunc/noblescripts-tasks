<template>
  <div :class="{
      'sys-msg': true,
      'sys-msg--show': show,
      [`sys-msg--${type}`]: type,
    }">
    <header>
      <h4 v-if="title">{{ title }}</h4>
      <a  href="#"
          
          @click.prevent="() => $store.commit('hideSysMsg')">
        <i-icon name="cancel" />
      </a>
    </header>
    <p v-if="typeof value == 'string'">{{ value }}</p>
    <template v-else>
      <ul v-for="(error, index) in value"
          :key="index">
        <li v-for="(item, eindex) in error"
            
            :key="`${index}.${eindex}`">
          <span>{{ item }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>

import { computed } from '@vue/reactivity'

import { useStore } from 'vuex'

import IIcon from '@components/i-icon'

export default {
  components: {
    IIcon,
  },
  setup() {

    const $store = useStore()

    const show = computed(() => $store.getters['getSysMsg'].show)
    const type = computed(() => $store.getters['getSysMsg'].type)
    const title = computed(() => $store.getters['getSysMsg'].title)
    const value = computed(() => $store.getters['getSysMsg'].value)
    const timeout = computed(() => $store.getters['getSysMsg'].timeout)

    $store.subscribe(mutation => {
      switch (mutation.type) {
        case 'setSysMsg': {
          if (mutation.payload.show && timeout.value)
            setTimeout(() => $store.commit('hideSysMsg'), timeout.value)
            
          break
        }
      }
    })

    return {
      show,
      type,
      value,
      title,
      timeout,
    }
  },
}
</script>

<style scoped lang="scss">

  .sys-msg {
    top: 0;
    left: 50%;
    z-index: 100;
    position: fixed;
    transform: translate(-50%, calc(-100% - 20px));

    width: 100%;
    max-width: 420px;

    padding: 15px;

    border-radius: 5px;
    background-color: #dfdfdf;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .3);

    color: black;

    transition: transform .3s;

    &--show {
      transform: translate(-50%, 10px);
    }

    &--success {
      background-color: rgb(0, 180, 30);

      color: white;
    }

    &--danger {
      background-color: #ff1f0f;

      color: white;
    }

    header {
      gap: 10px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      a {
        flex: 0 0 15px;
        
        opacity: .75;

        transition: opacity .3s;
       
       .svg {
          width: 15px;
          height: 15px;

          transition: transform .3s;
        }

        &:hover {
          opacity: 1;

          .svg {
            transform: scale(1.05);
          }
        }
      }
    }

    h4 {
      margin: 0;

      font-size: 18px;
    }

    ul {
      padding: 0;
      margin: 15px 0 0 0;

      list-style: none;
    }

  }

</style>