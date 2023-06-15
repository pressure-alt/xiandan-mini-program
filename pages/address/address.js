Page({
    data: {
      addressList: [
     
      ]
    },
    onLoad(e){
        
      
        this.setData({
            addressList:wx.getStorageSync('address')
        })

    },
    addAddress: function () {
      wx.navigateTo({
        url: "../address/new-address"
      });
    },
    editAddress: function (e) {
      var index = e.currentTarget.dataset.index;
   
      wx.navigateTo({
        url: "../address/new-address?intent=" + JSON.stringify(this.data.addressList[index])+"&index="+index
      });
    },
    deleteAddress: function (e) {
      var index = e.currentTarget.dataset.index;
      var addressList = this.data.addressList;
      wx.showModal({
        title: "提示",
        content: "确定删除这条收货地址吗？",
        success: function (res) {
          if (res.confirm) {
            addressList.splice(index, 1);
            this.setData({
              addressList: addressList
            });
         
          wx.setStorageSync('address', addressList)
          }
        }.bind(this)
      });
    }
  });