<template>
  <ul class="book-list">
    <li class="book-list-item" v-for="(item, index) in books" @click="selectItem(item)">
      <div class="book-rank" v-if="ranks">{{ index + 1 }}</div>
      <div class="icon">
        <img v-lazy="item.picUrl" :alt="item.name">
      </div>
      <div class="text">
        <h2 class="name">{{ item.name }}</h2>
        <p class="author">{{ item.author }}</p>
        <p class="price"><span class="now">￥{{ item.price }}</span><span class="old" v-if="item.oldPrice">￥{{ item.oldPrice }}</span></p>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      books: {
        type: Array,
        default: []
      },
      ranks: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem: function (item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";
  @import "~common/sass/mixins";

  .book-list {
    .book-list-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 18px 18px 18px;
      .book-rank {
        flex: 0 0 20px;
        margin-right: 20px;
        text-align: center;
        color: $brand-primary;
      }
      .icon {
        flex: 0 0 66px;
        width: 66px;
        margin-right: 18px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, .15);
        > img {
          display: block;
          width: 100%;
        }
      }
      .text {
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
          margin-bottom: 10px;
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
  }
</style>
