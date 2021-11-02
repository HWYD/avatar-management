const getAccessToken = require('../utils/getAccess_token')
const rp = require('request-promise')
const ENV ='hwy2020'

const callCloudDB = async(ctx,fnName,query={})=>{
    // console.log(query)
  const ACCESS_TOKEN  =await getAccessToken()
  const options ={
      method:'POST',
      uri:`https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
      body:{
          query,
          env:ENV
      },
      json:true
  }
  return await rp(options).then((res)=>{
      console.log(res);
   return res 
  }).catch((err)=>{
          console.log(err);
  })

}

module.exports = callCloudDB