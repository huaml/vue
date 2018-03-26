// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import 'common/sass/index.scss'

// 显式安装
Vue.use(VueResource)

Vue.use(VueLazyload, {
  loading: require('common/images/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 把store对象提供给“store”选项，这可以把store的实例注入所有的子组件
  store,
  template: '<App/>',
  components: { App }
})
