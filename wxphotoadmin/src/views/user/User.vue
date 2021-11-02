<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
       <el-table :data="userList"  border >
          <el-table-column type="index"></el-table-column>
          <el-table-column
            label="用户头像"
            width="130px">
             <template slot-scope= "scope">
              <!-- <img :src="scope.row.avatarUrl" class="avatarUrl"/> -->
              <el-avatar shape="square" :size="90" fit="cover" :src="scope.row.avatarUrl"></el-avatar>
              </template>
          </el-table-column>
          <el-table-column
            label="用户名"
            prop="nickName">
          </el-table-column>
          <el-table-column
            label="省份"
            prop="province">
          </el-table-column>
          <el-table-column
            label="市区"
            prop="city">
          </el-table-column>
          <el-table-column
            label="查看次数"
            prop="viewcount">
          </el-table-column>
          <el-table-column label="操作" width="170px">
            <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleCheck(scope.row)">查看</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.row)">编辑</el-button>
                  </template>
          </el-table-column>
        </el-table>
    </el-card>
    <div class="loadingBox">
      <el-button v-if="!end" type="primary" :loading="loadingBtn" @click="loadingMore">点击加载更多</el-button>
      <el-button v-else type="primary" :loading="loadingBtn" >没有更多了</el-button>
    </div>
    <!-- 查看用户对话框 -->
    <el-dialog title="用户" :visible.sync="checkDialogVisible" width="50%">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="头像">
          <el-avatar shape="square" :size="100" fit="cover" :src="user.avatarUrl"></el-avatar>
        </el-form-item>
        <el-form-item label="用户">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="user.createTime"></el-input>
        </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 修改用户次数对话框 -->
    <el-dialog title="用户次数修改" :visible.sync="changeDialogVisible" width="50%">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="user.nickName" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="user.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="查看次数">
          <el-input v-model="user.viewcount"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="changeCount">修改</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default{
  data(){
    return{
      userList:[],
      count:30,
      loadingBtn:false,
      end:false,
      checkDialogVisible:false,
      changeDialogVisible:false,
      user:{}
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    getUserList(){
      const query = { start: this.userList.length, count: this.count }
      this.$http.get('http://localhost:3001/user/userlist', {
        params: query
      }).then(res => {
        console.log(res.data)
        this.userList = this.userList.concat(res.data.data)
        this.loadingBtn = false
        if(res.data.data.length < this.count) this.end = true
      })
    },
    loadingMore(){
      this.loadingBtn = true
      this.getUserList()
    },
    handleCheck(row){
      console.log(row)
      this.user = row
      console.log(this.user)
      this.checkDialogVisible = true
    },
    handleEdit(row){
      console.log(row)
      this.user = JSON.parse(JSON.stringify(row))
      this.changeDialogVisible = true
    },
    async changeCount(){
      console.log(this.user)
      const query = {
        userId:this.user._id,
        count:this.user.viewcount
      }
      const res = await this.$http.post('http://localhost:3001/user/updateCount', query)
        .then(res => {
          return res.data
        })
      if(res.code === 20000) {
        this.changeDialogVisible = false
        this.$message.success('更新成功')
        this.userList = []
        this.getUserList()
      }
      else{
        this.$message.error('更新失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb{
  margin-bottom: 30px;
  }
.el-card{
  box-shadow: 0 1px 1px rgba(0,0,0,0.15) !important;
  }
.avatarUrl{
  width: 70px;
  height: 70px;
}
.loadingBox{
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
