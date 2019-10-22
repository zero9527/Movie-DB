const Api = require('./api/movie.js');

App({
  onLaunch() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = {
          height: res.windowHeight,
          width: res.windowWidth
        };
      }
    });
  },
  onShow() {},
  // 获取Top250全部电影，搜索列表用（搜索接口失效了。。。）
  getMovieTop250All(callback = null) {
    return Promise.all([
      this.getDataList(0),
      this.getDataList(100),
      this.getDataList(200),
    ]).then(([res1, res2, res3]) => {
      let cache = wx.getStorageSync('movieTop250All');
      if (cache && cache.length > 0) {
        if (callback) callback(cache);
        return;
      }
      this.globalData.movieTop250All = [
        ...res1.subjects,
        ...res2.subjects,
        ...res3.subjects,
      ];
      wx.setStorage({
        key: 'movieTop250All',
        data: this.globalData.movieTop250All
      })
      if (callback) callback(this.globalData.movieTop250All);
      
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: `请求失败：${JSON.stringify(err)}`
      });
    });
  },
  getDataList(start) {
    return Api.getMovieTop250({
      start: start,
      count: 100
    });
  },
  globalData: {
    appName: 'MovieDob',
    systemInfo: {
      height: 0,
      width: 0,
    },
    userInfo: null,
    movieTop250All: []
  }
})