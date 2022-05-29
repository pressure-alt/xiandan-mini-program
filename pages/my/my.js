
Component({
    data: {
    balance:0.00,
    freeze:0,
    score:0,
    growth:0,
    score_sign_continuous:0,
    rechargeOpen: false, // 是否开启充值[预存]功能

    // 用户订单统计数据
    count_id_no_confirm: 0,
    count_id_no_pay: 0,
    count_id_no_reputation: 0,
    count_id_no_transfer: 0,

   
    userInfo: {},
     // 判断有没有用户详细资料
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: false
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(1)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log(2)
    },
  },
  methods:{
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
       
        wx.getUserProfile({
          desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
    
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            wx.setStorageSync('userInfo', res.userInfo)
          }
        })
      },
      readConfigVal() {
        this.setData({
          order_hx_uids: wx.getStorageSync('order_hx_uids'),
          cps_open: wx.getStorageSync('cps_open'),
          recycle_open: wx.getStorageSync('recycle_open'),
          show_3_seller: wx.getStorageSync('show_3_seller'),
          show_quan_exchange_score: wx.getStorageSync('show_quan_exchange_score'),
          show_score_exchange_growth: wx.getStorageSync('show_score_exchange_growth'),
          show_score_sign: wx.getStorageSync('show_score_sign'),
          fx_type: wx.getStorageSync('fx_type'),
        })
      },
  }
})
// Page({
	
//   getUserProfile(e) {
//     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
   
//     wx.getUserProfile({
//       desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//       success: (res) => {

//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//         wx.setStorageSync('userInfo', res.userInfo)
//       }
//     })
//   },
 
// 	onLoad() {
// console.log(1)
        
//     this.readConfigVal()
//     // 补偿写法
//     getApp().configLoadOK = () => {
//       this.readConfigVal()
//     }
// 	},
//   onShow() {
  
//   },
//   readConfigVal() {
//     this.setData({
//       order_hx_uids: wx.getStorageSync('order_hx_uids'),
//       cps_open: wx.getStorageSync('cps_open'),
//       recycle_open: wx.getStorageSync('recycle_open'),
//       show_3_seller: wx.getStorageSync('show_3_seller'),
//       show_quan_exchange_score: wx.getStorageSync('show_quan_exchange_score'),
//       show_score_exchange_growth: wx.getStorageSync('show_score_exchange_growth'),
//       show_score_sign: wx.getStorageSync('show_score_sign'),
//       fx_type: wx.getStorageSync('fx_type'),
//     })
//   },
  
  

//   handleOrderCount: function (count) {
//     return count > 99 ? '99+' : count;
//   },
//   orderStatistics: function () {

     
//   },
//   goAsset: function () {
//     wx.navigateTo({
//       url: "/pages/asset/index"
//     })
//   },
//   goScore: function () {
//     wx.navigateTo({
//       url: "/pages/score/index"
//     })
//   },
//   goOrder: function (e) {
//     wx.navigateTo({
//       url: "/pages/order-list/index?type=" + e.currentTarget.dataset.type
//     })
//   },
//   scanOrderCode(){
//     wx.scanCode({
//       onlyFromCamera: true,
//       success(res) {
//         wx.navigateTo({
//           url: '/pages/order-details/scan-result?hxNumber=' + res.result,
//         })
//       },
//       fail(err) {
//         console.error(err)
//         wx.showToast({
//           title: err.errMsg,
//           icon: 'none'
//         })
//       }
//     })
//   },
//   updateUserInfo(e) {
//     wx.getUserProfile({
//       lang: 'zh_CN',
//       desc: '用于完善会员资料',
//       success: res => {
//         console.log(res);
//         this._updateUserInfo(res.userInfo)
//       },
//       fail: err => {
//         console.log(err);
//         wx.showToast({
//           title: err.errMsg,
//           icon: 'none'
//         })
//       }
//     })
//   },
  
    

//   gogrowth() {
//     wx.navigateTo({
//       url: '/pages/score/growth',
//     })
//   },
//   async cardMyList() {

//     if (res.code == 0) {
//       const myCards = res.data.filter(ele => { return ele.status == 0 })
//       if (myCards.length > 0) {
//         this.setData({
//           myCards: res.data
//         })
//       }
//     }
//   },
// })