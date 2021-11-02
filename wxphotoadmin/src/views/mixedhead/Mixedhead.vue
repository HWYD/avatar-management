<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:3001/mixedhead/upload"
      :on-success="uploadSuccess"
      multiple :before-upload="beforeUpload" :show-file-list=false>
      <el-button  type="primary">点击上传</el-button>
     </el-upload>
    <el-table :data="imgList"  border >
       <el-table-column type="index"></el-table-column>
       <el-table-column
         label="头像推荐"
         width="150px">
          <template slot-scope= "scope">
           <!-- <img :src="scope.row.avatarUrl" class="avatarUrl"/> -->
           <el-avatar shape="square" :size="90" fit="cover" :src="scope.row.download_url"></el-avatar>
           </template>
       </el-table-column>
       <el-table-column
         label="创建时间"
         prop="createTime">
       </el-table-column>
       <el-table-column label="操作" width="170px">
         <template slot-scope="scope">
                 <el-button type="danger"
                   @click="handleDetele(scope.row)">删除</el-button>
               </template>
       </el-table-column>
     </el-table>
     <div class="loadingBox">
       <el-button v-if="!end" type="primary" :loading="loadingBtn" @click="loadingMore">点击加载更多</el-button>
       <el-button v-else type="primary" :loading="loadingBtn" >没有更多了</el-button>
     </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      imgList:[],
      count:50,
      loadingBtn:false,
      end:false,
      uploadCount:0,
      finishUpload:0,
      upFileidList:[]
    }
  },
  created() {
    this.getImgList()
  },
  methods:{
    getImgList(){
      const params = { start: this.imgList.length, count: this.count }
      this.$http.get('http://localhost:3001/mixedhead/getlist', {
        params
      }).then(res => {
        this.imgList = this.imgList.concat(res.data)
        this.loadingBtn = false
        if(res.data.length < this.count) this.end = true
      })
    },
    handleDetele(row){
      console.log(row.imgurl)
      this.$confirm('是否删除此图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { _id: row._id, file_list: row.imgurl }
        this.$http.get('http://localhost:3001/mixedhead/delcloudfs', {
          params
        }).then(res => {
          console.log(res)
          if(res.data.code !== 20000) this.$message.error('删除失败')
          this.$message.success('删除成功')
          this.imgList = []
          this.getImgList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    uploadSuccess(response, file, fileList){
      if(response.code === 20000){
        this.finishUpload++
        this.upFileidList.push(response.fileid)
      }
      console.log('hhh' + this.finishUpload + this.upFileidList)
      if(this.finishUpload === this.uploadCount){
        this.$http.post('http://localhost:3001/mixedhead/uptodb', {
          fileidList: this.upFileidList
        }).then(res => {
          if(res.data.id_list.length > 0){
            this.$message.success('上传成功')
            this.imgList = []
            this.getImgList()
          }
          else this.$message.error('上传失败')
        })
      }
    },
    beforeUpload(file){
      this.upFileidList = []
      console.log(file)
      this.uploadCount++
      console.log(this.uploadCount)
    },
    loadingMore(){
      this.loadingBtn = true
      this.getImgList()
    }
  }
}
</script>

<style lang="scss" scoped>
 .el-table{
   margin-top: 20px;
 }
.loadingBox{
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
