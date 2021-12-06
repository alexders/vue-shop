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
      <el-button type="primary" class="roleBtn" >添加角色</el-button>
      <!-- 列表 -->
      <el-table :data="tableData" :stripe="true" :border="true">
          <el-table-column prop="date" label="明细" width="180"> </el-table-column>
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="name" label="角色名称" width="180"> </el-table-column>
        <el-table-column prop="address" label="角色描述"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
    @import "~@/assets/css/roles.less";
</style>