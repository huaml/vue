<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="chageQuery" ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper">
      <scroll class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h2 class="title">热门搜索</h2>
            <ul>
              <li class="item" v-for="item in hotkey" @click="addQuery(item)">{{ item }}</li>
            </ul>
          </div>
          <div class="history" v-show="history.length">
            <h2 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h2>
            <search-list :history="history" @select="addQuery" @delete="deleteHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <scroll class="search-result" :data="result" v-show="query">
      <book-list :books="result" @select="selectItem"></book-list>
      <loading text="" v-show="!result.length"></loading>
    </scroll>
    <confirm ref="confirm" text="是否清空所有搜索历史?" confirmBtnText="清空" @confirm="clearHistory"></confirm>
  </div>
</template>

<script>
  import {ERR_OK} from 'common/js/config'
  import {saveStorage, loadStorage, deleteStorage, clearStorage} from 'common/js/storage'
  import SearchBox from 'base/search-box/search-box'
  import BookList from 'base/book-list/book-list'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import SearchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import {mapMutations} from 'vuex'

  export default {
    data: function () {
      return {
        hotkey: [],
        result: [],
        query: '',
        history: (function () {
          return loadStorage([])
        })()
      }
    },
    computed: {
      shortcut: function () {
        return this.hotkey.concat(this.history)
      }
    },
    created: function () {
      this._getHotkey()
    },
    methods: {
      // 点击热门关键字搜索
      addQuery: function (query) {
        this.$refs.searchBox.setQuery(query)
      },
      // 搜索
      chageQuery: function (query) {
        this.query = query
        // 清空数据并延迟获取搜索结果，模拟异步请求结果
        this.result = []
        var _this = this
        setTimeout(function () {
          _this._getResult()
        }, 1000)
        // 保存搜索历史到本地存储
        if (this.query) {
          saveStorage(this.query, 15)
        }
        this.history = loadStorage([])
      },
      // 显示选中的书详情
      selectItem: function (book) {
        this.setSelectBook(book)
      },
      // 删除搜索历史记录
      deleteHistory: function (item) {
        this.history = deleteStorage(item)
      },
      // 清空所有搜索历史记录
      clearHistory: function () {
        this.history = clearStorage()
      },
      // 清空所有搜索历史记录提示
      showConfirm: function () {
        this.$refs.confirm.show()
      },
      // 获取热门搜索关键字
      _getHotkey: function () {
        this.$http.get('/api/hotkey').then(function (res) {
          res = res.body
          if (res.code === ERR_OK) {
            this.hotkey = res.data
          }
        })
      },
      // 获取搜索结果
      _getResult: function () {
        this.$http.get('/api/result').then(function (res) {
          res = res.body
          if (res.code === ERR_OK) {
            this.result = res.data.books
            console.log(this.result)
          }
        })
      },
      ...mapMutations({
        setSelectBook: 'SET_SELECT_BOOK'
      })
    },
    components: {
      SearchBox,
      BookList,
      Loading,
      Scroll,
      SearchList,
      Confirm
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";
  @import "~common/sass/mixins";

  .search {
    .search-box-wrapper {
      margin: 18px;
    }
    .shortcut-wrapper {
      position: fixed;
      top: 160px;
      bottom: 0;
      width: 100%;
      .shortcut {
        height: 100%;
        overflow: hidden;
        .hot-key {
          margin: 0 18px 18px;
          .title {
            margin-bottom: 18px;
            font-size: $font-size-base;
          }
          .item {
            display: inline-block;
            margin: 0 18px 10px 0;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: $font-size-base;
            color: #333;
            background-color: #eee;
          }
        }
        .history {
          margin: 10px 18px 18px;
          .title {
            display: flex;
            align-items: center;
            height: 40px;
            font-size: $font-size-base;
            .text {
              flex: 1;
            }
            .clear {
              @include click();
              .icon-clear {
                font-size: $font-size-base;
                color: #999;
              }
            }
          }
        }
      }
    }
    .search-result {
      position: fixed;
      top: 160px;
      bottom: 0;
      width: 100%;
      background-color: $body-bg;
      overflow: hidden;
    }
  }
</style>
