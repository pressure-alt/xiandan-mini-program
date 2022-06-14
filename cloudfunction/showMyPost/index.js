// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: "test-7grxiqxxae2c11ff"
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const db=cloud.database()
    console.log(event)
    return await db.collection("commodity").where({
        _openid:event._openId
    }).get()

}