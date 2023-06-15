const api = require("../../api/api");

const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    category:[],
    list: [
        
    ],
    load: true
  },
  
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
 api.getCategories().then(res=>{
    this.setData({
        category:res.data
    })
    var tmpList=[];
   for (let ca of this.data.category){
       if (ca.categoryParentId==0){
            tmpList.push({
                id:ca.categoryId,
                "name":ca.categoryName,
                spec:[]
            })
       }
   }
   for (let item of this.data.category){
       if (item.categoryParentId!=0){
           tmpList[item.categoryParentId-1].spec.push({
               categoryId:item.categoryId,
               title:item.categoryName,
               imagePath:item.imagePath
           })
       }
      
   } this.setData({
          list:tmpList
       })
})
   
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  selectCateg(e){
console.log(e.currentTarget)
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;

    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        
        view.fields({
          size: true
        }, data => {
            console.log(data)
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})