// pages/maidan/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       
    },onShow(){
        this.refresh()
    },
    refresh(){
        // wx.cloud.callFunction({
        //     name:"showMyPost",
        //     data:{_openId:wx.getStorageSync("user").openid,},

                    
        // }).then(res=>{
        //     console.log(res)
        //     this.setData({
        //         goodsList:res.result.data,
        //         loading:true
        //     })
        // })
    },
    editItem(event){
        let id=event.currentTarget.dataset.id
        let info=JSON.stringify(this.data.goodsList[id])
        wx.navigateTo({
          url: './editgoods?info='+info,

        })
    },
    deleteItem(event){
wx.showModal({

  content: '您确认删除该物品吗？',

  showCancel: true,
  title: '确认删除',
  success: (result) => {
      if(result.confirm){
      let id=event.currentTarget.dataset.id
      console.log(event.currentTarget.dataset.id)
      this.data.goodsList.pop(id)
      
    if(this.delItemDone(this.data.goodsList[id]._id)){
        this.refresh()
    }
    

}
  },
  fail: (res) => {},
  complete: (res) => {},
})
    },
    async delItemDone(key) {
        db.collection("commodity")
            .doc(key)
            .remove()
            .catch(e=>{
                console.log(e)
                return false})
        return true
    
  },

  
})