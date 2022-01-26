<template>
  <div class="categoriesContainer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="categories-card">
      <el-button type="primary" class="categoriesBtn" @click="addDialogVisible">添加分类</el-button>
      <!-- 分类列表 -->
      <tree-grid></tree-grid>
      <!-- 分页展示 -->
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>