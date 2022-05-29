
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        goodsRecommend:{},
        curPage:0,
        isCard:false,
        cardCur: 0,
        testurl:"https://dcdn.it120.cc/2022/05/26/3dfeabc1-cbb4-40f7-8676-8ae815704757.jpg",
        swiperList: [{
          id: 0,
          type: 'image',
          url: 'cloud://test-7grxiqxxae2c11ff.7465-test-7grxiqxxae2c11ff-1311090620/QQ图片20220528211747.jpg'
        }],
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

       
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
        db=wx.cloud.database()
        db.colllection('commdity').get().then(res=>console.log(res))
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
    goodDetails(e){
        
        wx.navigateTo({
          url: '../home/goods/goods',
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
    onReachBottom(){
        console.log("bottom")
        let curPage=this.data.curPage
        this.setData({
            curPage:curPage+1,
        })
    }
})