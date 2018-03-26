<template>
  <div class="container">
    <div class="recommend">
      <scroll class="recommend-content" :data="recommendList" ref="scroll">
        <div>
          <div class="slider-wrapper" v-if="slider.length">
            <slider>
              <div class="item" v-for="item in slider">
                <a href="#"><img :src="item.picUrl" @load="loadImage"></a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="title">精品推荐</h1>
            <book-list :books="recommendList" @select="selectItem"></book-list>
          </div>
        </div>
        <div class="loading-container" v-show="!recommendList.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import {ERR_OK} from 'common/js/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import BookList from 'base/book-list/book-list'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'

  export default {
    data: function () {
      return {
        slider: [],
        recommendList: []
      }
    },
    created: function () {
      this._getSilder()
      this._recommendList()
    },
    methods: {
      // 有图片加载成功触发
      loadImage: function () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      // 显示选中的书详情
      selectItem: function (book) {
        this.setSelectBook(book)
      },
      // 获取轮播图片
      _getSilder: function () {
        this.$http.get('/api/slider').then(function (res) {
          res = res.body
          if (res.code === ERR_OK) {
            this.slider = res.data
          }
        })
      },
      // 获取精品推荐
      _recommendList: function () {
        this.$http.get('/api/recommend').then(function (res) {
          res = res.body
          if (res.code === ERR_OK) {
            this.recommendList = res.data
          }
        })
      },
      ...mapMutations({
        setSelectBook: 'SET_SELECT_BOOK'
      })
    },
    components: {
      Slider,
      Scroll,
      BookList,
      Loading
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";

  .recommend {
    position: absolute;
    top: 88px;
    bottom: 0;
    width: 100%;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list {
        .title {
          height: 64px;
          line-height: 64px;
          text-align: center;
          font-size: $font-size-base;
          color: #212121;
        }
      }
      .loading-container {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
      }
    }
  }
</style>
