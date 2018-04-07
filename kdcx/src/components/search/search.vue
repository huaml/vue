<template>
  <div class="search">
    <div class="search-box">
      <a href="javascript:void(0)" class="btn" title="切换快递公司" @click="toggleCompany">
        <img src="https://cdn.kuaidi100.com/images/sz/default.png" data-code="default" ref="companyImg">
        <span class="caret"></span>
      </a>
      <input type="text" class="inp-search" v-model="postid" @click="loadStorage" placeholder="请输入快递单号" autocomplete="off" maxlength="100">
      <a class="btn-search" @click="search" data-code="default" href="javascript:void(0)">查询</a>
    </div>
    <suggest :suggestList="suggestList" @changeCode="changeCompany" @remove="loadStorage" @query="search" ref="suggest"></suggest>
    <company ref="company" @change="changeCompany" @shortName="queryShortName"></company>
    <tips text="请输入快递单号" ref="tips"></tips>
    <loading v-show="iconLoading && !resultList.length && !noResult" text="正在查询，请稍候......"></loading>
    <result :resultList="resultList" :noResult="noResult"></result>
  </div>
</template>

<script>
import {autonumber} from 'api/autonumber'
import {query} from 'api/query'
import {getData} from 'common/js/dom'
import {saveToLocalStorage, loadFromLocalStorage} from 'common/js/cache'
import Suggest from 'components/suggest/suggest'
import Company from 'components/company/company'
import Tips from 'components/tips/tips'
import Loading from 'components/loading/loading'
import Result from 'components/result/result'

const ERR_OK = 'ok'
const MINAUTONUMBER = 5
const DEFAULT = 'default'

export default {
  data () {
    return {
      suggestList: {},
      companyList: [],
      resultList: [],
      postid: '',
      iconLoading: false,
      noResult: false,
      isLoadStorage: false
    }
  },
  methods: {
    // 快递单号查询
    search (newCode, newPostid, newName) {
      this.$refs.company.hide()
      this.$refs.suggest.hide()
      this.resultList = []
      // console.log(newPostid)
      if (newPostid !== undefined) {
        this.postid = newPostid
        this.isLoadStorage = true
      }
      if (this.postid === '') {
        this.$refs.tips.show()
        return
      }
      this.iconLoading = true
      this.noResult = false
      this.$refs.tips.hide()
      let type = getData(this.$refs.companyImg, 'code')
      if (typeof newCode === 'string') {
        type = newCode
      }
      if (newName === undefined) {
        newName = getData(this.$refs.companyImg, 'name')
      }
      console.log('type=' + type)
      // console.log(newName)
      query(type, this.postid).then((res) => {
        if (res.message === ERR_OK) {
          this.resultList = res.data
          this.iconLoading = false
          this.isLoadStorage = false
          console.log(this.resultList)
          // 把搜索记录保存到本地存储中
          saveToLocalStorage(type, this.postid, newName)
        } else {
          this.noResult = true
        }
      })
    },
    // 调用子组件方法显示隐藏快递公司选择列表
    toggleCompany () {
      this.$refs.suggest.hide()
      this.$refs.company.toggleCompany()
    },
    // 切换快递公司
    changeCompany (number, name) {
      const url = 'https://cdn.kuaidi100.com/images'
      if (number === DEFAULT) {
        this.$refs.companyImg.src = url + '/sz/' + number + '.png'
      } else {
        this.$refs.companyImg.src = url + '/all/56/' + number + '.png'
      }
      getData(this.$refs.companyImg, 'code', number)
      getData(this.$refs.companyImg, 'name', name)
    },
    // 读取本地存储中的搜索记录
    loadStorage () {
      if (this.postid === '') {
        this.suggestList = loadFromLocalStorage()
        if (this.suggestList.auto) {
          if (this.suggestList.auto.length > 0) {
            this.$refs.company.hide()
            this.$refs.suggest.show()
            this.$refs.tips.hide()
          } else {
            this.$refs.suggest.hide()
          }
        } else {
          this.$refs.suggest.hide()
        }
      }
    },
    queryShortName (company) {
      this.companyList = company
    },
    // 清空本地存储搜索记录信息
    removeLocalStorage (newStr) {
      this.suggestList = newStr
      this.$refs.suggest.hide()
    },
    // 根据输入的单号智能识别快递公司
    _getAutoNumber (number) {
      autonumber(number).then((res) => {
        // console.log(number)
        this.$refs.suggest.hide()
        if (res.auto.length > 0) {
          this.suggestList = res
          this.suggestList.auto.forEach((arr) => {
            this.companyList.forEach((item) => {
              item.rows.forEach((val) => {
                val.items.forEach((str) => {
                  if (arr.comCode === str.number) {
                    arr.shortName = str.shortName
                  }
                })
              })
            })
          })
          console.log(this.suggestList)
          this.$refs.suggest.show()
        }
      })
    }
  },
  watch: {
    postid (newPostid) {
      this.$refs.suggest.hide()
      if (newPostid.length >= MINAUTONUMBER && !this.isLoadStorage) {
        this._getAutoNumber(newPostid)
      }
    }
  },
  components: {
    Suggest,
    Company,
    Tips,
    Loading,
    Result
  }
}
</script>

<style lang="scss" type="text/css">
  .search {
    position: relative;
    width: 920px;
    margin: 0 auto;
    > .search-box {
      font-size: 0;
      > .btn {
        position: relative;
        display: inline-block;
        padding: 2px;
        vertical-align: top;
        border: 1px solid #d2d2d2;
        > img {
          width: 56px;
          height: 56px;
        }
        > .caret {
          position: absolute;
          right: 3px;
          bottom: 4px;
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 5px dashed #4288e6;
          border-top: 5px solid #4288e6\9;
          border-right: 5px solid transparent;
          border-left: 5px solid transparent;
        }
        &:hover > .caret {
          border-top-color: #f26100;
        }
      }
      > .inp-search {
        width: 658px;
        height: 40px;
        padding: 10px;
        line-height: 40px;
        vertical-align: top;
        font-size: 20px;
        border: 1px solid #d2d2d2;
        border-right: none;
        border-left: none;
        outline: none;
      }
      > .btn-search {
        display: inline-block;
        width: 180px;
        height: 62px;
        line-height: 62px;
        letter-spacing: 2px;
        text-align: center;
        vertical-align: top;
        font-size: 20px;
        color: #fff;
        background-color: #ff7800;
        cursor: pointer;
        &:hover {
          background-color: #ff961e;
        }
      }
    }
    .loading {
      margin: 20px 0;
    }
  }
</style>
