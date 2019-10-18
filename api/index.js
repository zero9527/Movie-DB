const ApiConfig = require('./config');

/**
 * ### 基于wx.request的api封装
 * @HttpUtil HttpUtil(url, options);
 * @param url {*} 请求地址
 * @param options.method {*} 请求方式
 * @param options.header {*} 请求头
 * @param options.data {*} 请求数据
 */
module.exports = function HttpUtil(url = '', {
  method = 'GET',
  header = {
    'content-type': 'json'
  },
  data
} = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      header: header,
      url: ApiConfig.baseUrl + url,
      data: data,
      success(res) {
        if (res.statusCode == 200) resolve(res.data);
        else reject(res.statusCode);
      },
      fail(err){
        reject(err);
      }
    });
  });
}
