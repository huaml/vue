<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li class="search-item" :key="item" v-for="item in history" @click="selectItem(item)">
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-close"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    props: {
      history: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      selectItem: function (item) {
        this.$emit('select', item)
      },
      deleteOne: function (item) {
        this.$emit('delete', item)
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";
  @import "~common/sass/mixins";

  .search-list {
    .search-item {
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      font-size: $font-size-base;
      &.list-enter-active, &.list-leave-active {
        transition: all .1s;
      }
      &.list-enter, &.list-leave-to {
        height: 0;
      }
      .text {
        flex: 1;
        color: $text-color;
      }
      .icon {
        @include click();
        .icon-close {
          color: #999;
        }
      }
    }
  }
</style>
