<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
     <div>
        <el-input placeholder="请输入内容"  class="input-with-select search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
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
    width ='200'
    prop="address"
    label="操作">
    <template slot-scope="scope">
        <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
        <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
        <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
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
  </div>
</template>
<script>
import {getUsersData, toggleUserState} from '../../api/api.js'

export default {
  data () {
    return {
      mg_state: '',
      currentPage: 1,
      pagesize: 5,
      users: [],
      total: 0
    }
  },
  methods: {
    userList () {
      // 初始化数据列表
      var _that = this
      getUsersData({
        query: '',
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
        }
        console.log(res)
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
