import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eVueEsrimapjs from './../packages/index.js'
import 'font-awesome/css/font-awesome.css';
Vue.use(eVueEsrimapjs)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
