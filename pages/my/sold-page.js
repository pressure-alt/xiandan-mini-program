const gapi =require("../../api/goods-api")

Page({
    data: {
        TabCur:0,
        scrollLeft:0,
        zone:["全部","已发布","审核完成","待发货","交易成功"],
        status:["","审核中","审核完成","等待发货","交易成功"],
        showStatus:["已下架","已上架"],
        orderList:[

            {   imgList:["http://localhost:8088/images/QQ图片20220528211758.jpg"],
            price:"2599.01",
            totalPrice:"25990.10",
            title:"小米手机",
            info:"蓝色", 
            status:1,
            gid:0,
        }
        ],
       goodsList:[]
    },
    onLoad: function (options) {
        console.log(options)
        if(options.TabCur)
        this.setData({
            TabCur:options.TabCur
        })
        this.getMyGoods()
    },
    getMyGoods(){
       gapi.listGoods({ownerId:101}).then(res=>{
            console.log(res)
            this.data.goodsList=res.data;
            for(let i in this.data.goodsList){
                console.log(i)
                this.data.goodsList[i].giconPath=JSON.parse(this.data.goodsList[i].giconPath)   
            }
            this.setData({
                goodsList:this.data.goodsList
            })
        })
    },
    onShow: function(options){
     
    },
    edit(e){
let gid=e.currentTarget.dataset.id
let tempGoods;
for(let i in this.data.goodsList){
if(this.data.goodsList[i].gid===gid){
tempGoods=JSON.stringify(this.data.goodsList[i]);}
}
wx.navigateTo({
  url: '/pages/editgoods/edit-goods?info='+tempGoods,
})
    },
    deleteGoods(e){
        let gid=e.currentTarget.dataset.id
        gapi.delGoods(gid).then(res=>{
            wx.showToast({
              title: res.data.data.message,
            })
        })
        this.getMyGoods()

    },
    tabSelect(e) {
        this.setData({
          TabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
      }
});