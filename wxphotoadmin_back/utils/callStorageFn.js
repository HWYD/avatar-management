// 获取云存储文件链接方法

const getAccessToken = require('../utils/getAccess_token')
const rp = require('request-promise')
const fs = require('fs')
const ENV ='hwy2020'

const callStorageFn ={
    //获取图片下载链接
    async downloadFile(file_list){
        const ACCESS_TOKEN = await getAccessToken()
        const options ={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`,
            body:{
                env:ENV,
                file_list
            },
            json:true
        }
        return await rp(options).then((res)=>{
            return res
        })
    },
    //删除文件
    async deleteCloudFileds(fileid_list){
        const ACCESS_TOKEN = await getAccessToken()
        const options ={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${ACCESS_TOKEN}`,
            body:{
                env:ENV,
                fileid_list
            },
            json:true
        }
        return await rp(options).then((res)=>{
            return res
        })
    },
    async upload(file,folderName){
        //1.请求地址
        const ACCESS_TOKEN  =await getAccessToken()
        // const file =ctx.request.files.file
        const path =`${folderName}/${Date.now()}-${Math.random()}-${file.name}`
        const options ={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`,
            body:{
                path,
                env:ENV
            },
            json:true
        };
        //请求参数的
        const info = await rp(options).then((res)=>{
            return res
        }).catch((err)=>{

        })
        // console.log(info);
        //2.上传图片
        const params = {
            method:'POST',
            headers:{ 'content-type':'multipart/form-data'},
            uri:info.url,
            formData:{
                key:path,
                Signature:info.authorization,
                'x-cos-security-token':info.token,
                'x-cos-meta-fileid':info.cos_file_id,
                file:fs.createReadStream(file.path)
            },
            json:true
        } 
     await rp(params)
     return info.file_id    
    },
     
}
module.exports = callStorageFn