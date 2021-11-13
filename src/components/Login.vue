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
      <el-form
        ref="loginFormRef"
        class="login_form"
        :model="loginForm"
        :rules="rules"
      >
        <!-- 登录表单 -->
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="iconfont icon-lock_fill"
            show-password
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_btn" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      // 登录校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录方法，需要表单的校验通过了才可触发请求validate
    login() {
      this.$refs.loginFormRef.validate(async (data) => {
        if (!data) {
          // 校验不通过直接return
          return;
        }
        // 发送登录请求用 await来收正确的反馈
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        // 判断数据的状态
        if (res.meta.status !== 200) {
          return this.$message.error("账号或密码错误");
        } else {
          // 将用户的数据存储起来，存到localStorage中
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$message.success("登录成功");
          // 跳转到Home页面
          this.$router.push('/home');
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/login.less";
</style>