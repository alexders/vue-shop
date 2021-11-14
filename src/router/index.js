import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置路由的时候也要将vue文件导入
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'login',
    component: ()=>import('@/components/Login.vue')
  },
  {
    path:'/home',
    name:'home',
    redirect:'/welcome',
    component:()=>import('@/components/Home.vue'),
    children:[
      {
        path:'/welcome',
        name:'welcome',
        component:()=>import('@/components/index/Welcome.vue'),
      },
      {
        path:'/users',
        name:'user',
        component:()=>import('@/components/user/User.vue')
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
