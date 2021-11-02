// 调用云函数的公共方法模板，需要传入方法名和请求参数

const getAccessToken = require('../utils/getAccess_token')
const rp = require('request-promise')
const ENV ='hwy2020'

const callCloudFunction = async(FnName,params)=>{
    const ACCESS_TOKEN = await getAccessToken()
    const url =`https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${ENV}&name=${FnName}`
    const options ={
        method:'POST',
        uri:url,
        body:{
            ...params
        },
        json:true
    }
 
     return await rp(options).then( res=>{
        // console.log(res) 
        return res 
       }).catch( err => {
      console.log(err)
     })

}
    
module.exports = callCloudFunction