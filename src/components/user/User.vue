<template>
  <div class="userContainer">
    <!-- 面包屑导航 -->
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
            <el-input placeholder="请输入用户名" class="input-with-select" v-model="queryInfo.query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button> </el-input
          ></el-col>
          <el-col :span="4"><el-button type="primary" class="addUser" @click="addDialogVisible = true"> 添加用户</el-button></el-col>
        </el-row>
      </div>
      <!-- 添加用户列表 -->
      <el-table :data="userList" :stripe="true" :border="true" class="userTable">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role_name" label="角色名" width="180"> </el-table-column>
        <el-table-column label="状态">
          <!-- 自定义模板使用作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showUser(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
            <!-- 鼠标移入提示 -->
            <el-tooltip content="添加角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页展示 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加用户弹窗 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="closeDailog">
        <!-- 填写表单 -->
        <el-form :model="userForm" :rules="userRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户弹窗 -->
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="closeeditDailog">
        <!-- 填写表单 -->
        <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCurrentUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加角色的弹出框 -->
      <el-dialog title="分配用户角色" :visible.sync="addRoleDialogVisible" width="30%" class="roleselector" @close="closeRoleDailog">
        <p>当前的用户： {{ userRole.username }}</p>
        <p>当前的角色： {{ userRole.role_name }}</p>
        <!-- 选择角色 -->
        <p>
          分配的新角色：
          <el-select v-model="selec_role" placeholder="请选择">
            <el-option v-for="item in role" :key="item.id" :label="item.roleName" :value="item.id" > </el-option>
          </el-select>
        </p>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
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
      userList: [],
      // 总数
      total: 0,
      // 弹出框是否展示
      addDialogVisible: false,
      editDialogVisible: false,
      addRoleDialogVisible: false,
      //添加用户的表单
      userForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 表单的校验
      userRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在6 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
      },
      // 修改表单
      editForm: {
        username: "",
        email: "",
        mobile: "",
      },
      // 修改表单的校验规则
      editRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
      },
      userRole: {},
      rolename: {},
      // 获取的角色信息
      role: {},
      selec_role: null,
    };
  },
  methods: {
    // 关闭对话框方法
    closeDailog() {
      this.$refs.ruleForm.resetFields();
      this.addDialogVisible = false;
    },
    // 关闭编辑框的方法
    closeeditDailog() {
      this.$refs.editForm.resetFields();
      this.editDialogVisible = false;
    },
    // 关闭角色对话框
    closeRoleDailog() {
      this.selec_role = null;
      this.addRoleDialogVisible = false;
    },
    //监听用户状态更新
    async changeState(userinfo) {
      // 发请求更新用户状态
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`);
      if (res.meta.status != 200) {
        // 将按钮状态重置回去
        userinfo.mg_state = !userinfo.mg_state;
        this.$message.error("获取失败");
      } else {
        this.$message.success("用户状态更新成功");
      }
    },

    // 发送请求获取用户信息列表
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });

      if (res.meta.status != 200) {
        this.$message.error("获取用户列表数据异常");
      }
      this.userList = res.data.users;
      this.total = res.data.total;
      console.log(this.userList);
    },
    // 监听页面大小变化的方法
    handleSizeChange(pageSize) {
      this.queryInfo.pagesize = pageSize;
      this.getUserList();
    },
    // 监听改变当前页的方法
    handleCurrentChange(currenPage) {
      this.queryInfo.pagenum = currenPage;
      this.getUserList();
    },
    // 添加用户方法
    addUser() {
      // 点击提交校验表单
      this.$refs.ruleForm.validate(async (valid) => {
        // 表单不通过校验
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post("users", this.userForm);
        if (res.meta.status != 201) {
          this.$message.error("创建失败");
        } else {
          this.$message.success("创建成功");
          // 关闭对话框
          this.addDialogVisible = false;
          //  重新刷新表单
          this.getUserList();
        }
      });
    },
    // 展示用户的方法
    async showUser(id) {
      this.editDialogVisible = true;
      // 展示选中行的用户信息
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status != 200) {
        this.$message.error("获取用户失败");
      }
      this.editForm = res.data;
      
    },
    // 修改当前用户方法
    editCurrentUser() {
         console.log(this.editForm);
      // 校验当前表单
      this.$refs.editForm.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写完整信息");
        }
     
        const { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        });
        if (res.meta.status != 200) {
          this.$message.error("修改用户失败");
        }
        this.getUserList();
        this.$message.success("修改用户成功");
        this.editDialogVisible = false;
      });
    },
    // 删除用户的方法
    deleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 调用接口删除用户
          const { data: res } = await this.$http.delete(`users/${id}`);
          if (res.meta.status != 200) {
            return this.$message.error("删除用户失败");
          }
          this.$message.success("已删除用户");
          this.getUserList();
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 展示添加角色对话框
    async showRole(user) {
      this.addRoleDialogVisible = true;
      this.userRole = user;
      // 获取角色信息
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200) {
        return this.$message.error("获取角色信息失败");
      }
      this.role = res.data;
    },
    // 添加角色
    async addRole() {
      // 将选择的角色发送给服务器
      const { data: res } = await this.$http.put(`users/${this.userRole.id}/role`, { rid: this.selec_role });
      if (res.meta.status != 200) {
        return this.$message.error("设置角色失败："+res.meta.msg);
      }
      this.$message.success("成功修改角色");
      this.getUserList();
      this.addRoleDialogVisible = false;
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
