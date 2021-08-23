<template>
  <div class="game">
    <p-aside />
    <div class="game__play">
      <p-gameplay />
    </div>
  </div>
</template>


<script>

import IIcon from '@components/i-icon'

import PAside from './partials/p-aside' 
import PGameplay from './partials/p-gameplay'

export default {
  components: {
    IIcon,

    PAside,
    PGameplay,
  },
}

</script>

<style scoped lang="scss">

  .game {
    gap: 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;

    width: 100%;
    overflow: auto;
    max-width: 100vw;

    &__play {
      padding-bottom: 2px;
    }
  }

</style>