const app = getApp()
let QQMapWX = require('../../libs/qqmap-wx-jssdk')
let qqmapsdk;

const {
    formatTime
} = require('../../utils/util');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        formdata: {
            title: '',
            info: '',
            price: '',
            location: '',
            imgSrcList: [],
        },
        imgList: [],
        address_component: {}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {



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
    DelImg(e) {
        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            imgList: this.data.imgList
        })
    },
    checkFormEmpty(res) {

        if (res.detail.value.title.trim() == '' || res.detail.value.info.trim() == '' || res.detail.value.price.trim() == '' || this.data.imgList.length == 0) {
            return true
        }

        return false
    },
    getLocation() {
        var that = this
        qqmapsdk = new QQMapWX({
            key: '5SIBZ-PHB6W-OEOR5-RKSN3-L5BFK-Q6FAF' //之前在腾讯平台申请到的key
        })

        wx.getLocation({ //获取定位地址经纬度

            type: 'wgs84',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                var that2 = this
                qqmapsdk.reverseGeocoder({ //SDK调用
                    location: {
                        latitude,
                        longitude
                    },
                    success: (res) => {
                        //success方法指向闭包，所以this属于闭包,所以在success回调函数里是不能直接使用this.setData()的  
                        //可以通过外面将this赋值给其它变量,也可通过promise二次封装,避免回调地狱

                        that.setData({
                            address_component: res.result.address_component
                        })
                        wx.setStorageSync('location', res)
                    }

                })
            }
        })
    },
    formSubmit(res) {
        console.log("submit")
        let data = {
            title: res.detail.value.title,
            info: res.detail.value.info,
            price: res.detail.value.price.trim(),
            userInfo: wx.getStorageSync('userInfo'),
            address: this.data.address_component,
            date: formatTime(new Date),
            imgList: this.data.imgList
        }
        console.log(data)
        if (this.checkFormEmpty(res)) {
            wx.showModal({
                showCancel: false,
                content: '简介、详情、价格和图片不能为空',
                title: '请填写完整',

                complete: () => {
                    return
                }
            })
        } else {
            wx.showLoading({
                title: '',
            });

            const db = wx.cloud.database()

        for (let i of data.imgList){
            wx.cloud.uploadFile({
                cloudPath: i.substr(11),
                filePath: i,
                config: {
                    env: this.data.envId
                }
            }).then(res => {
                console.log('上传成功', res);
                this.setData({
                    formdata: {
                        haveGetImgSrc: true,
                        imgSrcList: this.data.formdata.imgSrcList.concat(res.fileID)
                    },

                });
                data.imgList = this.data.formdata.imgSrcList
                console.log(this.data.formdata)
                db.collection("commodity").add({
                    data: data
                }).then(res => {
                    wx.hideLoading();
                    wx.showModal({
                        showCancel: false,
                        content: '上传成功',
                        placeholderText: 'placeholderText',
                        title: '成功',
                        success: (result) => {
                            this.formReset()
                        },

                    })
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








        }
    }

    ,
    formReset() {
        this.setData({
            imgList: []
        })
    },
    submitToDB(e) {
        let form = this.data.formdata
        console.log(form)

    }
})