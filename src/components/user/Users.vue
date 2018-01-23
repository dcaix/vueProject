<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
     <div>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select search">
          <el-button slot="append" icon="el-icon-search"  @click="userList" ></el-button>
        </el-input>
            <el-button type="success"  @click = "openAddDialog = true" plain>添加用户</el-button>
         </div>
      <el-table
      border
      header-align="center"
      :data="users"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        style="width: 50px"
        >
      </el-table-column>
      <el-table-column
      style="width: 50px"
        prop="username"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width='180'
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width='150'>
      </el-table-column>
      <el-table-column
      prop="mg_state"
      label="用户状态">
      <template slot-scope="scope">
          <!-- 作用域插槽，可以定制数据显示 -->
          <el-switch @change='toggleUser(scope.row)' v-model="scope.row.mg_state"></el-switch>
        </template>
    </el-table-column>
    <el-table-column
    width ='300'
    prop="address"
    label="操作">
    <template slot-scope="scope">
        <el-button size='small' type="primary" icon="el-icon-edit" @click="editUser(scope.row.id)">编辑</el-button>
        <el-button size='small' type="danger" icon="el-icon-delete" @click="deleUser(scope.row.id)">删除</el-button>
        <el-button size='small' type="primary" icon="el-icon-edit" @click='giveUserRole(scope.row)'>设置角色</el-button>
      </template>
  </el-table-column>
    </el-table>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 20, 50]"
    :page-size="5"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>

  <!-- 添加用户信息的弹出对话框 -->
  <el-dialog title="添加用户" :visible.sync="openAddDialog">
      <el-form :model="form" ref="form"  status-icon :rules="rules">
        <el-form-item label="用户名称" prop='username' >
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" >
            <el-input v-model="form.password" type='password'></el-input>
          </el-form-item>
          <el-form-item label="邮箱" >
              <el-input v-model="form.email" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" >
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButton">取 消</el-button>
        <el-button type="primary" @click="confirmButton">添 加</el-button>
      </div>
  </el-dialog>

  <!-- 编辑用户信息的弹出对话框 -->
  <el-dialog title="编辑用户" :visible.sync="openEditDialog">
      <el-form :model="editform" ref="editform"  status-icon>
        <el-form-item label="用户名">
          <el-input v-model="editform.username" disabled></el-input>
        </el-form-item>
          <el-form-item label="邮箱">
              <el-input v-model="editform.email" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" >
                <el-input v-model="editform.mobile"></el-input>
              </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButton">取 消</el-button>
        <el-button type="primary" @click="confirmEditButton">确认修改</el-button>
      </div>
  </el-dialog>

      <!-- 分配角色弹窗 -->
      <el-dialog
      title="编辑用户"
      :visible="dialogVisible4Role"
      width="50%">
      <div><span>当前用户名：</span><span>{{currentUser.username}}</span></div>
      <span>请选择角色：</span><el-select v-model="currentRole" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4Role = false">取 消</el-button>
        <el-button type="primary" @click="submitUser4Role">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {getUsersData, giveRole, toggleUserState, addUser, deleUser, getUser4id, confirmEdit, roleList} from '../../api/api.js'

export default {
  data () {
    return {
      mg_state: '',
      query: '',
      currentPage: 1,
      pagesize: 5,
      users: [],
      total: 0,
      openAddDialog: false,
      openEditDialog: false,
      dialogVisible4Role: false,
      form: {},
      editform: {},
      currentUser: {},
      currentRole: '',
      roleList: [],
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    userList () {
      // 初始化数据列表
      var _that = this
      getUsersData({
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pagesize
      }).then(function (data) {
        if (data.meta.status === 200) {
          _that.users = data.data.users
          _that.total = data.data.total
        }
      })
    },
    toggleUser (data) {
      toggleUserState({
        uId: data.id, // 用户id
        state: data.mg_state // 用户当前状态
      }).then(res => {
        if (res.meta.status === 200) {
          // 操作成功
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'error'
          })
        }
      })
    },
    handleSizeChange (val) {
      // 改变每页显示条数
      this.pagesize = val
      this.userList()
    },
    handleCurrentChange (val) {
      // 改变当前页码
      this.currentPage = val
      this.userList()
    },
    cancelButton () {
      this.$message({
        type: 'warning',
        message: '已取消操作'
      })
      this.openAddDialog = false
      this.openEditDialog = false
    },
    // 添加用户
    confirmButton () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          addUser(this.form).then((data) => {
            if (data.meta.status === 201) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.openAddDialog = false
              this.userList()
            } else {
              this.$message({
                type: 'error',
                message: data.meta.msg
              })
            }
          })
        }
      })
    },
    // 编辑用户的对话框展示逻辑
    editUser (id) {
      let _that = this
      this.openEditDialog = true
      getUser4id(id).then(function (data) {
        if (data.meta.status === 200) {
          _that.editform = data.data
        } else {
          _that.$message({
            type: 'error',
            message: data.meta.msg
          })
        }
      })
    },
    // 确认辑用户
    confirmEditButton () {
      var _that = this
      confirmEdit(this.editform).then(function (data) {
        if (data.meta.status === 200) {
          _that.$message({
            type: 'success',
            message: '修改成功'
          })
          _that.userList()
          _that.openEditDialog = false
        } else {
          _that.$message({
            type: 'error',
            message: data.meta.msg
          })
        }
      })
    },
    deleUser (id) {
      deleUser(id).then((data) => {
        if (data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.userList()
        }
      })
    },
    giveUserRole (data) {
    // 获取当前用户的编辑角色对话框
      this.dialogVisible4Role = true
      this.currentUser = data
      // 初始化下拉选项数据
      roleList().then(res => {
        if (res.meta.status === 200) {
          this.roleList = res.data
        }
      })
    },
    submitUser4Role () {
      // 用户分配角色
      giveRole({id: this.currentUser.id, rid: this.currentRole}).then(res => {
        if (res.meta.status === 200) {
          // 隐藏弹窗
          this.dialogVisible4Role = false
          // 提示
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    }
  },
  mounted () {
    this.userList()
  }
}

</script>
<style>
  .nav{
    height: 50px;
    line-height: 50px;
    background: #D3DCE6;
    padding-left: 10px;
  }
  .search{
    width: 300px;
  }
  thead th{
    text-align: center
  }
</style>
