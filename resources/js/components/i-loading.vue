<template>
  <div :class="{
    loading: true,
    'loading--show': $store.getters['getLoading'],
  }">
    <span v-if="$store.getters['getLoading'] || show"
          
          class="content">
      <span v-for="(icon, index) in matrix"
            
            :key="index"
            :class="[
              'icon',
              `state--${icon.state}`,
            ]">
        <i-icon :name="icon.name" />
      </span>
    </span>
  </div>
</template>

<script>

import { ref } from 'vue'

import IIcon from '@components/i-icon'

export default {
  components: { 
    IIcon,
  },
  props: {
    show: Boolean,
  },
  setup() {
    
    const matrix = ref([
      {
        state: 0,
        name: "circle",
      },
      {
        state: 0,
        name: "cancel",
      },
      {
        state: 0,
        name: "cancel",
      },
      {
        state: 0,
        name: "circle",
      },
    ])

    let index = 0;
    let state = 1;
    setInterval(() => {
      if (matrix.value[index])
        matrix.value[index].state = state

      index++

      if (index > matrix.value.length) {
        index = 0

        if (state)
          state = 0
        else
          state = 1
      }
      
    }, 200)

    setInterval(() => {
      const random = [...matrix.value]
      matrix.value = []

      random.forEach((icon, index) => {
        random[index].name = ["cancel", "circle"][Math.round(Math.random())]
      })
      
      setTimeout(() => {
        matrix.value = [...random]
      }, 1)
    }, 2000)
    
    return {
      matrix,
    }
  },
}
</script>

<style scoped lang="scss">

  .loading {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    position: fixed;
    transform: translateX(-100%);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.2);

    opacity: 0;
    pointer-events: none;

    transition: opacity .3s;

    &--show {
      transform: translateX(0);

      opacity: 1;
      pointer-events: auto;
    }

    .content {
      max-width: 300px;

      color: white;

      .icon {
        transition: transform .3s;

        &.state--0 {
          transform: scale(0);
        }

        &.state--1 {
          transform: scale(1);
        }
      }

      .svg {
        width: 50px;
        height: 50px;

        animation-duration: 1s;
        animation-name: RotateLoading;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier;
      }
      
    }

    .content {
      gap: 10px;
      display: grid;
      align-items: center;
      justify-content: center;
      grid-template-columns: repeat(2, 30px);

      .svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  @keyframes RotateLoading {
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(360deg);
    }
  }

</style>