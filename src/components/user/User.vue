<template>
  <!-- 面包屑导航 -->
  <div class="userContainer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户添加搜索栏 -->
    <el-card class="box-card">
      <div style="margin-top: 15px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-button
                slot="append"
                icon="el-icon-search"
              ></el-button> </el-input
          ></el-col>
          <el-col :span="4"
            ><el-button type="primary" class="addUser">
              添加用户</el-button
            ></el-col
          >
        </el-row>
      </div>
    </el-card>
    <!-- 添加用户列表 -->
    <el-table :data="userList" >
      <el-table-column  type="index" label="序号" width="180"> </el-table-column>
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="180"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="role_name" label="角色名"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      userList:[],
    };
  },
  methods: {
    // 发送请求获取用户信息列表
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      
      if(res.meta.status!=200){
        this.$message.erro('获取用户列表数据异常')
      }
      this.userList=res.data.users;
      console.log(this.userList);
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="less">
@import "~@/assets/css/user.less";
</style>