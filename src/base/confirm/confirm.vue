<template>
  <transition name="fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text"> {{ text }}</p>
          <div class="operate">
            <div class="operate-btn left" @click="hide">{{ cancelBtnText }}</div>
            <div class="operate-btn" @click="confirm">{{ confirmBtnText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data: function () {
      return {
        showFlag: false
      }
    },
    methods: {
      show: function () {
        this.showFlag = true
      },
      hide: function () {
        this.showFlag = false
      },
      confirm: function () {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";

  .confirm {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, .5);
    &.fade-enter-active {
      animation: fadein .3s;
      .confirm-content {
        animation: zoom .3s;
      }
    }
    .confirm-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      .confirm-content {
        width: 260px;
        border-radius: 10px;
        background-color: $body-bg;
        .text {
          padding: 20px 10px;
          line-height: 20px;
          text-align: center;
          font-size: $font-size-large;
          color: $text-color;
        }
        .operate {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: $font-size-large;
          .operate-btn {
            flex: 1;
            line-height: 20px;
            padding: 10px 0;
            border-top: 1px solid #eee;
            color: #666;
            &.left {
              border-right: 1px solid #eee;
            }
          }
        }
      }
    }
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1
    }
  }
  @keyframes zoom {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
