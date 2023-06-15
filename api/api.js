module.exports = {
    getUserAddress: getUserAddress,
    uploadGoods: uploadGoods,
    getGoods: getGoods,
    uploadImgs: uploadImgs,
    getCategories: getCategories,
    getUserInfo: getUserInfo,
    searchWithCategoryId:searchWithCategoryId,
    searchWithKW:searchWithKW,
    getShoppingCartInfo:getShoppingCartInfo,
    domain:getDomain,
}

const domain = "http://localhost:8088"
function getDomain(){
    return domain
}
var request = function request(url,  method, data) {
    var _url = domain  + url;
    var header = {
      'Content-Type': 'application/json'
    };
    return new Promise(function (resolve, reject) {
      wx.request({
        url: _url,
        method: method,
        data: data,
        header: header,
        success: function success(request) {
            console.log(request)
          resolve(request.data);
        },
        fail: function fail(error) {
            console.log(error)
          reject(error);
        },
        complete: function complete(aaa) {
          // 加载完成
        }
      });
    });
  };
function getCategories() {
    return  request("/category/get","GET","")
}

function getUserAddress() {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: domain + 'user/address',
            method: "POST",
            data: {
                "userId": "122"
            },
            success: (res) => {
                console.log(res)
                resolve(res)
            },
            fail: (res) => {
                console.log(res)
                reject(res)
            },
            timeout: (res) => {
                console.log("请求超时")
                console.log(res)
            }
        })
    })

}

function uploadGoods(goods) {
    var result;
    return request("/goods/upload","POST",goods)
}

function getGoods(page) {
    return request("/goods/list","GET",{page:page})
    
}

/**
 * 上传图片
 */
function uploadImgs(filePath) {
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            filePath: filePath,
            name: 'file',
            url: domain + '/upload/local',
            success: function (res) {
                console.log(res)
                resolve(res)
            },
            fail: function (res) {
                console.log(res)
                reject(res)
            },
            timeout: function (res) {
                console.log("请求超时")
                console.log(res)
            }
        })
    })
}

/**
 * 获取用户详细信息
 */
function getUserInfo(userId) {
    console.log(userId)
    return new Promise(function (resolve, reject) {
        wx.request({
            url: domain + "/user/info",
            method: "GET",
            data: {
                userId: 12
            },
            success: (res) => {

                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })

}

/**
 * 关键字搜索
 */
function searchWithKW(keyWords){
    if (typeof(keyWords)==="string")
    {
        console.log(keyWords)
        return new Promise((resolve, reject) => {
        wx.request({
            url:domain+"/goods/search-words?keyWords="+keyWords,
            method:"POST",


            success: function (res) {
                console.log(res)
                resolve(res)
            },
            fail: function (res) {
                console.log(res)
                reject(res)
            },
            timeout: function (res) {
                console.log("请求超时")
                console.log(res)
            }
        })
        })
    }

}

/**
 * 关键字搜索
 */
function searchWithCategoryId(categoryId){
    if (typeof(categoryId)==="bigint")
    {
        console.log(categoryId)
        return new Promise((resolve, reject) => {
            wx.request({
                url:domain+"/goods/search-cid?categoryId="+categoryId,
                method:"POST",

                success: function (res) {
                    console.log(res)
                    resolve(res)
                },
                fail: function (res) {
                    console.log(res)
                    reject(res)
                },
                timeout: function (res) {
                    console.log("请求超时")
                    console.log(res)
                }
            })
        })
    }

}

/**
 * 获取购物车信息
 * @param userId id
 * @returns {Promise<unknown>}
 */
function getShoppingCartInfo(openId){
    return new Promise((resolve, reject) => {
        wx.request({
            url:domain+"/shopping-cart/info?openId="+openId,
            success: function (res) {
                console.log(res)
                resolve(res)
            },
            fail: function (res) {
                console.log(res)
                reject(res)
            },
            timeout: function (res) {
                console.log("请求超时")
                console.log(res)
            }
        })
    })
}
