// app.js



App({
    onLaunch() {
        // WXAPI.init('xiandan')
        // 展示本地存储能力
  
        
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
                var d = that.globalData;
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
        userInfo: null,
        domain:"http://localhost:8088"
    }
    
})