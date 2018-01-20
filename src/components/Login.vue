<template class="i">
  <div class="login">
    <div class='contain'>
        <div class="avatar">
            <img src="../assets/logo.png">
          </div>
          <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm info">
        <el-form-item prop="user">
          <el-input placeholder="账户"  type ='text' v-model="ruleForm.user">
            <i slot="prefix" class="myicon myicon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input placeholder="密码" type ='password' v-model="ruleForm.pass">
            <i slot="prefix" class="myicon myicon-key"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引入接口信息
import { login } from '../api/api.js'

export default {
  data () {
    return {
      ruleForm: {
        user: '',
        pass: ''
      },
      rules: {
        user: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        pass: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm: function (data) {
      // 通过内置方法获得表达的value
      // console.log(data.user, data.pass)
      // 调用接口之前做表达验证操作  $ref是组件内置方法
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let params = {
            username: data.user,
            password: data.pass
          }
          login(params).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              // 存储token
              localStorage.setItem('mytoken', res.data.token)
              // 登录成功跳转主页
              this.$router.push({name: 'home'})
            } else {
              // 登录失败提示用户
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })

          // 调用接口,提交用户登录信息
        }
      })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar{
    width: 120px;
    height: 120px;
    position:absolute;
    left: 50%;
    margin-left: -70px;
    margin-top:-70px;
    border-radius: 50%;
    border: 10px solid #FFF;
    box-shadow: 0 1px 5px #CCC;
    background-color: pink;
    overflow: hidden;
  }
  .avatar img{
    width: 120px;
    height: 120px;
    padding-top: 10px;
  }
  .login{
  position: absolute;
      background: #2f4050;
      height: 100%;
      width: 100%;
}
.contain{
  position: relative;
  width: 500px;
  margin: 200px auto;
  background: #fff;
  height: 300px;
  border: 1px solid #fff;
}

.info{
  width: 400px;
  margin: 80px auto;
}
.center{
  text-align: center
}
</style>
