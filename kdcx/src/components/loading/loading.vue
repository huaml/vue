<template>
  <div class="loading">
    <img width="50" height="50" src="./loading.gif" :alt="text">
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '加载中......'
    }
  }
}
</script>

<style lang="scss" type="text/css">
  .loading {
    width: 100%;
    text-align: center;
    > .text {
      line-height: 20px;
      font-size: 12px;
      color: #666;
    }
  }
</style>
