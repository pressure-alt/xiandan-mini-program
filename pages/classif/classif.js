const app = getApp()
const WXAPI = require('apifm-wxapi')
const AUTH = require('../../utils/auth')
const TOOLS = require('../../utils/tools.js')
Component({
    
    data: {
        categories: [],
        activeCategory: 0,
        categorySelected: {
          name: '',
          id: ''
        },
        currentGoods: [],
        onLoadStatus: true,
        scrolltop: 0,
    
        skuCurGoods: undefined,
        page: 1,
        pageSize: 20
    },
    lifetimes: {
        attached: function () {
         
            wx.showShareMenu({
                withShareTicket: true
              })
           
              this.setData({
                categoryMod: wx.getStorageSync('categoryMod')
              })
              this.categories();
        },
        ready: function () {
            wx.hideLoading({
                success: (res) => {},
            })
        }
    },
    methods: {
        async getGoodsList() {
            if (this.data.categoryMod == 2) {
              return
            }
            wx.showLoading({
              title: '',
            })
            // secondCategoryId
            let categoryId = ''
            if (this.data.secondCategoryId) {
              categoryId = this.data.secondCategoryId
            } else if(this.data.categorySelected.id) {
              categoryId = this.data.categorySelected.id
            }
            // https://www.yuque.com/apifm/nu0f75/wg5t98
            const res = await WXAPI.goodsv2({
              categoryId,
              page: this.data.page,
              pageSize: this.data.pageSize
            })
            wx.hideLoading()
            if (res.code == 700) {
              if (this.data.page == 1) {
                this.setData({
                  currentGoods: null
                });
              } else {
                wx.showToast({
                  title: '没有更多了',
                  icon: 'none'
                })
              }
              return
            }
            if (res.code != 0) {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
              return
            }
            if (this.data.page == 1) {
              this.setData({
                currentGoods: res.data.result
              })
            } else {
              this.setData({
                currentGoods: this.data.currentGoods.concat(res.data.result)
              })
            }
          },
          async categories() {
            wx.showLoading({
              title: '',
            })
            const res = await WXAPI.goodsCategory()
            console.log(res)
            wx.hideLoading()
            let activeCategory = 0
            let categorySelected = this.data.categorySelected
            if (res.code == 0) {
              const categories = res.data.filter(ele => {
                return !ele.vopCid1 && !ele.vopCid2
              })
              categories.forEach(p => {
                p.childs = categories.filter(ele => {
                  return p.id == ele.pid
                })
              })
              const firstCategories = categories.filter(ele => { return ele.level == 1 })
              if (this.data.categorySelected.id) {
                activeCategory = firstCategories.findIndex(ele => {
                  return ele.id == this.data.categorySelected.id
                })
                categorySelected = firstCategories[activeCategory]
              } else {
                categorySelected = firstCategories[0]
              }
              const resAd = await WXAPI.adPosition('category_' + categorySelected.id)
              let adPosition = null
              if (resAd.code === 0) {
                adPosition = resAd.data
              }
              this.setData({
                page: 1,
                activeCategory,
                categories,
                firstCategories,
                categorySelected,
                adPosition
              })
              this.getGoodsList()
            }
          },
    }
})