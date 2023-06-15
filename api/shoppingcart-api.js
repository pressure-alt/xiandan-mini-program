const request = require("./request")
// 查询购物车列表
export function listShoppingcart(query) {
    return  request.request({
      url: '/shopping-cart/list',
      method: 'get',
      data: query
    })
  }
  
  // 查询购物车详细
  export function getShoppingcart(userId) {
    return request.request({
      url: '/shopping-cart/select' + userId,
      method: 'get'
    })
  }
  
  // 新增购物车
  export function addShoppingcart(data) {
    return request.request({
      url: '/shopping-cart/add',
      method: 'post',
      data: data
    })
  }
  
  // 修改购物车
  export function updateShoppingcart(data) {
    return request.request({
      url: '/shopping-cart/update',
      method: 'put',
      data: data
    })
  }
  
  // 清空购物车
  export function delShoppingcart(userId) {
    return request.request({
      url: '/shoppingcart/delete' + userId,
      method: 'delete'
    })
  }