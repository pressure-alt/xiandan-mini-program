const WXAPI = require('apifm-wxapi')
// pages/addgoods/addgoods.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        formdata:{},
        imgList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const db = wx.cloud.database()
        db.collection('goods').add({
            data: {}
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

    },
    ChooseImage() {
        wx.chooseImage({
            count: 4, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
        // WXAPI.uploadFile('', chooseResult.tempFilePaths[0]).then(
        //     res => {
        //         console.log(res)
        //     }
        // )


    },
    DelImg(e) {
              this.data.imgList.splice(e.currentTarget.dataset.index, 1);
              this.setData({
                imgList: this.data.imgList
              })       
      },
      formSubmit(res){
            console.log(res)
            let data= {
                title:res.detail.value.title,
                info:res.detail.value.info,
                imgList:this.data.imgList
            }
            console.log(data)
      }

})