<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/sort">
      <span class="tab-link">分类</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";

  .tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-base;
    .tab-item {
      flex: 1;
      text-align: center;
      .tab-link {
        display: block;
        height: 42px;
        color: $link-color;
      }
      &.active .tab-link {
        color: $link-hover-color;
        border-bottom: 2px solid $link-hover-color;
      }
    }
  }
</style>
