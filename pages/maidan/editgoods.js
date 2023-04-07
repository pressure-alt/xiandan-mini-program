// pages/maidan/editgoods.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isImgChanged: false,
        imgList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let info = JSON.parse(options.info)
        this.setData({
            commodityinfo: info,
            imgList: info.imgList
        })
        console.log(options.info)
        // this.setData({
        //     a:options
        // })
    },
    imgChanged() {

    },
    ChooseImage() {
        wx.chooseImage({
            count: 1, //默认9
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
    formSubmit(res) {
        console.log(res)
        this.data.commodityinfo.title = res.detail.value.title,
            this.data.commodityinfo.info = res.detail.value.info,
            this.data.commodityinfo.price = res.detail.value.price,
            wx.showLoading({
                title: '正在上传',
            })
        let info = this.data.commodityinfo
        if (this.data.isImgChanged) {
            if (this.data.imgList.length > 0) {
                for (let i of this.data.imgList) {
                    wx.cloud.uploadFile({
                        cloudPath: i.substr(11),
                        filePath: i,
                        config: {
                            env: this.data.envId
                        }
                    }).then(res => {
                        console.log('上传成功', res);
                        this.setData({

                            haveGetImgSrc: true,
                            "commodityinfo.imgList": info.imgList.concat(res.fileID),

                        });
                        db.collection("commodity").doc(info._id).update({
                            data: {
                                info: info.info,
                                price: info.price,
                                title: info.title,
                                imgList: info.imgList,
                            }
                        })
                        wx.hideLoading();
                        wx.showModal({
                            showCancel: false,
                            content: '修改成功',
                            placeholderText: 'placeholderText',
                            title: '成功',
                            success: (result) => {
                                wx.navigateBack({
                                  delta: 1,
                                })
                            },
        
                        })
                    }).catch((e) => {
                        console.log(e);
                        wx.hideLoading();
                        wx.showModal({
                            showCancel: false,
                            content: '上传失败',
                            placeholderText: 'placeholderText',
                            title: '失败',
                        })
                    })
                }
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '请上传图片',
                    duration: 800,
                    image: 'image',
                    mask: true,
                    success: (res) => {},
                    fail: (res) => {},
                    complete: (res) => {},
                })
            }
        }
        else{
            wx.hideLoading();
            db.collection("commodity").doc(info._id).update({
                data: {
                    info: info.info,
                    price: info.price,
                    title: info.title,
                }
            }).then(res=>{
                wx.showModal({
                    showCancel: false,
                    content: '修改成功',
                    placeholderText: 'placeholderText',
                    title: '成功',
                    success: (result) => {
                        wx.navigateBack({
                          delta: 1,
                        })
                    },

                })
            })
        }



    },
    DelImg(e) {
        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            imgList: this.data.imgList,
            isImgChanged: true
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