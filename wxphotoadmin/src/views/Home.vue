<template>
  <el-container>
    <el-header>
      <div class="title_box">
        <div><img src="../assets/pic/login.png" /></div>
        <span>头像大全管理系统</span>
        <el-button type="info" @click="goOut">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse? '64px':'200px'">
        <div class="controlMenu" @click="controlMenu">|||</div>
        <el-menu class="el-menu-vertical-demo" router  background-color="#4169E1" active-text-color="#409EFF" :collapse='iscollapse' :collapse-transition=false :default-active="actPath">
          <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
              <el-menu-item  v-for="meitem in item.children" :key="meitem.path" :index="meitem.path" @click="saveNavState(meitem.path)">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span slot="title">{{meitem.name}}</span>
                </template>
              </el-menu-item>
          </el-submenu>
         </el-menu>
          </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default{
  data(){
    return{
      iscollapse:false,
      actPath:'',
      menu:[
        {
          title:'用户',
          icon:'el-icon-s-custom',
          children:[
            { name:'用户列表', path:'/user' }, { name:'用户说明', path:'/welcome' }
          ]
        },
        {
          title:'头像推荐',
          icon:'el-icon-camera-solid',
          children:[
            { name:'头像列表', path:'/mixedhead' }
          ]
        }
      ]
    }
  },
  created(){
    this.actPath = window.sessionStorage.getItem('actPath')
  },
  methods:{
    goOut(){
      this.$router.push('/login')
    },
    controlMenu(){
      this.iscollapse = !this.iscollapse
    },
    saveNavState(actPath){
      window.sessionStorage.setItem('actPath', actPath)
      this.actPath = actPath
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container{
  width: 100%;
  height: 100%;
}
.el-header{
  background-color:  #4169E1;
  .title_box{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .el-button{
      position: absolute;
      right: 10px;
    }
  }
  }
.el-aside{
    background-color: #4169E1;
    .controlMenu{
      text-align: center;
      letter-spacing: 0.2rem;
      cursor: pointer;
      background-color: #606266;
      line-height: 20px;
      color: #FFFFFF;
    }
  }
.el-menu{
  border: none;
}
</style>
