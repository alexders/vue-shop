import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局的一个引入
import './assets/css/reset.less'
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
