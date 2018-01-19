<template class="i">
  <div class="login">
    <div class='contain'>
      <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm info ">
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
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
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
    submitForm: function () {
      this.$router.push({name: 'home'})
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
  position: absolute;
      background: #2f4050;
      height: 100%;
      width: 100%;
}
.contain{
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
