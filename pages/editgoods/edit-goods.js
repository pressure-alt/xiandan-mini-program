
const api = require("../../api/api");
const gapi = require("../../api/goods-api")
const {
    formatTime
} = require('../../utils/util');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods:{},
        fineness:['全新','九五新','九成新','有明显使用痕迹'],
        imgList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {console.log(options)
        let info=JSON.parse(options.info)
        
        this.setData({
            goods:info
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
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
                console.log(res)
                //图片文件大小在5m以内
                if(res.tempFiles[0].size<=5000000){
                if (this.data.goods.giconPath.length!=0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths),
                        "goods.giconPath":this.data.goods.giconPath.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths,
                        "goods.giconPath":res.tempFilePaths
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
    },
    DelImg(e) {
        this.data.goods.giconPath.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            "goods.giconPath": this.data.goods.giconPath
        })
    },
    checkFormEmpty(res) {
        console.log(res)
        if (res.detail.value.title.trim() == '' || res.detail.value.info.trim() == '' || res.detail.value.price == ''||res.detail.value.contact=='' || this.data.goods.giconPath.length == 0) {
            return true
        }
        return false
    },
    
  async  formSubmit(res) {
        console.log(res)
        let data = {
            gid:this.data.goods.gid,
            gprofile: res.detail.value.title,
            gdetails: res.detail.value.info,
            gprice: res.detail.value.price,
            gprePrice:res.detail.value.preprice?res.detail.value.preprice:null,
            
            stockNum:res.detail.value.stockNum,
            categoryId:1,
            glocation:res.detail.value.contact,
            // gstatus:0,
            fineness:res.detail.value.fineness,
            giconPath: this.data.goods.giconPath
        }
        console.log(data)
        //检查文本是否为空
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
                title: '上传中',
                
            });
            setTimeout(function () {
                wx.hideLoading()
              }, 2000)
            console.log(this.data.imgList)
            data.giconPath.splice(data.giconPath.length-this.data.imgList.length-1,this.data.imgList.length)
            for (let i of this.data.imgList){
        //上传新增图片
        console.log(i)
               await api.uploadImgs(i).then(res=>{
                   if(res.statusCode!=200){return}
                 //
                   let result=JSON.parse(res.data) 

                    data.giconPath.push(result.data.filePath)
                })
            }       
            
            data.giconPath=JSON.stringify(data.giconPath)
            wx.hideLoading()
            console.log(data)
            gapi.updateGoods(data).then(res=>{
                console.log(res)
                    wx.showToast({
                      title: res.message,
                      mask: true,
                      success: (res) => {},
                      fail: (res) => {},
                      complete: (res) => {},
                    })
                
            })

        }    
    }
    ,
   uploadImgs(data){

        //上传所有图片
        
    },
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