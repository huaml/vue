<template>
  <div class="tips" v-show="showFlag">
    <p class="tips-text">{{ text }}</p>
    <a class="close" href="javascript:void(0)" @click="hide"></a>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
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
    }
  }
}
</script>

<style lang="scss" type="text/css">
  .tips {
    padding: 15px 35px 15px 15px;
    margin-top: 10px;
    font-size: 16px;
    color: #ff7800;
    border: 1px solid #eee;
    border-radius: 3px;
    background-color: #f6f6f6;
    > .tips-text {
      padding-left: 20px;
      background: url('../../common/image/tips.png') 0 50% no-repeat;
    }
    > .close {
      position: relative;
      top: -18px;
      right: -20px;
      float: right;
      width: 16px;
      height: 16px;
      background-image: url('../../common/image/close.png');
      background-repeat: no-repeat;
      &:hover {
        background-image: url('../../common/image/close-hover.png');
      }
    }
  }
</style>
