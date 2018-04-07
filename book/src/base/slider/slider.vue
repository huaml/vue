<template>
  <div class="slider" ref="slider">
    <div class="slider-inner" ref="sliderInner">
      <slot></slot>
    </div>
    <ol class="slider-indicators">
      <li v-for="(item, index) in dots" :class="{'active': currentPageIndex === index}"></li>
    </ol>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      loop: { // 是否无缝轮播
        type: Boolean,
        default: true
      },
      autoPlay: { // 是否自动轮播
        type: Boolean,
        default: true
      },
      interval: { // 轮播间隔
        type: Number,
        default: 4000
      }
    },
    data: function () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted: function () {
      var _this = this
      setTimeout(function () {
        _this._setSliderWidth()
        _this._initDots()
        _this._initSlider()
        if (_this.autoPlay) {
          _this._play()
        }
      }, 20)
      // 监听窗口改变
      window.addEventListener('resize', function () {
        _this._setSliderWidth(true)
      })
    },
    methods: {
      // 设置宽度
      _setSliderWidth: function (isResize) {
        this.children = this.$refs.sliderInner.children
        var width = 0
        var sliderWidth = this.$refs.slider.clientWidth
        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i]
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderInner.style.width = width + 'px'
      },
      // 初始化轮播圆点
      _initDots: function () {
        this.dots = new Array(this.children.length)
      },
      // 初始化轮播
      _initSlider: function () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,        // 滚动方向
          scrollY: false,       // 滚动方向
          momentum: false,      // 是否开启拖动惯性
          snap: {
            loop: this.loop,   // 是否创建当前滚动元素子集的拷贝
            threshold: 0.3,    // 滑动的长度限制
            speed: 400         // 滑动速度
          }
        })
        var _this = this
        this.slider.on('scrollEnd', function () {
          var pageIndex = _this.slider.getCurrentPage().pageX
          if (_this.loop) {
            pageIndex -= 1
          }
          _this.currentPageIndex = pageIndex
          if (_this.autoPlay) {
            clearTimeout(_this.timer)
            _this._play()
          }
        })
      },
      // 自动播放
      _play: function () {
        var pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        } else {
          if (pageIndex >= this.children.length) {
            pageIndex = 0
          }
        }
        var _this = this
        this.timer = setTimeout(function () {
          _this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    activated: function () {
      if (this.autoPlay) {
        this._play()
      }
    },
    beforeDestroy: function () {
      clearTimeout(this.timer)
    },
    destroyed: function () {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="scss" type="text/css">
  .slider {
    min-height: 1px;
    .slider-inner {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .item {
        float: left;
        > a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
          > img {
            display: block;
            width: 100%;
          }
        }
      }
    }
    .slider-indicators {
      position: absolute;
      right: 0;
      bottom: 12px;
      left: 0;
      text-align: center;
      > li {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, .6);
        &.active {
          width: 16px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, .8);
        }
      }
    }
  }
</style>
