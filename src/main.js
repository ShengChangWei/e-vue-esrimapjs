import Vue from 'vue'
import App from './App.vue'
import eVueEsrimapjs from './../packages/index.js'
import 'font-awesome/css/font-awesome.css';
Vue.use(eVueEsrimapjs)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
