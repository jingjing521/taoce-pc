// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import IM from '../webIm.config'
console.log(IM);
Vue.use(IM)

import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/base.css'
import '@/style/header.css'
import '@/style/home.css'
import axios from 'axios';
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)


import { post, fetch, patch, put } from '@/utils/http'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
