<template>
  <transition name="move">
    <div class="detail" v-show="!!selectBook.name">
      <b-header :showIcon="showIcon" @back="hide" text="图书详情"></b-header>
      <scroll class="detail-content">
        <div>
          <div class="book-data">
            <div class="icon">
              <img :src="selectBook.picUrl" :alt="selectBook.name">
            </div>
            <div class="content">
              <h2 class="name">{{ selectBook.name }}</h2>
              <p class="author">{{ selectBook.author }}</p>
              <star :score="selectBook.score" :size="36"></star>
              <p class="price"><span class="now">￥{{ selectBook.price }}</span><span class="old" v-if="selectBook.oldPrice">￥{{ selectBook.oldPrice }}</span></p>
            </div>
          </div>
          <div class="book-detail">
            <h2 class="title">简介</h2>
            <p class="info">{{ selectBook.info }}</p>
          </div>
          <div class="book-comments">
            <h2 class="title">评论</h2>
            <ratings :ratings="selectBook.ratings"></ratings>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Star from 'base/star/star'
  import BHeader from 'components/header/header'
  import Ratings from 'components/ratings/ratings'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    props: {
      book: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data: function () {
      return {
        showIcon: true
      }
    },
    computed: {
      ...mapGetters([
        'selectBook'
      ])
    },
    methods: {
      // 隐藏图书详情
      hide: function () {
        this.setSelectBook({})
      },
      ...mapMutations({
        setSelectBook: 'SET_SELECT_BOOK'
      })
    },
    components: {
      Scroll,
      Star,
      BHeader,
      Ratings
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";
  @import "~common/sass/mixins";

  .detail {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transform: translateX(0);
    &.move-enter-active, &.move-leave-active {
      transition: all .2s linear;
    }
    &.move-enter, &.move-leave-to {
      transform: translateX(100%);
    }
    .detail-content {
      position: fixed;
      top: 45px;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      .book-data {
        display: flex;
        padding: 18px;
        .icon {
          flex: 0 0 78px;
          width: 78px;
          margin-right: 18px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, .15);
          > img {
            display: block;
            width: 100%;
          }
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-base;
          color: #999;
          .name {
            @include no-wrap();
            color: #333;
          }
          .name, .author {
            margin-bottom: 8px;
          }
          .price {
            .now {
              margin-right: 8px;
              color: $link-hover-color;
            }
            .old {
              text-decoration: line-through;
            }
          }
        }
      }
      .book-detail, .book-comments {
        padding: 15px;
        font-size: $font-size-base;
        .title {
          height: 20px;
          line-height: 20px;
          margin-bottom: 8px;
          padding-left: 6px;
          border-left: 2px solid $brand-primary;
        }
      }
      .book-detail .info {
        line-height: 20px;
        font-size: $font-size-small;
        color: #666;
      }
    }
  }
</style>
