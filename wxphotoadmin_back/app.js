const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const user = require ('./controller/user')
const mixedhead = require('./controller/mixedHead')

//跨域
app.use(cors({
    origin:['http://localhost:8080'],
    credentials:true
}))
//接收post参数解析
app.use(koaBody({
    multipart:true
}))

router.use('/user',user.routes())
router.use('/mixedhead',mixedhead.routes())
app.use(router.routes())
app.use(router.allowedMethods())



app.listen(3001,()=>{
    console.log('服务开启')
})


