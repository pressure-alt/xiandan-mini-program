// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db=cloud.database()
    let data;
    console.log(db)
    db.collection("commodity").where({
        list:_.length.gt(0)
    }).get().then(res=>{
        console.log(res)
        data=res
    })
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        data:data,
    }
}