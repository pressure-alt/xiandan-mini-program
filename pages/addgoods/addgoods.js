const WXAPI = require('apifm-wxapi')
// pages/addgoods/addgoods.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        formdata: {
            title:'',
            info:'',
            price:'',
            location:'',
            imgSrcList:[],
        },
        imgList: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(wx.getStorageSync('userinfo'))
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
    checkFormEmpty(res){

        if(res.detail.value.title.trim()==''||res.detail.value.info.trim()==''||res.detail.value.price.trim()==''){
            return true
        }

        return false
    },
    formSubmit(res) {
       
          if(this.checkFormEmpty(res)){
              wx.showModal({
                showCancel:false,
                content: '简介和详情不能为空',
                title: '请填写完整',
                
                complete:()=>{
                    return 
                }
              })
          }
else{
           wx.showLoading({
            title: '',
          });
        console.log(res)
        var data = {
            title: res.detail.value.title,
            info: res.detail.value.info,
            price: res.detail.value.price,
            imgList: this.data.imgList
        }
        
        for (let i in data.imgList) {
            console.log(data.imgList[i].substr(11))
            wx.cloud.uploadFile({
                cloudPath:data.imgList[i].substr(11),
                filePath:data.imgList[i],
                config: {
                    env: this.data.envId
                  }
            }).then(res=>{
                console.log('上传成功', res);
                this.setData({
                    formdata:{
                  haveGetImgSrc: true,
                  imgSrcList:this.data.formdata.imgSrcList.concat(res.fileID) 
                }
                });
              
              }).catch((e) => {
                console.log(e);
                
            })
        }wx.hideLoading();
        wx.showModal({

          confirmColor: 'confirmColor',
          confirmText: 'confirmText',
          content: '上传成功',
          placeholderText: 'placeholderText',
          showCancel: false,
          title: '成功',
          success: (result) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
    }
    
    }
,
 submitToDB(e){
     let form = this.data.formdata
     console.log(form)

 }
})