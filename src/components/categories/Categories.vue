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
      <template>
       
           <tree-table :data=categoriesList></tree-table>
       
      </template>
  
      <!-- 分页展示 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoriesList: [],
    };
  },
  methods: {
  async  getCategories() {
     const {data:res}=await this.$http.get('categories')
      if (res.meta.status !=200) {
        return this.$message.error("获取商品信息失败");
      }
      console.log(res.data)
      this.categoriesList=res.data;
    },
  },
 created() {
   this.getCategories();
 },
};
</script>

<style>
</style>