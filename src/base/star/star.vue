<template>
  <div class="star" :class="starType">
    <span v-for="star in stars" class="star-item" :class="star"></span>
  </div>
</template>

<script>
  var LENGTH = 5 // 星的长度
  // 星的状态
  var ON = 'on'
  var HALF = 'half'
  var OFF = 'off'

  export default {
    props: {
      score: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 36
      }
    },
    computed: {
      starType: function () {
        return 'star-' + this.size
      },
      stars: function () {
        var result = []
        var score = Math.floor(this.score * 2) / 2
        var hasDecimal = score % 1 !== 0
        var integer = Math.floor(score)
        for (var i = 0; i < integer; i++) {
          result.push(ON)
        }
        if (hasDecimal) {
          result.push(HALF)
        }
        while (result.length < LENGTH) {
          result.push(OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/mixins";
  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &.on {
          @include background-image("star36_on");
        }
        &.half {
          @include background-image("star36_half")
        }
        &.off {
          @include background-image("star36_off")
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &.on {
          @include background-image("star24_on");
        }
        &.half {
          @include background-image("star24_half")
        }
        &.off {
          @include background-image("star24_off")
        }
      }
    }
  }
</style>
