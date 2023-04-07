const api = require("../../../api/api")

const app = getApp()
var domain = app.globalData.domain
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsRecommend: {},
        curPage: 0,
        isCard: false,
        cardCur: 0,
        loading: false,
        isLastPage: Boolean,
        swiperList: [{
            id: 0,
            type: 'image',
            url: domain + '/images/11544ab7-38ca-4570-a876-cbfd39720367.png'
        }, {
            id: 1,
            type: 'image',
            url: domain + '/images/QQ图片20220528211747.jpg'
        }],
        goodsList: [{

            "imgList": ["http://localhost:8088/images/QQ图片20220528211758.jpg"],
            "info": "买来没穿，不想要了，便宜出",
            "price": "500",
            "title": "Nike Dunk HI RETRO 夏季板鞋高帮",
            "userVO": {
                
                "nickName": "Sunny",
                "province": "",
                "avatarUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/4zxVLG6k7XrcUY5iaNZ1NgELFrqjvc7TPk98MEKAr7F0gXZYwgw6nB5uEz5onL9m3ugcWOwO7CeuxXhfA9kR5Lg/132",
                "city": "南昌"
            },
            "_openid": "oWl9d47ZJ-b2aJ1WZXvbRgN0WVrg",
            "address": "南昌市",
            "date": "2022/05/30 "
        }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       this.goodsItemDataRequire();
// wx.request({
//   url: domain+'/goods/update',
//   method: "POST",
//   data: {
//     categoryId: 11,
//     details: "details",
//     fineness: "95",
//     gid: 848,
//     iconPath: "9",
//     location: "ad",
//     ownerId: 0,
//     prePrice: 9,
//     price: 9.99,
//     profile: null,
//     status: 1,
//     stockNum: 10,
//     time: "2023-03-19"
//   },
//   success: function(res){
//       console.log(res)
//   },
//   fail: function(res){
//       console.log(res)
//   }
// })
        //    wx.cloud.callFunction({
        //         name:"show",
        //        config:{
        //         env:options.envId
        //         },

        //     }).then(res=>{
        //         console.log(res)
        //         this.setData({
        //             goodsList:res.result.data,
        //             loading:true
        //         })
        //     })

    },

    goodsItemDataRequire() {

        let goods;
        api.getGoods().then(res => {
           
                console.log(res.data.data);
                res.data.data.forEach(element => {
    
                element.imgList= JSON.parse(element.imgList);
            });
                
            
            this.setData({
                goodsList: res.data.data
            })

            })
           

       


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
//    console.log(this.data.goodsRecommend)

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
        wx.showNavigationBarLoading()

        // wx.cloud.callFunction({
        //     name:"show",
        // }).then(res=>{
        //     console.log(res)
        //     this.setData({
        //         goodsList:res.result.data
        //     })
        //     wx.hideNavigationBarLoading();//完成停止加载
        //     wx.stopPullDownRefresh();
        // })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (!this.data.isLastPage)
            this.setData({
                page: page + 1
            })
    },
    goodDetails(e) {

        let goodinfo = this.data.goodsList[e.currentTarget.dataset.id]
        console.log(goodinfo)
        let a = JSON.stringify(goodinfo)
        wx.navigateTo({
            url: '../goods/goods' + "?info=" + a,
        })
    }
    ,
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        })
        console.log(e.currentTarget.dataset.cur)
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },


})