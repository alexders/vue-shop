import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import router from './router'
// 全局的一个引入
import './assets/css/reset.less'
// 引入阿里的图标库 css文件
import './assets/fonts/iconfont.css'
// 全局导入axios配置，加入到vue原型上
import axios from 'axios'
// 设置默认的响应路径
axios.defaults.baseURL='http://www.tangxiaoyang.vip:8888/api/v2/';
Vue.config.productionTip = false;
Vue.prototype.$http=axios;

// 配置全局路由守卫
router.beforeEach((to,from,next)=>{
  // 如果访问的页面是登陆页，则直接放行
    if (to.path =='/login') {
      return next();
    }
    // 如果用户未登录，则跳转到登录页，读取sessionStorage的值，判断是否登陆
    const userinfo=JSON.parse(sessionStorage.getItem("userInfo"));
    if(!userinfo){
     return next('/login');  //return出去代码就不再执行了
    }else{
      next(); //用户已经登录了则放行
    }
}) 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')