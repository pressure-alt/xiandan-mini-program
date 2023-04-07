// pages/home/goods/goods.ts




const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banners: {},
        favor: false,
        commodityinfo: {
            "_id": "16db756f6294d4850522274d6ededdbc",
            "imgList": [],
            "info": "买来没穿，不想要了，便宜出",
            "price": "500",
            "title": "Nike Dunk HI RETRO 夏季板鞋高帮",
            "userInfo": {
                "country": "",
                "gender": 0,
                "language": "zh_CN",
                "nickName": "Sunny",
                "province": "",
                "avatarUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/4zxVLG6k7XrcUY5iaNZ1NgELFrqjvc7TPk98MEKAr7F0gXZYwgw6nB5uEz5onL9m3ugcWOwO7CeuxXhfA9kR5Lg/132",
                "city": ""
            },
            "_openid": "oWl9d47ZJ-b2aJ1WZXvbRgN0WVrg",
            "address": "南昌市",
            "date": "2022/05/30 22:28:20"
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

        if (this.data.favor) {
            this.setData({
                favor: false
            })
           if (this.removeFavor())
           {
            wx.showToast({
              title: '成功移出购物车',
              duration:800
            })
           }
           else{
               wx.showToast({
                 title: '移出购物车失败',
                 duration:800
               })
           }

        } else {
            if(this.addFavor()){
                this.setData({
                favor: true
            })
            wx.showToast({
              title: '收藏成功',
              duration:800
            })
            }
            else{
                wx.showToast({
                  title: '收藏失败',
                  duration:800
                })
            }
            
            
        }
    },
    addFavor() {
        db.collection("favor")
            .add({
                data: {
                    commodityId: this.data.commodityinfo._id
                }
            })
        .catch(e=>{return false})
        return true
    },
    removeFavor() {
        db.collection("favor")
            .where({
                commodityId: this.data.commodityinfo._id
            })
            .remove()
            .catch(e=>{return false})
        return true
    }
})