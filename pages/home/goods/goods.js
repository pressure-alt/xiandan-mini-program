// pages/home/goods/goods.ts
const sapi=require("../../../api/shoppingcart-api")



const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        querry:{
            userId:101,
            gid:null,
            num:1
        },
        banners: {},
        favor: false,
        commodityinfo: {
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        let info=JSON.parse(option.info)
        this.setData({
            commodityinfo:info
        })
        // const db = wx.cloud.database()
        // db.collection('favor').where({
        //     commodityId: this.data.commodityinfo._id
        // }).get().then(res => {
        //     if (res.data.length > 0) {
        //         this.setData({
        //             favor: true
        //         })
        //     }
        // })
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getShoppingCartInfo();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    favor() {
        let that = this

            this.addFavor()
                
            
          
           
            
            
            
        
    },
    addFavor() {
        this.data.querry.gid=this.data.commodityinfo.id
        sapi.addShoppingcart(this.data.querry).then(res=>{
            console.log(res)
            wx.showToast({
                title: res.message,
                duration:800
              })
            return true
        })
        
    },
    removeFavor() {
        
        return true
    }
})