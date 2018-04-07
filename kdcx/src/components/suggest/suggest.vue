<template>
  <div class="suggest">
    <div class="suggest-container" v-show="showFlag">
      <transition-group name="list" tag="ul">
        <li class="suggest-item" v-for="(item, index) in suggestList.auto" @click="changeCompany(item.comCode, item.num, item.shortName)" :key="index">
          <span v-if="suggestList.comCode">{{ item.num }}</span>
          <span v-else>{{ suggestList.num }}</span>
          <span v-if="item.shortName">{{ item.shortName }}</span>
          <span v-else>{{ item.comCode }}</span>
          <a v-if="suggestList.comCode" href="javascript:void(0)" class="close" @click.stop="deteleSearchLocalStorage(item.num)"></a>
        </li>
      </transition-group>
      <div class="tooltip search-tips" v-if="suggestList.comCode">
        最多保存最近十条查询记录。<a href="javascript:void(0)" class="delete" @click="showConfirm">全部清除</a>
      </div>
      <p class="tooltip suggest-tips" v-else>快递大数据为您提供智能识别</p>
    </div>
    <confirm ref="confirm" @confirm="removeSearchLocalStorage" text="是否清空所有查询历史？"></confirm>
  </div>
</template>

<script>
import {deteleLocalStorage, removeLocalStorage} from 'common/js/cache'
import Confirm from 'components/confirm/confirm'

export default {
  props: {
    suggestList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    changeCompany (code, num, name) {
      this.$emit('query', code, num, name)
      this.$emit('changeCode', code, name)
    },
    // 删除单条本地存储搜索记录信息
    deteleSearchLocalStorage (num) {
      deteleLocalStorage(num)
      this.$emit('remove')
    },
    // 清空本地存储搜索记录信息
    removeSearchLocalStorage () {
      removeLocalStorage()
      this.$emit('remove')
    },
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    showConfirm () {
      this.$refs.confirm.show()
    }
  },
  components: {
    Confirm
  }
}
</script>

<style lang="scss" type="text/css">
  .suggest-container {
    position: absolute;
    top: 61px;
    left: 61px;
    width: 677px;
    border: 1px solid #d2d2d2;
    background-color: #fff;
    z-index: 100;
    .suggest-item {
      height: 30px;
      line-height: 30px;
      color: #333;
      cursor: pointer;
      overflow: hidden;
      transition: color .2s linear;
      &.list-enter-active,
      &.list-leave-active {
        transition: all .2s linear;
      }
      &.list-enter,
      &.list-leave-to {
        height: 0;
      }
      &:hover {
        color: #d2d2d2;
      }
      > span {
        margin: 0 10px;
      }
      > .close {
        position: relative;
        float: right;
        width: 16px;
        height: 16px;
        margin-top: 6px;
        margin-right: 10px;
        background-image: url('../../common/image/close.png');
        background-repeat: no-repeat;
        &:hover {
          background-image: url('../../common/image/close-hover.png');
        }
        &:before {
          content: '';
          position: absolute;
          top: -4px;
          right: -4px;
          bottom: -4px;
          left: -4px;
        }
      }
    }
    > .tooltip {
      padding: 5px;
      font-size: 12px;
      color: #d2d2d2;
    }
    > .search-tips {
      padding-left: 10px;
      > .delete {
        float: right;
        text-indent: 13px;
        color: #999;
        background: url('delete.png') 0 50% no-repeat;
        &:hover {
          color: #4882cf;
          background-image: url('delete-hover.png');
        }
      }
    }
    > .suggest-tips {
      text-align: right;
    }
  }
</style>
