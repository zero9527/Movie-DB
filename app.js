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
    if (wx.canIUse("getUpdateManager")) {
      this.checkUpdate();
    } else {
      wx.showModal({
        title: "提示",
        content: "当前微信版本过低，无法使用版本更新！"
      });
    }
  },
  onShow() {},
  // 检查新版本
  checkUpdate() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showModal({
        title: "提示",
        content: "版本更新失败，请清除缓存后再试！"
      });
    })
  },
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
    userInfo: null,
    appName: 'MovieDob',
    systemInfo: {
      height: 0,
      width: 0,
    },
    city: '深圳',
    movieTop250All: []
  }
})