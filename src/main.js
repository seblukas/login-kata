import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as Promise from 'bluebird';
Vue.config.productionTip = false
Promise.config = {
  // Enable warnings
  warnings: true,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: true,
  // Enable async hooks
  asyncHooks: true,
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
