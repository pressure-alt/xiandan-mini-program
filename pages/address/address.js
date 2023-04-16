Page({
    data: {
      addressList: [
        {
          name: "张三",
          phone: "13512345678",
          province: "广东省",
          city: "深圳市",
          district: "南山区",
          detail: "高新科技园"
        },
        {
          name: "李四",
          phone: "13812345678",
          province: "广东省",
          city: "广州市",
          district: "天河区",
          detail: "珠江新城"
        }
      ]
    },
    addAddress: function () {
      wx.navigateTo({
        url: "../address/new-address"
      });
    },
    editAddress: function (e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: "../address/new-address?index=" + index
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
          }
        }.bind(this)
      });
    }
  });