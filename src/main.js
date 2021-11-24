import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as Promise from 'bluebird';
Vue.config.productionTip = false
Promise.config({
  cancellation: true
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
