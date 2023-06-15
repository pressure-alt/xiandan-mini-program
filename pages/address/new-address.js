// pages/address/new-address.js
let QQMapWX = require('../../libs/qqmap-wx-jssdk')
let qqmapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:"",
        tel:"",
        region:[],
        location: '',
        address_component: {
            
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       if(options.intent){
        let intent= JSON.parse(options.intent);
        this.setData({
            index:options.index,
            
            address_component:{
                name:intent.name,
                tel:intent.tel,
                province:intent.province,
                city:intent.city,
                district:intent.district,
                street_number:intent.street_number
            }
        })
    }
    else
    this.getLocation()
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
          address_component: {province:e.detail.value[0],
                            city:e.detail.value[1],
                            district:e.detail.value[2]
        }
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
                            "address_component.province": res.result.address_component.province,
                            "address_component.city":res.result.address_component.city,
                            "address_component.district":res.result.address_component.district,
                            "address_component.street_number":res.result.address_component.street_number
                           
                        })
                        wx.setStorageSync('location', res)
                    }

                })
            }
        })
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
          
      saveAddress: function() {
          let address=wx.getStorageSync('address');
          console.log(address)
          let index=this.data.index;
          this.data.address_component.name=this.data.name;
          this.data.address_component.tel=this.data.tel;
          //修改模式下并且有缓存
            if(index&&address){ 
             console.log("update")
             address[index]=this.data.address_component;
          wx.setStorageSync('address', address)
        }else{
            console.log("new")
            
            address.push(this.data.address_component)
            
            wx.setStorageSync('address', address)
        }
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