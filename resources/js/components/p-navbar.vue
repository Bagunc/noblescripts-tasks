<template>
  <nav  v-if="$route.meta.nav"
        
        class="navigation">
    <router-link  v-for="link in $route.meta.nav"

                  :key="link"
                  :to="link.to"
                  
                  :class="{
                    button: true,
                    'has-icon': link.icon,
                    [link.theme]: link.theme,
                  }">
      <i-icon :name="link.icon" />
      {{ __(link.label) }}
    </router-link>
  </nav>
  <h1 v-if="$route.meta.title"
      
      class="heading">
    {{ __($route.meta.title) }}
  </h1>
</template>

<script>

import IIcon from '@components/i-icon'

export default {
  components: {
    IIcon,
  },
}
</script>

<style scoped lang="scss">

  .navigation {
    align-self: flex-start;

    gap: 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .heading {
    color: #333;
    font-weight: normal;
    text-transform: uppercase;

    margin: 0;
  }

</style>