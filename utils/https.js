const promisic = function (func) {
    return function (params = {}) {
      return new Promise((resolve, reject) => {
        const args = Object.assign(params, {
          success: (res) => {
            resolve(res);
          },
          fail: (error) => {
            reject(error);
          }
        });
        func(args);
      });
    };
  };
  
  class Https {
      // 同步Http请求
      static async asyncRequest(url, method,token, data, backMethod) {
          let res = await promisic(wx.request)({
              url: url,
              method: method,
              token:token,
              data: data,
          })
          backMethod(res)
      }
  }
