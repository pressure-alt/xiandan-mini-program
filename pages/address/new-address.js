// pages/address/new-address.js
let QQMapWX = require('../../libs/qqmap-wx-jssdk')
let qqmapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        location: '',
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
    RegionChange: function(e) {
        this.setData({
          region: e.detail.value
        })
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
    getAddressList: function() {
        // 从云端获取地址列表
        wx.cloud.callFunction({
          name: 'getAddressList',
          success: res => {
            console.log('[getAddressList] success', res.result);
            this.setData({
              addressList: res.result.data
            });
          },
          fail: err => {
            console.error('[getAddressList] fail', err);
          }
        })
      },
    
      addAddress: function() {
        // 跳转到地址编辑页面
        wx.navigateTo({
          url: '/pages/addressEdit/addressEdit'
        });
      },
    
      editAddress: function(e) {
        // 获取要编辑的地址索引
        var index = e.currentTarget.dataset.index;
        // 获取地址详细信息
        var address = this.data.addressList[index];
        // 跳转到地址编辑页面，并传递地址信息
        wx.navigateTo({
          url: '/pages/addressEdit/addressEdit?id=' + address._id + '&name=' + address.name + '&phone=' + address.phone + '&address=' + address.address
        });
      },
    
      deleteAddress: function(e) {
        // 获取要删除的地址索引
        var index = e.currentTarget.dataset.index;
        // 获取要删除的地址信息
        var address = this.data.addressList[index];
        // 显示确认删除对话框
        wx.showModal({
          title: '确认删除',
          content: '确定要删除地址 ' + address.name + ' 吗？',
          success: res => {
            if (res.confirm) {
              // 删除地址
              this.doDeleteAddress(address._id);
            }
          }
        });
      },
    
      doDeleteAddress: function(id) {
        // 从云端删除地址
        wx.cloud.callFunction({
          name: 'deleteAddress',
          data: {
            id: id
          },
          success: res => {
            console.log('[doDeleteAddress] success', res.result);
            // 更新地址列表
            this.getAddressList();
          },
          fail: err => {
            console.error('[doDeleteAddress] fail', err);
          }
        })
      },
    
      saveAddress: function() {
        // 跳转回到地址管理页面
        wx.navigateBack({
          delta: 1
        })
      },
    
      cancelEdit: function() {
        // 跳转回到地址管理页面
        wx.navigateBack({
          delta: 1
        })
      }
})