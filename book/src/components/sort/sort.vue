<template>
  <div class="container">
    <div class="sort">
      <div class="sort-content">
        <scroll class="menu" :data="allbooks">
          <ul class="menu-list">
            <li class="menu-list-item" v-for="(item, index) in allbooks" :class="{'current': currentIndex === index}" @click="selectMenu(index)">{{ item.type }}</li>
          </ul>
        </scroll>
        <scroll class="content" :data="allbooks" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll" ref="content">
          <ul class="list">
            <li class="list-item" v-for="item in allbooks" ref="listItem">
              <h2 class="title">{{ item.type }}</h2>
              <book-list :books="item.books" @select="selectItem"></book-list>
            </li>
          </ul>
        </scroll>
        <div class="loading-container" v-show="!allbooks.length">
          <loading></loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ERR_OK} from 'common/js/config'
  import BookList from 'base/book-list/book-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'

  export default {
    data: function () {
      return {
        allbooks: [],
        currentIndex: 0,
        scrollY: 0
      }
    },
    created: function () {
      this._getAllbooks()
      this.listenScroll = true
      this.probeType = 3
    },
    methods: {
      // 选择左侧菜单，右侧内容滚动到相应位置
      selectMenu: function (index) {
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.content.scrollToElement(this.$refs.listItem[index], 0)
      },
      // 显示选中的书详情
      selectItem: function (book) {
        this.setSelectBook(book)
      },
      // 滚动的位置
      scroll: function (pos) {
        this.scrollY = pos.y
      },
      // 获取分类书数据
      _getAllbooks: function () {
        this.$http.get('/api/allbooks').then(function (res) {
          res = res.body
          if (res.code === ERR_OK) {
            this.allbooks = res.data
          }
        })
      },
      // 计算右侧列表每个分类的书的列表高度
      _calcHeight: function () {
        this.listHeight = []
        var list = this.$refs.listItem
        var height = 0
        this.listHeight.push(height)
        for (var i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.listHeight.push(height)
        }
      },
      ...mapMutations({
        setSelectBook: 'SET_SELECT_BOOK'
      })
    },
    watch: {
      allbooks: function () {
        var _this = this
        setTimeout(function () {
          _this._calcHeight()
        }, 20)
      },
      scrollY: function () {
        var listHeight = this.listHeight
        // 滚动到顶部
        if (this.scrollY > 0) {
          this.currentIndex = 0
          return
        }
        // 中间部分
        for (var i = 0; i < listHeight.length - 1; i++) {
          var height1 = listHeight[i]
          var height2 = listHeight[i + 1]
          if (-this.scrollY >= height1 && -this.scrollY < height2) {
            this.currentIndex = i
            return
          }
        }
        // 滚动到底部
        this.currentIndex = listHeight.length - 2
      }
    },
    components: {
      BookList,
      Scroll,
      Loading
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";

  .sort {
    position: absolute;
    top: 88px;
    bottom: 0;
    width: 100%;
    .sort-content {
      display: flex;
      height: 100%;
      overflow: hidden;
      .menu {
        flex: 0 0 70px;
        width: 70px;
        background-color: #fefefe;
        .menu-list-item {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: $font-size-small;
          &.current {
            font-size: $font-size-base;
            color: $link-hover-color;
          }
        }
      }
      .content {
        flex: 1;
        overflow: hidden;
        .title {
          height: 24px;
          line-height: 24px;
          margin-bottom: 18px;
          padding-left: 10px;
          border-left: 2px solid #efefef;
          font-size: $font-size-small;
          color: #666;
          background-color: #f9f9f9;
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
