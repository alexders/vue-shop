<template>
  <!-- 绘制Header界面 -->
  <el-container>
    <el-header>
      <div class="leftHeader">
        <img src="../assets/imgs/purchase.png" class="leftImg">
        <span>供应链管理系统</span>
      </div>
      <div class="rightHeader">
          <span class="rightspan">欢迎您：{{userInfo.username}}</span>
          <el-button type="danger" size="mini" @click="loginout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {  
    this.getUserInfo();
     console.log(this.userInfo)
  },
  data() {
    return {
      useInfo: null,
    };
  },
  methods: {
    loginout(){
       this.$confirm('是否退出该用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 用户注销登录时，清除sessionStorage，跳转路由
          sessionStorage.clear();
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        }); 
    },
  getUserInfo(){
      // 获取当前登录用户的信息,获取到的是对象，需要转换为JSON数据解析
      return this.userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
   },
  },
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>