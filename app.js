// app.js
const WXAPI = require('apifm-wxapi')
const CONFIG = require('config.js')

App({

    onLaunch() {
        WXAPI.init('xiandan')
        // 展示本地存储能力
     wx.cloud.init({
            env: "test-7grxiqxxae2c11ff",
        })
        
                

        WXAPI.queryConfigBatch('mallName,WITHDRAW_MIN,ALLOW_SELF_COLLECTION,order_hx_uids,subscribe_ids,share_profile,adminUserIds,goodsDetailSkuShowType,shopMod,needIdCheck,balance_pay_pwd,shipping_address_gps,shipping_address_region_level,shopping_cart_vop_open,cps_open,recycle_open,categoryMod,hide_reputation,show_seller_number,show_goods_echarts,show_buy_dynamic,goods_search_show_type,show_3_seller,show_quan_exchange_score,show_score_exchange_growth,show_score_sign,fx_subscribe_ids,share_pic,orderPeriod_open,order_pay_user_balance,wxpay_api_url,sphpay_open,fx_type').then(res => {
            if (res.code == 0) {
              res.data.forEach(config => {
                wx.setStorageSync(config.key, config.value);
              })
              if (this.configLoadOK) {
                this.configLoadOK()
              }
             
            }
          })
        wx.getNetworkType({
            success(res) {
              const networkType = res.networkType
              if (networkType === 'none') {
                that.globalData.isConnected = false
                wx.showToast({
                  title: '当前无网络',
                  icon: 'loading',
                  duration: 2000
                })
              }
            }
          });
          wx.onNetworkStatusChange(function(res) {
            if (!res.isConnected) {
              that.globalData.isConnected = false
              wx.showToast({
                title: '网络已断开',
                icon: 'loading',
                duration: 2000
              })
            } else {
              that.globalData.isConnected = true
              wx.hideToast()
            }
          })
         
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        })
        var that = this
        var user = wx.getStorageSync('user') || {};
        var userInfo = wx.getStorageSync('userInfo') || {};
        if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.getUserInfo({
                  success: function (res) {
                    var objz = {};
                    objz.avatarUrl = res.userInfo.avatarUrl;
                    objz.nickName = res.userInfo.nickName;
                    console.log(objz);
                    wx.setStorageSync('userInfo', objz);//存储userInfo
                  }
                });
                var d = that.globalData;//这里存储了appid、secret、token串  
                var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                wx.request({
                  url: l,
                  data: {},
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                  // header: {}, // 设置请求的 header  
                  success: function (res) {

                    var obj = {};
                    obj.openid = res.data.openid;
                    obj.expires_in = Date.now() + res.data.expires_in;
                  //存储openid
                    wx.setStorageSync('user', obj); 
                  },
                  fail:(res)=>{
                      console.log(res)
                  }
                });
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
        }
        var user =wx.getStorageSync('user')
        var info=wx.getStorageSync('userInfo')
        console.log(user,info)
            
          
  
    },
    globalData: {
        appid:"wx75f01b18b5b42af9",
        secret:"da8dffbceb895b7080c4eaf2c2cb316e",
        userInfo: null
    }
})