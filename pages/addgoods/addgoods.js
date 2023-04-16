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
            preprice:'',
            location: '',
            imgSrcList: [],

        },
        fineness:['全新','九五新','九成新','有明显使用痕迹'],
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
                console.log(res)
                //图片文件大小在5m以内
                if(res.tempFiles[0].size<=5000000){
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }else{
                wx.showToast({
                  title: '图片大小不能超过5MB',
                  duration: 1000,
                  icon: "none",
                  
                  success: (res) => {},
                  fail: (res) => {},
                  complete: (res) => {},
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
//上传所有图片
        for (let i of data.imgList){

            // wx.cloud.uploadFile({
            //     cloudPath: i.substr(11),
            //     filePath: i,
            //     config: {
            //         env: this.data.envId
            //     }
            // }).then(res => {
            //     console.log('上传成功', res);
            //     this.setData({
            //         formdata: {
            //             haveGetImgSrc: true,
            //             imgSrcList: this.data.formdata.imgSrcList.concat(res.fileID)
            //         },

            //     });
        }
            //     data.imgList = this.data.formdata.imgSrcList
            //     console.log(this.data.formdata)
            //     db.collection("commodity").add({
            //         data: data
            //     }).then(res => {
            //         wx.hideLoading();
            //         wx.showModal({
            //             showCancel: false,
            //             content: '上传成功',
            //             placeholderText: 'placeholderText',
            //             title: '成功',
            //             success: (result) => {
            //                 this.formReset()
            //             },

            //         })
            //     })

            // }).catch((e) => {
            //     console.log(e);
            //     wx.hideLoading();
            //     wx.showModal({
            //         showCancel: false,
            //         content: '上传失败',
            //         placeholderText: 'placeholderText',
            //         title: '失败',


            //     })
            // })
        
        }
    }

    ,
    formReset() {
        this.setData({
            imgList: []
        })
    },
    //商品成色选择
    PickerChange(e) {
        console.log(e);
        this.setData({
          index: e.detail.value
        })
      },
})