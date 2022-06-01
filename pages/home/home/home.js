
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        goodsRecommend:{},
        curPage:0,
        isCard:false,
        cardCur: 0,
        loading:false,
        isLastPage:Boolean,
        swiperList: [{
          id: 0,
          type: 'image',
          url: 'cloud://test-7grxiqxxae2c11ff.7465-test-7grxiqxxae2c11ff-1311090620/QQ图片20220528211747.jpg'
        },{
            id: 1,
            type: 'image',
            url: 'cloud://test-7grxiqxxae2c11ff.7465-test-7grxiqxxae2c11ff-1311090620/swiper2.webp'
          }],
        goodsList:[]
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

       wx.cloud.callFunction({
            name:"show",
           config:{
            env:options.envId
            },
                    
        }).then(res=>{
            console.log(res)
            this.setData({
                goodsList:res.result.data,
                loading:true
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
   console.log(this.data.goodsRecommend)
     
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
      wx.startPullDownRefresh()
        wx.cloud.callFunction({
            name:"show",
           config:{
            env:options.envId
            },
                    
        }).then(res=>{
            console.log(res)
            this.setData({
                goodsList:res.result.data
            })
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
      if(!this.data.isLastPage)
        this.setData({
            page:page+1
        })
    },
    goodDetails(e){
        
        wx.navigateTo({
          url: '../goods/goods',
        })
    }
    ,
   NavChange( e) {
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