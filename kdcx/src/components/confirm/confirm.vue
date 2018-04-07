<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div class="confirm-header">
            <a href="javascript:void(0)" class="close" @click="hide">×</a>
            <h2 class="confirm-title">{{ title }}</h2>
          </div>
          <div class="confirm-body">{{ text }}</div>
          <div class="confirm-footer">
            <div class="btn btn-default" @click="cancel">{{ cancelBtnText }}</div>
            <div class="btn btn-primary" @click="confirm">{{ confirmBtnText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '确认信息'
    },
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" type="text/css">
  .confirm {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, .3);
    &.confirm-fade-enter-active {
      animation: confirm-fadein .3s;
      .confirm-content {
        animation: confirm-zoom .3s;
      }
    }
    > .confirm-wrapper {
      position: relative;
      width: 420px;
      margin: 10% auto 0;
      > .confirm-content {
        position: relative;
        background-color: #fff;
        border: 1px solid #d2d2d2;
        border-radius: 5px;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .3);
        background-clip: padding-box;
        > .confirm-header {
          padding: 12px;
          border-bottom: 1px solid #e5e5e5;
          > .close {
            float: right;
            font-size: 24px;
            font-weight: 700;
            line-height: 1;
            color: #000;
            opacity: .2;
            text-shadow: 0 1px 0 #fff;
            &:hover {
              color: #000;
              opacity: .5;
            }
          }
          > .confirm-title {
            font-weight: 500;
            font-size: 18px;
            color: #333;
          }
        }
        > .confirm-body {
          padding: 15px;
          text-align: center;
          font-size: 16px;
        }
        > .confirm-footer {
          padding: 15px;
          text-align: right;
          border-top: 1px solid #e5e5e5;
          > .btn {
            display: inline-block;
            padding: 6px 12px;
            font-size: 14px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            border: 1px solid transparent;
            border-radius: 4px;
            &+.btn {
              margin-left: 6px;
            }
            @at-root #{&}-default {
              border-color: #ccc;
              background-color: #fff;
            }
            @at-root #{&}-primary {
              color: #fff;
              border-color: #ff7800;
              background-color: #ff7800;
            }
            &:hover {
              opacity: .9;
            }
          }
        }
      }
    }
  }
  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }
  @keyframes confirm-zoom {
    0% {
      transform: scale(0);
    }
    50% {
      transition: scale(1.1);
    }
    100% {
      transition: scale(1);
    }
  }
</style>
