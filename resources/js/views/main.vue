<template>
  <div class="container">
    <router-link :to="{ name: 'Values' }"
                  class="box">
      <i-icon name="database" />
      <h3>{{ __("Data") }}</h3>
    </router-link>
    <router-link  :to="{
                    name: 'GameList',
                  }"

                  class="box">
      <i-icon name="tic-tac-toe" />
      <h3>{{ __("Games") }}</h3>
    </router-link>
    <a  href="#"
        
        @click.prevent="logoutHandler">
      <i-icon name="logout" />
      <h3>{{ __("Logout") }}</h3>
    </a>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import IIcon from '@components/i-icon'

export default {
  components: { 
    IIcon,
  },
  setup() {

    const $store = useStore()
    const $router = useRouter()
    
    const logoutHandler = async () => {
      $store.dispatch('doLoading', true)

      const response = await $store.dispatch('account/doLogout')
      if (response.status == 204) {
        $router.push({ name: 'Auth' })

        $store.dispatch('doLoading', false)
      }
    }

    return {
      logoutHandler,
    }
  },
}
</script>

<style scoped lang="scss">

  .container {
    flex: 0 0 100%;

    gap: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    width: 100%;
    max-width: 100%;

    a {
      gap: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      width: 100%;
      height: 220px;
      max-width: 220px;

      padding: 30px;

      opacity: .75;
      
      transition: opacity .3s, transform .15s;

      transform: scale(.95);

      svg {
        width: 45px;
        height: 45px;

        color: #ff2d20;
      }

      h3 {
        margin: 0;

        color: #333;
        font-size: 30px;
      }

      &:hover {
        opacity: 1;

        transform: scale(1);
      }

    }

  }

</style>