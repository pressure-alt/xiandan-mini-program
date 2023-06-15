const api = require("../../../api/api");
const app = getApp()
var domain = app.globalData.domain
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchKey: "",
        searchList: [],
        searchMode: false,
        goodsRecommend: {},
        curPage: 0,
        isCard: false,
        cardCur: 0,
        loading: false,
        isLastPage: false,
        swiperList: [{
            id: 0,
            type: 'image',
            url: domain + '/images/QQ图片20220528211747.jpg'
        }, {
            id: 1,
            type: 'image',
            url: domain + '/images/pngtree-especially-recommended-image_755484.jpg'
        }],
        goodsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    //获取商品数据
    goodsItemDataRequire() {

        api.getGoods(this.data.curPage).then(res => {
            if (res.data && res.data.length > 0) {
                console.log(1);
                this.setData({
                    curPage: this.data.curPage + 1
                })
                this.setData({
                    goodsList: this.data.goodsList.concat(res.data)
                })
            } else {
                this.setData({
                    isLastPage: true
                })
            }
        })
    },
    //切换搜索和浏览界面
    navToSearch() {
        this.setData({
            searchMode: true
        })
    },
    searchCancel() {
        this.setData({
            searchMode: false,
            searchKey:''
        })
    },
    searchGoods(res) {
        api.searchWithKW(this.data.searchKey).then(res => {
            if (res.data && res.data.data.length != 0) {
                this.setData({
                    searchList: res.data.data
                })
            } else {
                wx.showToast({
                    title: '什么也没搜到',
                    icon: 'error'
                })
            }
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
        api.getGoods(0).then(res => {
            this.setData({
                curPage: 0,
                goodsList: res.data
            })
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (!this.data.isLastPage)
            this.goodsItemDataRequire()
    },
    goodDetails(e) {
       
      
            let  goodinfo =this.data.searchMode? this.data.searchList[e.currentTarget.dataset.id]: this.data.goodsList[e.currentTarget.dataset.id]
        console.log(goodinfo)
        let a = JSON.stringify(goodinfo)
        wx.navigateTo({
            url: '../goods/goods' + "?info=" + a,
        })
    },
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