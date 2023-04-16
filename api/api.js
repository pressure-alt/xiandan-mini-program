module.exports = {
    getUserAddress: getUserAddress,
    uploadGoods: uploadGoods,
    getGoods: getGoods,
    uploadImgs: uploadImgs,
    getCategories: getCategories,
    getUserInfo: getUserInfo,
    searchWithCategoryId:searchWithCategoryId,
    searchWithKW:searchWithKW,
    getShoppingCartInfo:getShoppingCartInfo
}

var domain = "http://localhost:8088"

function getCategories() {

    return new Promise(function (resolve, reject) {
        wx.request({
            url: domain + "/category/get",
            method: "GET",
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            },
            timeout: (res) => {
                console.log(res);
                wx.showToast({
                    title: '网络连接超时',
                    duration: 0,
                    icon: icon,
                    image: 'image',
                    mask: true,
                    success: (res) => {
                    },
                    fail: (res) => {
                    },
                    complete: (res) => {
                    },
                })
            }

        })
    })


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

function uploadGoods(good) {
    var result;
    return new Promise(function (resolve, reject) {
        wx.request({
            url: domain + '/goods/upload',
            method: "POST",
            data: {
                gid: 0,
                gprofile: "空空如也",
                gprice: 9.99,
                gprePrice: 100,
                giconPath: "no path",
                gdetails: "details",
                glocation: "ad",
                ownerId: 0,
                fineness: "95",
                stockNum: 10,
                categoryId: 11,
                gstatus: 0,

            },
            success: function (res) {
                console.log(res)
            },
            fail: function (res) {
                console.log(res)
            },
            timeout: function (res) {
                console.log("请求超时")
                console.log(res)
            }
        })
    })
}

function getGoods(page) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: domain + '/goods/list',
            method: "GET",
            data: {page: page},
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