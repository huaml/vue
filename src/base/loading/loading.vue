<template>
  <div class="loading">
    <img width="32" height="32" src="./loading.gif" :alt="text">
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '正在加载...'
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";

  .loading {
    width: 100%;
    text-align: center;
    .text {
      line-height: 20px;
      font-size: $font-size-small;
      color: #666;
    }
  }
</style>
