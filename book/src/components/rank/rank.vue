<template>
  <div class="rank">
    <scroll class="rank-content">
      <book-list :books="ranks" :ranks="bookRanks" @select="selectItem"></book-list>
      <div class="loading-container" v-show="!ranks.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {ERR_OK} from 'common/js/config'
  import Scroll from 'base/scroll/scroll'
  import BookList from 'base/book-list/book-list'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'

  export default {
    data: function () {
      return {
        ranks: []
      }
    },
    created: function () {
      this._getRanks()
      this.bookRanks = true
    },
    methods: {
      // 显示选中的书详情
      selectItem: function (book) {
        this.setSelectBook(book)
      },
      // 获取排行数据
      _getRanks: function () {
        this.$http.get('/api/ranks').then(function (res) {
          res = res.body
          if (res.code === ERR_OK) {
            this.ranks = res.data
          }
        })
      },
      ...mapMutations({
        setSelectBook: 'SET_SELECT_BOOK'
      })
    },
    components: {
      Scroll,
      BookList,
      Loading
    }
  }
</script>

<style lang="scss" type="text/css">
  .rank {
    position: absolute;
    top: 88px;
    right: 0;
    bottom: 0;
    left: 0;
    .rank-content {
      height: 100%;
      overflow: hidden;
      .book-list {
        padding-top: 18px;
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
