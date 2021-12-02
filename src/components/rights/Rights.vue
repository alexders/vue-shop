<template>
  <div class="rightContainer">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限表单 -->
    <el-card class="box-card">
      <el-table :data="rightData" :stripe="true" :border="true">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <!-- 权限等级 -->
          <template slot-scope="scope">
              <el-tag v-if="scope.row.level === '0'">一级</el-tag>
              <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
              <el-tag type="warning" v-else>三级</el-tag>
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
      rightData: {},
    };
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get(`rights/list `);
      if (res.meta.status != 200) {
        this.$message.error("获取权限列表");
      }
      this.rightData = res.data;
      console.log(this.rightData);
    },
  },
  created() {
    this.getRightsList();
  },
};
</script>
<style>
</style>