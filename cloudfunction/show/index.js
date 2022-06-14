// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
   env: "test-7grxiqxxae2c11ff"
}
)

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db=cloud.database()
    console.log(db)
    return await db.collection("commodity").get()
//  await  db.collection("commodity")
// //.where({       list:_.length.gt(0)  })
//     .get()
//     return {
//         event,
//         openid: wxContext.OPENID,
//         appid: wxContext.APPID,
//         unionid: wxContext.UNIONID,
//         data:data,
//     }
}