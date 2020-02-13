import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

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
