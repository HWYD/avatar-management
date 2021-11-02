<template>
  <div class="container">
    <div class="login_box">
      <div class="img_box">
        <img src="../assets/pic/login.png"  />
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="loginForm">
        <el-form-item prop="username">
          <el-input  prefix-icon="iconfont icon-user" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-mima" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button type="info" @click="resetLogin">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      loginForm:{
        username:'admin',
        password:'123456'
      },
      loginFormRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toLogin(){
      this.$refs.loginFormRef.validate(valid => {
        if(valid) this.$router.push('/home')
      })
    },
    resetLogin(){
      this.$refs.loginFormRef.resetFields()
    }
  },
  created(){
    this.$http.post('http://127.0.0.1:8888/api/private/v1/login', this.loginForm).then((res) => { console.log(res) })
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  background-color: #409EFF;
  .login_box{
    width: 500px;
    height: 300px;
    background-color: #FFFFFF;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .img_box{
      width: 120px;
      height: 120px;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-50%);
      border-radius: 50%;
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  }
.loginForm{
 margin-top: 120px;
 width: 100%;
 padding: 0 20px;
 box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
