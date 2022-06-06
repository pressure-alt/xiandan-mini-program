// pages/home/goods/goods.ts


const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banners: {},
        goodinfo:{"_id":"16db756f6294d4850522274d6ededdbc","imgList":["cloud://test-7grxiqxxae2c11ff.7465-test-7grxiqxxae2c11ff-1311090620/w4fe7VDwRhLi70f8056695fafa7497059cbf07f11be0.jpg"],"info":"买来没穿，不想要了，便宜出","price":"500","title":"Nike Dunk HI RETRO 夏季板鞋高帮","userInfo":{"country":"","gender":0,"language":"zh_CN","nickName":"Sunny","province":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/4zxVLG6k7XrcUY5iaNZ1NgELFrqjvc7TPk98MEKAr7F0gXZYwgw6nB5uEz5onL9m3ugcWOwO7CeuxXhfA9kR5Lg/132","city":""},"_openid":"oWl9d47ZJ-b2aJ1WZXvbRgN0WVrg","address":{"city":"南昌市","district":"南昌县","nation":"中国","province":"江西省","street":"五一路","street_number":"五一路458号"},"date":"2022/05/30 22:28:20"}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        console.log(option)
        let info=JSON.parse(option.info)
        this.setData({
            goodinfo:info
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

    }
})