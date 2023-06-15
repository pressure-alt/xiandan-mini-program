// pages/my/order-list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur:0,
        scrollLeft:0,
        zone:["全部","待付款","待发货","待收货","待评价"],
        orderList:[
           
            {   imgList:["https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1664192126.84785883.png"],
                price:"2599.01",
                totalPrice:"25990.10",
                title:"小米手机",
                info:"蓝色", 
                status:1,
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        if(options.TabCur)
        this.setData({
            TabCur:options.TabCur
        })
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
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