<template>
  <div class="role-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  -->
    <el-card class="roleCard">
      <el-button type="primary" class="roleBtn">添加角色</el-button>
      <!-- 列表 -->
      <el-table :data="roleList" :stripe="true" :border="true">
        <el-table-column label="明细" width="50" type="expand">
          <!-- 明细菜单 -->
          <template slot-scope="scoped">
            <!-- 一级权限渲染 -->
            <el-row v-for="item in scoped.row.children" :key="item.id">
              <el-col :span="5"> <el-tag type="primary" closable>{{item.authName}}</el-tag></el-col> 
              <el-col :span="19"> 


                <el-col :span="6"><el-tag type="sucess">{{item.children.authName}}</el-tag></el-col>  
                <!-- <el-col :span="18"><el-tag type="waring">{{item.children.children.authName}}</el-tag></el-col>   -->
              </el-col> 
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <!-- 操作按钮 -->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <!-- 鼠标移入提示 -->
            <el-tooltip content="分配角色权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRole(scope.row)">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: {},
    };
  },
  methods: {
    // 获取到角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.roleList = res.data;
      console.log(res.data);
    },
  },
  created() {
    this.getRoleList();
  },
};
</script>

<style lang="less">
@import "~@/assets/css/roles.less";
</style>