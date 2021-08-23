<template>
  <ul v-if="value.length"
      
      class="form-error">
    <li v-if="typeof value == 'string'">{{ value }}</li>
    <template v-else>
      <li v-for="(datum, index) in value"
          
          :key="index">
        {{ datum }}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      default: [],
      type: [Array, String],
    },
  },
}
</script>

<style scoped lang="scss">

  .form-error {
    padding: 0;
    margin: 5px 0 0 0;

    list-style: none;

    li {
      font-size: 14px;
      color: #ff1f0f;
    }
  }

</style>