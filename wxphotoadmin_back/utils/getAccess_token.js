const rp = require('request-promise')
const APPID ='wx61ee29772640c440'
const APPSECRET='' 
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const fs = require('fs')
const path = require('path')
const storgePath = path.join(__dirname+'/access_token.json')
const updateAccessToken = async ()=>{
    const resStr = await rp (URL)
    const resJosn = JSON.parse(resStr)
    
    if(resJosn.access_token){
        const tokenVal ={
            access_token:resJosn.access_token,
            createTime:new Date(),
        }
        fs.writeFileSync(storgePath,JSON.stringify(tokenVal))
    }
    else{
        await updateAccessToken()
     }
    
}

const getAccessToken = async ()=>{
    try{
        const readRes = fs.readFileSync(storgePath,'utf-8');
        const readResObj =JSON.parse(readRes)
        const nowTime = new Date().getTime()
        const createTime = new Date(readResObj.createTime).getTime()
        if((nowTime-createTime)/1000/60/60 >=2){
            await updateAccessToken()
            await getAccessToken()
        }
        return readResObj.access_token
    }catch(error){
       await updateAccessToken()
       await getAccessToken()
    }
}

setInterval(async ()=>{
    await updateAccessToken()
},(7200-300)*1000)

module.exports = getAccessToken