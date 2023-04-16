const WXAPI = require('apifm-wxapi')
const TOOLS = require('../../utils/tools.js')
const AUTH = require('../../utils/auth')
const api = require('../../api/api.js')

const app = getApp()

Page({
    data: {
        shopcart: true,
        shoppingCarInfo: [{
            address: "北京",
categoryId: 17,
fineness: "几乎全新",
id: 100000018,
imgList:[
"http://localhost:8088/images/1680766979175.jpg", "http://localhost:8088/images/1680766983508.jpg", "http://localhost:8088/images/1680766995160.jpg"]
,
info: "小米笔记本xiaomi book pro X 14，i7 11370H, rtx3050↵2022年初购买的笔记本，14寸顶配。↵A面装包里有一处划痕。↵降价求速出了。",
ownerId: null,
prePrice: 7000,
price: 4500,
stockNum: 1,
time: "23/04/06",
title: "小米笔记本xiaomi book pro X 14",
quantity:1,
userVo:{
avatarUrl: "http://auth.meita.org/Baby",
nickName: "rinkoyama3",
userId: 1,
vx: null}
        },
        {
            address: "北京",
categoryId: 17,
fineness: "几乎全新",
id: 100000019,
imgList:[
"http://localhost:8088/images/1680766979175.jpg", "http://localhost:8088/images/1680766983508.jpg", "http://localhost:8088/images/1680766995160.jpg"]
,
info: "小米笔记本xiaomi book pro X 14，i7 11370H, rtx3050↵2022年初购买的笔记本，14寸顶配。↵A面装包里有一处划痕。↵降价求速出了。",
ownerId: null,
prePrice: 7000,
price: 4222.12,
stockNum: 6,
time: "23/04/06",
title: "小米笔记本xiaomi book pro X 14",
quantity:1,
userVo:{
avatarUrl: "http://auth.meita.org/Baby",
nickName: "rinkoyama3",
userId: 1,
vx: null}
        }
        ],
        selected:[false],
        saveHidden: true,
        allSelect:false,
        delBtnWidth: 120,//删除按钮宽度单位（rpx）
        totalPrice: 0
    },
// 减少商品数量
minusQuantity: function (event) {
    const id = parseInt(event.currentTarget.dataset.id);
    const goods = this.data.shoppingCarInfo;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].id === id) {
        if (goods[i].quantity > 1) {
          goods[i].quantity--;
        } else {
          // 如果商品数量已经减到1，提示用户是否删除商品
          wx.showModal({
            title: '提示',
            content: '是否删除该商品？',
            success: (res) => {
              if (res.confirm) {
                goods.splice(i, 1);
              }
            }
          });
        }
        break;
      }
    }
    this.setData({
      shoppingCarInfo: goods
    });
    this.addPrice();
  },

  // 增加商品数量
  plusQuantity: function (event) {
      console.log(event)
    const id = parseInt(event.currentTarget.dataset.id);
    const goods = this.data.shoppingCarInfo;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].id === id) {
          console.log(goods[i].stockNum,goods[i].quantity)
          if(goods[i].stockNum>goods[i].quantity){
        goods[i].quantity++;
        }
        else{wx.showToast({
          title: '超出商品库存数量',
          icon: 'error'
        })}
     break; }
    }
    this.setData({
      shoppingCarInfo: goods,
    });
    this.addPrice()
  },

  // 计算总价
  calcTotalPrice: function () {
    const goods = this.data.shoppingCarInfo;
    let totalPrice = 0;
    for (let i = 0; i < goods.length; i++) {
      totalPrice += goods[i].price * goods[i].quantity;
    }
    this.setData({
      totalPrice: totalPrice
    });
  },

  // 结算
  handleSubmit: function () {
    const totalPrice = this.data.totalPrice;
    if (totalPrice > 0) {
      wx.navigateTo({
        url: '/pages/order-confirm/order-confirm'
      });
    } else {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
    }
  },
   
    onLoad: function () {
        
        this.getShoppingCartInfo();
        let selectArr=new Array(this.data.shoppingCarInfo.length).fill(false)
        this.setData({
            selected:selectArr
        })
        
        // wx.showLoading({
        //     title: '正在加载',
            
        // })
    },
    onShow: function () {
      
        setTimeout(res=>{
            wx.hideLoading()
        },5000)

        // this.shippingCarInfo().then(() => {
        //     wx.hideLoading({
        //         success: (res) => {
        //         },
        //     })
        // })
    },
    getShoppingCartInfo(){
        let user = wx.getStorageSync("user")
        let openId=user.openid
       
            api.getShoppingCartInfo(openId).then(res=>{
                this.setData({
                    shoppingCarInfo:res.data
                })
                
                wx.hideLoading();
            })
            
    }
    ,
 
    toIndexPage: function () {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },

    async delItem(e) {
        const key = e.currentTarget.dataset.key
        console.log(key)
        wx.showModal({
            content: '确定要删除该商品吗？',
            success: (res) => {
                if (res.confirm) {

                    if (this.delItemDone(key)) {
                        this.getShoppingCartInfo()
                    }
                }
            }
        })

    },
    async delItemDone(key) {
        let goods=this.data.shoppingCarInfo
        
        //api.deleteCartItem()




    },



async  radioClick(e) {
        var index = e.currentTarget.dataset.index;
        var item = this.data.selected;
       
        console.log(item)
        if (item[index]) {
            item[index] = false
        } else {
            item[index] = true
        }      

       
        this.setData({
            selected:item,
        });
         this.addPrice()
    },
    selectAll(){
        let select= this.data.selected;
        let allSelect = this.data.allSelect;
        if(allSelect){
            select.fill(false);
        allSelect=false
        }
        else{
       select.fill(true)
     allSelect=true
}       
       this.setData({
           allSelect:allSelect,
           selected:select
       })
       this.addPrice()
    },
    addPrice(){
        let goods = this.data.shoppingCarInfo;
        let item = this.data.selected;
        let sum = 0;
        for (let i in goods) {        
            if (item[i]) {
                sum += goods[i].price*goods[i].quantity;
                sum=parseFloat(sum.toFixed(2))
                console.log(sum)
            }
        }
        this.setData({
            totalPrice:sum
        })
    },
    toIndexPage() {
        wx.switchTab({
            url: '/pages/home/home/home',
        })
    },

})