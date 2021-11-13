import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局的一个引入
import './assets/css/reset.less'
// 引入阿里的图标库 css文件
import './assets/fonts/iconfont.css'
// 全局导入axios配置，加入到vue原型上
import axios from 'axios'
axios.defaults.baseURL='http://www.tangxiaoyang.vip:8888/api/v2/';
Vue.config.productionTip = false;
Vue.prototype.$http=axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
