<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" type="text" v-model="query" :placeholder="placeholder">
    <i class="icon-close" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '书名、作者'
      }
    },
    data: function () {
      return {
        query: ''
      }
    },
    created: function () {
      var debounce = function (func, delay) {
        var timer
        return function () {
          var _this = this
          var args = arguments
          clearTimeout(timer)
          timer = setTimeout(function () {
            func.apply(_this, args)
          }, delay)
        }
      }
      var _this = this
      this.$watch('query', debounce(function (newQuery) {
        _this.$emit('query', newQuery)
      }, 200))
    },
    methods: {
      // 搜索
      setQuery: function (query) {
        this.query = query
      },
      // 清空搜索
      clear: function () {
        this.query = ''
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";

  .search-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    padding: 0 6px;
    border: 1px solid #eee;
    border-radius: 4px;
    .icon-search {
      font-size: $font-size-base-x;
      color: $link-color;
    }
    .box {
      flex: 1;
      margin: 0 6px;
      line-height: 18px;
      font-size: $font-size-base;
      color: #666;
    }
    .icon-close {
      font-size: $font-size-large;
      color: $link-color;
    }
  }
</style>
