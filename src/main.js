import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

/* vue-lazyload */
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  preLoad: 1.3,
  attempt: 2,
  loading: require('assets/images/default.jpg'), // 预加载图片
})

/* rem适配 */
import rem from 'utials/rem';
rem(750)

/* 全局样式 */
import 'assets/scss/global.scss'

/* FastCick */
import fastclick from 'fastclick';
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
