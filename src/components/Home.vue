<template>
  <el-container>
    <el-aside width="auto">
        <div class="logo"></div>
        <el-col :span="24">
            <el-menu
              router
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse = "isCollapse"
              unique-opened
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index='/users'>
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户列表</span>
                  </el-menu-item>
              </el-submenu>

              <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                  </template>
                  <el-menu-item index='2-1'>
                      <i class="el-icon-menu"></i>
                      <span slot="title">角色列表</span>
                    </el-menu-item>
                    <el-menu-item index='2-2'>
                        <i class="el-icon-menu"></i>
                        <span slot="title">权限列表</span>
                      </el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>商品管理</span>
                    </template>
                    <el-menu-item index='3-1'>
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品列表</span>
                      </el-menu-item>
                      <el-menu-item index='3-2'>
                          <i class="el-icon-menu"></i>
                          <span slot="title">商品分类</span>
                        </el-menu-item>
                        <el-menu-item index='3-3'>
                            <i class="el-icon-menu"></i>
                            <span slot="title">商品参数</span>
                          </el-menu-item>
                  </el-submenu>

                  <el-submenu index="4">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                      </template>
                      <el-menu-item index='4-1'>
                          <i class="el-icon-menu"></i>
                          <span slot="title">订单列表</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>数据统计</span>
                        </template>
                        <el-menu-item index='5-1'>
                            <i class="el-icon-menu"></i>
                            <span slot="title">数据报表</span>
                          </el-menu-item>
                      </el-submenu>
            </el-menu>
            </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <div><i @click="toggle" class="myicon myicon-menu btnsize"></i></div>
        <div class="logout" @click='logout'>退出</div>
        后台管理系统
      </el-header>
      <el-main>
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      // 清除本地的token
      localStorage.removeItem('mytoken')
      // 跳转到登录页面
      this.$router.push({name: 'login'})
    }
  }
}

</script>
<style scoped>
  .logo{
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #989898;
  }
.el-header{
    background-color: #B3C0D1;
    line-height: 60px;
    background: #545c64;
    text-align: center;
    font-size: 28px;
    color: #fff;
  }

  .el-aside {
    background-color: #545c64;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
    overflow: hidden;
  }

  .el-main {
    background-color: #E9EEF3;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
    overflow: hidden;
  }
  .btnsize{
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
    float: left;
  }
  .logout{
    float: right;
    right: 10px;
    color: orange;
    font-size: 18px;
    cursor: pointer;
  }
  /* 这里很重要,这个选择器表示有 .el-menu-vertical-demo 但是没有.el-menu--collapse 时生效 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* min-height: 400px; */
  }
</style>
