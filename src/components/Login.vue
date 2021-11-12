<template>
  <!-- 登录页的布局 -->
  <div class="login-container">
    <div class="login-left">
      <img src="../assets/imgs/login_img.png" />
    </div>
    <div class="login-rigt">
      <div class="avatar-box">
        <img src="../assets/imgs/login_logo.png" />
      </div>
      <div class="title">供应链后台管理系统</div>
      <el-form ref="form" class="login_form">
          <!-- 登录表单 -->
        <el-form-item>
          <el-input placeholder="请选择输入账号" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请选择输入密码" prefix-icon="iconfont icon-lock_fill" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="login_btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/assets/css/login.less";
</style>