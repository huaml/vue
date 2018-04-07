<template>
  <div class="no-result">
    <p class="no-result-text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="scss" type="text/css">
  .no-result {
    margin-top: 30px;
    text-align: center;
    font-size: 15px;
    color: #ff7800;
    > .no-result-text {
      display: inline-block;
      padding-left: 20px;
      background: url('../../common/image/tips.png') 0 50% no-repeat;
    }
  }
</style>
