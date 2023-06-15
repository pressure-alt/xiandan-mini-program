
const request = require("./request")
// 查询商品列表
export function listGoods(query) {
    return request.request({
      url: '/goods/search',
      method: 'get',
      data: query
    })
  }
  
 
  
  // 新增商品
  export function addGoods(data) {
    return request.request({
      url: '/goods/upload',
      method: 'post',
      data: data
    })
  }
  
  // 修改商品
  export function updateGoods(data) {
      
    return request.request({
      url: '/goods/update',
      method: 'put',
      data: data
    })
  }
  
  // 删除商品
  export function delGoods(gid) {
    return request.request({
      url: '/goods/delete?goodsId=' + gid,
      method: 'delete'
    })
  }
  