<template>
  <div class="result">
    <ul class="result-box" v-show="resultList.length > 0">
      <li class="item" v-for="(item, index) in resultList" :key="index">
        <div class="row">
          <i class="icon" :class="statusIcon(index)"></i>
          <div class="context">
            <p>{{ item.time }}</p>
            <p>{{ item.context }}</p>
          </div>
        </div>
      </li>
    </ul>
    <no-result v-show="noResult && !resultList.length" text="该单号暂无物流进展，请稍后再试，或检查公司和单号是否有误"></no-result>
  </div>
</template>

<script>
import NoResult from 'components/no-result/no-result'

export default {
  props: {
    resultList: {
      type: Array,
      default () {
        return []
      }
    },
    noResult: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    statusIcon (index) {
      return index === 0 ? 'icon-end' : index === this.resultList.length - 1 ? 'icon-start' : 'icon-step'
    }
  },
  components: {
    NoResult
  }
}
</script>

<style lang="scss" type="text/css">
  .result-box {
    display: table;
    padding: 0;
    margin: 15px 0;
    > .item {
      position: relative;
      > .row {
        padding: 8px 10px;
        margin-left: 15px;
        border-left: 1px solid #d2d2d2;
        > .icon {
          position: absolute;
          left: 5px;
          top: 50%;
          width: 21px;
          height: 21px;
          margin-top: -10px;
          background-color: #fff;
          background-repeat: no-repeat;
          @at-root #{&}-start {
            background-image: url('icon-start.png');
          }
          @at-root #{&}-step {
            background-image: url('icon-step.png');
          }
          @at-root #{&}-end {
            background-image: url('icon-end.png');
          }
        }
        > .context {
          padding-left: 15px;
          > p {
            padding-top: 5px;
          }
        }
      }
      &:first-child > .row:before,
      &:last-child > .row:before {
        content: '';
        position: absolute;
        left: 0;
        width: 21px;
        background-color: #fff;
      }
      &:first-child {
        color: #ff7800;
        > .row:before {
          top: 0;
          height: 48px;
        }
      }
      &:last-child > .row:before {
        bottom: 0;
        height: 44px;
      }
      &:only-child > .row {
        border-left-color: #fff;
      }
    }
  }
</style>
