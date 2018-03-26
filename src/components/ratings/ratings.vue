<template>
  <div class="ratings-wrapper">
    <ul class="ratings" v-if="ratings && ratings.length">
      <li class="rating-item" v-for="item in ratings">
        <div class="avatar">
          <img width="36" height="36" :src="item.avatar" :alt="item.username">
        </div>
        <div class="content">
          <h2 class="name">{{ item.username }}</h2>
          <star :score="item.score" :size="24"></star>
          <p class="text">{{ item.text }}</p>
          <div class="time">{{ item.rateTime | formatDate }}</div>
        </div>
      </li>
    </ul>
    <div class="no-ratings" v-if="!ratings || !ratings.length">没有评论</div>
  </div>
</template>

<script>
  import {formatDate} from 'common/js/date'
  import Star from 'base/star/star'

  export default {
    props: {
      ratings: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    components: {
      Star
    },
    filters: {
      // 格式化时间
      formatDate: function (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  @import "~common/sass/variable";
  .ratings-wrapper {
    .ratings {
      .rating-item {
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border-bottom: none;
        }
        .avatar {
          flex: 0 0 36px;
          width: 36px;
          > img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          padding-left: 10px;
          .name {
            margin-bottom: 4px;
            font-size: $font-size-small-s;
            color: #333;
          }
          .star {
            margin-bottom: 2px;
          }
          .text {
            line-height: 20px;
            font-size: $font-size-small;
            color: #333;
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            font-size: $font-size-small-s;
            color: #999;
          }
        }
      }
    }
    .no-ratings {
      padding: 18px 0;
      text-align: center;
      font-size: $font-size-small-s;
      color: #999;
    }
  }
</style>
