const Router = require('koa-router')
const router = new Router
const callCloudFn =require('../utils/callCloudFn')
const callStorageFn = require('../utils/callStorageFn')
const callCloudDB =require('../utils/callCloudDB.js')

router.get('/getList',async (ctx,next)=>{
    const params ={
     $url:'getMixedHead',
     start:parseInt(ctx.query.start),
     count:parseInt(ctx.query.count)
    }
    //  console.log(ctx.request)
    const result = await callCloudFn('mixedHead',params)
    let turnData = JSON.parse(result.resp_data).data
    let file_list =[]
    for(let i=0,len=turnData.length;i<len;i++){
        let listItem ={
            fileid:turnData[i].imgurl,
            max_age:7200
        }
        file_list.push(listItem)
    }
    let callStorageResult = await callStorageFn.downloadFile(file_list)
    let retunData =[]
    //构造返回数据，将两个数据的数据进行整合
    for(let i=0,len=turnData.length;i<len;i++){
        let retunDataItem ={
            ...turnData[i],
            download_url:callStorageResult.file_list[i].download_url
        }
        retunData.push(retunDataItem)
    }
    // console.log(callStorageResult)
    ctx.body = retunData
})

router.get('/delcloudfs',async(ctx,next)=>{
    console.log(ctx.request.query)
    const params =ctx.request.query
    //删除云数据库的内容
  const query =`db.collection('mixedHead').doc('${params._id}').remove()`
  const delDBRes =   await callCloudDB(ctx,'databasedelete',query)
    //删除云存储图片   
    const delStorageRes = await callStorageFn.deleteCloudFileds(params.file_list)
    console.log(delStorageRes)
    ctx.body ={
        code:20000,
        data:{
         delDBRes,
         delStorageRes
        }
      }
})

router.post('/upload',async(ctx,next)=>{
    const file= ctx.request.files.file
    const folderName= 'mixedHead'
    const fileid  =  await callStorageFn.upload(file,folderName)
    // console.log(1)
    // console.log(fileid)
    ctx.body= {
        code:20000,
        fileid
    }
})

router.post('/uptodb',async(ctx,next)=>{
    const fileidList = ctx.request.body.fileidList
    let dbdata=[]
    for(let i=0,len=fileidList.length;i<len;i++){
     const item ={
         imgurl:fileidList[i],
         createTime:new Date()
     }
     dbdata.push(item)
    }
    dbdata = JSON.stringify(dbdata)
    const query =`db.collection('mixedHead').add({data:${dbdata}})`
    const res = await callCloudDB(ctx,'databaseadd',query).then((res)=>{ return res }).catch((err)=>{
        console.log(err);
})
    ctx.body =res
})
module.exports =router