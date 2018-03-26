<template>
  <div class="header">
    <div class="icon" v-show="showIcon" @click="hide">
      <i class="icon-arrow-lift"></i>
    </div>
    <h1 class="text">{{ text }}</h1>
  </div>
</template>

<script>
  export default {
    props: {
      showIcon: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: 'book'
      }
    },
    methods: {
      // 返回
      hide: function () {
        this.$emit('back')
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";

  .header {
    position: relative;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: $brand-primary;
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 10px;
      .icon-arrow-lift {
        font-size: $font-size-base-x;
        color: $header-text-color;
      }
    }
    .text {
      font-size: $font-size-large;
      color: $header-text-color;
    }
  }
</style>
