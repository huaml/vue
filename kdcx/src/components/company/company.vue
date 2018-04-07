<template>
  <transition name="company-fade">
    <div class="company" v-show="showFlag">
      <ul :class="typeCls(index)" v-for="(group, index) in companyList" :key="index" v-show="companyList.length > 0">
        <li class="company-list-item" v-for="(row, index) in group.rows" :key="index">
          <span class="text title">{{ row.title }}</span>
          <a class="text item" href="javascript:void(0)" v-for="(item, index) in row.items" :key="index" :title="item.name" @click="changeCompany(item.number, item.shortName)">{{ item.shortName }}</a>
        </li>
      </ul>
      <loading v-show="!companyList.length"></loading>
    </div>
  </transition>
</template>

<script>
import {company} from 'api/company'
import Company from 'common/js/company'
import Loading from 'components/loading/loading'

const COMMON_NAME = '常用'
const COMPANY_KEY_LEGNTH = 3
const FIRST_DATA = 0

export default {
  data () {
    return {
      companyList: [],
      showFlag: false
    }
  },
  created () {
    this._getCompnay()
  },
  methods: {
    typeCls (index) {
      return parseInt(index) === FIRST_DATA ? 'common-list' : 'company-list'
    },
    // 隐藏快递公司选择列表
    hide () {
      this.showFlag = false
    },
    // 显示隐藏快递公司选择列表
    toggleCompany () {
      this.showFlag = !this.showFlag
    },
    // 切换快递公司
    changeCompany (number, name) {
      this.$emit('change', number, name)
      this.hide()
    },
    // 获取快递公司
    _getCompnay () {
      company().then((res) => {
        // 把返回的字符串中的单引号全部替换为双引号
        res = res.replace(/'/g, '"')
        // 获取第一个{的位置
        const firstIndex = res.indexOf('{')
        // 获取最后一个}的位置
        const lastIndex = res.lastIndexOf('}')
        // 提取{}中的字符串,包含{}
        res = res.substring(firstIndex, lastIndex + 1)
        // 把字符串转换为json对象
        res = JSON.parse(res)
        this.companyList = this._normalizeCompany(res.company)
        // console.log(this.companyList)
        this.$emit('shortName', this.companyList)
      })
    },
    // 处理成需要的快递公司数据
    _normalizeCompany (list) {
      let company = {
        common: {
          title: COMMON_NAME,
          items: []
        }
      }
      company.common.items.push(new Company({
        number: 'default',
        name: '智能识别',
        shortName: '智能识别'
      }))
      // 遍历数据
      list.forEach((item, index) => {
        // 提取15条数据作为常用
        const str = ['shunfeng', 'ems', 'youzhengguonei', 'huitongkuaidi', 'shentong', 'zhongtong', 'yuantong', 'yunda', 'tiantian', 'youshuwuliu', 'kuaijiesudi', 'quanfengkuaidi', 'jd', 'zhaijisong']
        str.forEach((value, i) => {
          if (item.number === value) {
            company.common.items.push(new Company({
              number: item.number,
              name: item.name,
              shortName: item.shortName
            }))
          }
        })
        // 提取number中的第一个位置的字符并转为大写作为key值
        const key = item.number.charAt(0).toUpperCase()
        if (!company[key]) {
          company[key] = {
            title: key,
            items: []
          }
        }
        // 取每个key值前三条数据
        if (company[key].items.length < COMPANY_KEY_LEGNTH) {
          company[key].items.push(new Company({
            number: item.number,
            name: item.name,
            shortName: item.shortName
          }))
        }
      })
      // 处理为有序列表
      let all = []
      let common = []
      for (let key in company) {
        let str = company[key]
        if (str.title.match(/[a-zA-Z]/)) {
          all.push(str)
        } else if (str.title === COMMON_NAME) {
          common.push(str)
        }
      }
      // 排序
      all.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // 把数据分组
      /* let result = []
      for (var i = 0; i < all.length; i += 9) {
        result.push(all.slice(i, i + 9))
      } */
      let group = {}
      common.forEach((item, index) => {
        const temp = 0
        group[temp] = {
          rows: []
        }
        group[temp].rows.push(item)
      })
      all.forEach((item, index) => {
        const temp = Math.floor(index / 9) + 1
        if (!group[temp]) {
          group[temp] = {
            rows: []
          }
        }
        group[temp].rows.push(item)
      })
      let result = []
      for (let key in group) {
        result.push(group[key])
      }
      // console.log(common.concat(all))
      return result
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="scss" type="text/css">
  .company {
    position: absolute;
    top: 70px;
    width: 100%;
    border: 1px solid #d2d2d2;
    background-color: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
    overflow: hidden;
    z-index: 99;
    &.company-fade-enter-active,
    &.company-fade-leave-active {
      transition: all .4s ease-in-out;
    }
    &.company-fade-enter,
    &.company-fade-leave-to {
      height: 0;
      border: none;
      opacity: 0;
    }
    > ul > li {
        font-size: 0;
        > a {
          color: #333;
        }
    }
    > .common-list {
      background-color: #d2e6ff;
      > .company-list-item {
        > .text {
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
        }
        > .title {
          width: 26px;
          padding: 4px 0;
          margin-right: 1px;
          line-height: 14px;
          text-align: center;
          color: #fff;
          background-color: #3278e6;
        }
        > .item {
          padding: 0 12px;
          &:hover {
            line-height: 36px;
            color: #fff;
            background-color: #78aaf0;
          }
        }
      }
    }
    > .company-list {
      float: left;
      width: 33.33333333%;
      > .company-list-item {
        &:nth-of-type(even) {
          background-color: #f5f5f5;
        }
        &:hover {
          background-color: #d2e6ff;
        }
        > .text {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          vertical-align: top;
        }
        > .title {
          width: 24px;
          text-align: center;
          font-size: 16px;
          color: #3278e6;
        }
        > .item {
          width: 84px;
          padding: 0 4px;
          font-size: 12px;
          overflow: hidden;
          &:hover {
            color: #3278e6;
          }
        }
      }
    }
  }
</style>
