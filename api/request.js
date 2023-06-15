
module.exports={
    request:request
}

 function request(option) {
    var _url =  "http://localhost:8088" + option.url;
    var header = {
      'Content-Type': 'application/json'
    };
    return new Promise(function (resolve, reject) {
      wx.request({
        url: _url,
        method: option.method,
        data: option.data,
        
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