// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let {unionid,commodityId}=event
    const db=cloud.database()
    console.log(commodityId)
  return await  db.collection("favor").add({
      data:{commodityId:commodityId}
  })
}