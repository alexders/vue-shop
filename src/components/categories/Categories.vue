<template>
  <div class="categoriesContainer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="categories-card">
      <el-button type="primary" class="categoriesBtn" @click="showAddDialog">添加分类</el-button>
      <!-- 分类列表 -->
      <tree-table :data="categoriesList" :columns="columns" stripe border show-index :expand-type="false" :selection-type="false" class="categoriesTree">
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="scoped">
          <i class="el-icon-success" v-if="!scoped.row.cat_deleted" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template slot="sort" slot-scope="scoped">
          <el-tag v-if="scoped.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scoped.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="operate">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!-- 添加分类弹出框 -->
      <el-dialog title="添加分类" :visible.sync="addCatgoriesDailog" close="">
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCatgoriesDailog = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页展示 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoriesList: [],
      columns: [
        { label: "分类名称", prop: "cat_name" },
        { label: "是否有效", prop: "cat_deleted", type: "template", template: "isOk" },
        { label: "排序", prop: "cat_level", type: "template", template: "sort" },
        { label: "操作", type: "template", template: "operate" },
      ],
      index: {
        pagenum: 1,
        pagesize: 5,
      },
      addCatgoriesDailog: false,
    };
  },
  methods: {
    async getCategories() {
      const { data: res } = await this.$http.get("categories", {
        params: this.index,
      });
      if (res.meta.status != 200) {
        return this.$message.error("获取商品信息失败");
      }
      console.log(res.data);
      this.categoriesList = res.data.result;
    },
    showAddDialog() {
      this.addCatgoriesDailog = true;
    },
  },
  created() {
    this.getCategories();
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/cat.less";
</style>