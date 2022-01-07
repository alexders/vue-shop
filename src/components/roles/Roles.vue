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
      <el-button type="primary" class="roleBtn" @click="addDialogVisible">添加角色</el-button>
      <!-- 列表 -->
      <el-table :data="roleList" :stripe="true" :border="true">
        <el-table-column label="明细" type="expand">
          <!-- 明细菜单 -->
          <template slot-scope="scoped">
            <!-- 一级权限渲染 -->
            <el-row v-for="(item1, i) in scoped.row.children" :key="item1.id" class="rolerRights" :class="{ bdbottom: true, bdtop: i == 0 }">
              <el-col :span="5">
                <el-tag type="primary" closable>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 渲染二级权限 -->
                <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="{ bdtop: true, bdtop: i2 !== 0 }">
                  <el-col :span="6">
                    <el-tag closable type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 渲染三级权限 -->
                  <el-col :span="18">
                    <el-tag closable type="warning" v-for="item3 in item2.children" :key="item3.id">{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
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
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showRole(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
            <!-- 鼠标移入提示 -->
            <el-tooltip content="分配角色权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRole(scope.row)">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--添加角色弹窗-->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="50%" @close="closeDailog">
        <el-form :model="roleForm" :rules="roleFormRules" ref="roleRef" label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改角色弹窗 -->
      <el-dialog title="修改角色" :visible.sync="eidtRoledialogFormVisible" width="50%" @close="closeEditeDailog">
        <el-form :model="editRoleForm" :rules="editerules" ref="eidteRoleForm" label-width="100px" class="demo-edit-roleForm">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editRoleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editRoleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="eidtRoledialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRole">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: {},
      dialogFormVisible: false,
      roleForm: { roleName: "", roleDesc: "" },
      roleFormRules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      editRoleForm: { roleName: "", roleDesc: "" },
      eidtRoledialogFormVisible: false,
      editerules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //删除角色
    deleteRole(id){
      this.$confirm("此操作将删除该角色，是否继续?","警告",{
        confirmButtonText:"确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async()=>{
        // 调用删除角色接口
       const {data:res}=await this.$http.delete(`roles/${id}`);
       if (res.meta.status !=200) {
         return this.$message.error("删除角色失败")
       }
       this.$message.success("已删除角色");
       this.getRoleList();
      }).catch(()=>{
        this.$message.info("已取消")
      });
    },
    // 添加角色
    addRole() {
      this.$refs.roleRef.validate(async (validate) => {
        if (!validate) {
          return;
        }
        const { data: res } = await this.$http.post("roles", this.roleForm);
        if (res.meta.status != 201) {
          return this.$message.error("创建失败：" + res.meta.msg);
        }
        this.dialogFormVisible = false;
        this.getRoleList();
        this.$message.success("创建成功");
      });
    },
    // 修改角色
    editRole() {
      this.$refs.eidteRoleForm.validate(async(valid) => {
        if (!valid) {
          return this.$message.error("请填写完整信息");
        }
        const { data: res } = await this.$http.put(`roles/${this.editRoleForm.roleId}`,{
          roleName:this.editRoleForm.roleName,
          roleDesc:this.editRoleForm.roleDesc,
        });
        console.log(res.data)
        if (res.meta.status != 200) {
          this.$message.error("更新当前角色信息失败");
        }
        this.$message.success("用户更新角色成功");
        this.eidtRoledialogFormVisible=false;
        this.getRoleList();
      });
    },
    // 获取到角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      // console.log(res)
      if (res.meta.status != 200) {
        return this.$message.error(res.meta.msg);
      }
      this.roleList = res.data;
      console.log(res.data);
    },
    // 添加角色菜单
    addDialogVisible() {
      this.dialogFormVisible = true;
    },
    // 展示修改弹出框
    async showRole(id) {
      this.eidtRoledialogFormVisible = true;
      const { data: res } = await this.$http.get(`roles/${id}`);
      if (res.meta.status != 200) {
        this.$message.error("获取当前角色信息失败");
      }
      console.log(res.data);
      this.editRoleForm = res.data;
    },
    // 关闭对话框
    closeDailog() {
      this.$refs.roleRef.resetFields();
      this.dialogFormVisible = false;
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