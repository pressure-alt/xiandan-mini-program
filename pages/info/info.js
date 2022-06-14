const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')

const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
      shopcart:false,
      shoppingCarInfo:[],
    saveHidden: true,
    allSelect: true,
    delBtnWidth: 120,//删除按钮宽度单位（rpx）
    price:0 
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth
      var scale = (750 / 2) / (w / 2)
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  onLoad: function () {
    this.initEleWidth();
 
   
  },
  onShow: function () {
      wx.showLoading({
        title: '正在加载',
      })
    this.shippingCarInfo().then(()=>{
        wx.hideLoading({
          success: (res) => {},
        })
    })
  },
  async shippingCarInfo() {
       let res= await db.collection('favor').get()
        if (res.data.length>0){
            this.setData({
                shopcart:true
            })
        }
        else{
            this.setData({
                shopcart:false
            })
        }
      for (let ele of res.data ) {
                
               ele.selected = false
               delete ele._id
               delete ele._openid
               ele.info= await db.collection("commodity").doc(ele.commodityId).get()
               console.log(ele)
          }
    
      this.setData({
        shoppingCarInfo: res.data
      })
   
  },
  toIndexPage: function () {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    const index = e.currentTarget.dataset.index;
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var left = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，container位置不变
        left = "margin-left:0px";
      } else if (disX > 0) { //移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "left:-" + delBtnWidth + "px";
        }
      }
      this.data.shoppingCarInfo[index].left = left
      this.setData({
        shoppingCarInfo: this.data.shoppingCarInfo
      })
    }
  },

  touchE: function (e) {
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      this.data.shoppingCarInfo[index].left = left
      this.setData({
        shoppingCarInfo: this.data.shoppingCarInfo
      })
    }
  },
  async delItem(e) {
    const key = e.currentTarget.dataset.key

    wx.showModal({
        content: '确定要删除该商品吗？',
        success: (res) => {
          if (res.confirm) {

           if(this.delItemDone(key)){
            this.shippingCarInfo()
           } 
          }
        }
      })

  },
  async delItemDone(key) {

        db.collection("favor")
            .where({
                commodityId: key
            })
            .remove()
            .catch(e=>{return false})
        return true
    
  },

  async jianBtnTap(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.shippingCarInfo.items[index]
    const number = item.number - 1
    if (number <= 0) {
      // 弹出删除确认
      wx.showModal({
        content: '确定要删除该商品吗？',
        success: (res) => {
          if (res.confirm) {
            this.delItemDone(item.key)
          }
        }
      })
      return
    }
    // const token = wx.getStorageSync('token')
    // if(this.data.shopCarType == 0)
    // {
    //   var res = await WXAPI.shippingCarInfoModifyNumber(token, item.key, number)  
    // }
    // if(this.data.shopCarType == 1)
    // {
    //   var res = await WXAPI.jdvopCartModifyNumber(token, item.key, number)  
    // }
    this.shippingCarInfo()
  },
 
  async radioClick(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.shoppingCarInfo;
   if(item[index].selected) {
       item[index].selected=false
   }
   else{
    item[index].selected=true
   }
    console.log(e)

    // if (this.data.shopCarType == 0) { //自营购物车
    //   if (!item.stores || item.status == 1) {
    //     return
    //   }
    //   var res = await WXAPI.shippingCartSelected(token, item.key, !item.selected)
    // } else if (this.data.shopCarType == 1) { //云货架购物车
    //   var res = await WXAPI.jdvopCartSelect(token, item.key, !item.selected)
    // }
    let sum=0;
    for( let i of item){
        if(i.selected){
            sum+=parseInt(i.info.data.price)
        }
    }
    this.setData({
        shoppingCarInfo:this.data.shoppingCarInfo,
        price:sum
    })
  },
  toIndexPage(){
    wx.switchTab({
     url: '/pages/home/home/home',
    })
  },
  onChange(event) {
    this.setData({
      shopCarType: event.detail.name
    })
    this.shippingCarInfo()
  }
})