Page({
    data: {
        TabCur:0,
        scrollLeft:0,
        zone:["全部","已发布","审核完成","待发货","交易成功"],
        orderList:[

            {   imgList:["http://localhost:8088/images/QQ图片20220528211758.jpg"],
            price:"2599.01",
            totalPrice:"25990.10",
            title:"小米手机",
            info:"蓝色", 
            status:1,
        }
        ]
    },
    onLoad: function (options) {
        console.log(options)
        if(options.TabCur)
        this.setData({
            TabCur:options.TabCur
        })
    },
    onShow: function(options){
     
    },
    tabSelect(e) {
        this.setData({
          TabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
      }
});