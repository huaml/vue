<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: { // 派发 scroll 事件
        type: Number,
        default: 1
      },
      click: { // 是否可以点击
        type: Boolean,
        default: true
      },
      data: { // 数据发生变化时自动刷新
        type: Array,
        default: null
      },
      listenScroll: { // 是否监听滚动事件
        type: Boolean,
        default: false
      }
    },
    mounted: function () {
      var _this = this
      setTimeout(function () {
        _this._initScroll()
      }, 20)
    },
    methods: {
      // 初始化
      _initScroll: function () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        var _this = this
        if (this.listenScroll) {
          this.scroll.on('scroll', function (pos) {
            _this.$emit('scroll', pos)
          })
        }
      },
      // 刷新
      refresh: function () {
        this.scroll && this.scroll.refresh()
      },
      // 滚动到指定元素
      scrollToElement: function () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 数据发生变化刷新
      data: function () {
        var _this = this
        setTimeout(function () {
          _this.refresh()
        }, 20)
      }
    }
  }
</script>
