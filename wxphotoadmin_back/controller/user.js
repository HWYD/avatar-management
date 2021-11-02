const Router = require('koa-router')
const router = new Router
const callCloudFn =require('../utils/callCloudFn')

router.get('/userlist',async(ctx,next)=>{
   const query = {
    $url:'getUserList',
    start:parseInt(ctx.query.start),
    count:parseInt(ctx.query.count)
   }
    const result =await callCloudFn('userList',query)
    ctx.body = JSON.parse(result.resp_data).data

})

router.post('/updateCount',async(ctx,nent)=>{
   const params = ctx.request.body
   params.count =parseInt(params.count)
   const result =await callCloudFn('userList',{...params, $url:'changeCountById'})
   ctx.body =JSON.parse(result.resp_data)
})

module.exports =router