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

    },
    globalData: {
        userInfo: null
    }
})