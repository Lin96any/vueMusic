import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import rem from 'utials/rem';
rem(750)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
