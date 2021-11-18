<template>
  <!-- 绘制Header界面 -->
  <el-container>
    <el-header>
      <div class="leftHeader">
        <img src="../assets/imgs/purchase.png" class="leftImg" />
        <span>供应链管理系统</span>
      </div>
      <div class="rightHeader">
        <span class="rightspan">欢迎您：{{ userInfo.username }}</span>
        <el-button type="danger" size="mini" @click="loginout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollaps ? '64px' :'200px'">
        <!-- 绑定状态取反点击事件 -->
        <div class="toggle" @click="isCollaps = !isCollaps">|||</div>
        <!-- 左侧菜单界面  获取当前路由的路径并保持激活 -->
        <el-menu
        unique-opened
        router   
        :default-active="$route.path"  
        :collapse="isCollaps"
        :collapse-transition="false"
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <!-- obj[]取出字符串里的对象的属性值 -->
              <i :class="iconObj[item.id]"></i>
              <span class="authName">{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>{{subItem.authName}}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getUserInfo();
    this.getMenuList();
    
  },
  data() {
    return {
      isCollaps:false,
      useInfo: null,
      menuList:[],
      // 菜单的图标样式
      iconObj:{
        '201':'iconfont icon-shouye',
        '125':'iconfont icon-users',
        '101':'iconfont icon-tijikongjian',
        '103':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
      }
    };
  },
  methods: {
    // 注销按钮
    loginout() {
      this.$confirm("是否退出该用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 用户注销登录时，清除sessionStorage，跳转路由
          sessionStorage.clear();
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 获取用户信息
    getUserInfo() {
      // 获取当前登录用户的信息,获取到的是对象，需要转换为JSON数据解析
      return (this.userInfo = JSON.parse(sessionStorage.getItem("userInfo")));
    },
    // 获取左边菜单信息
 async getMenuList(){
      // 发送获取菜单请求，要带上token
    const {data:res}=await this.$http.get('menus');
    if(res.meta.status !== 200){
     return this.$message.error(res.meta.msg)
    }
  //  console.log(res.data)
      return this.menuList=res.data;
    }
  },
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>