const Api = require('../../api/movie.js');
const app = getApp()

Page({
  data: {
    id: "",
    isLoading: false,
    movieInfo: {},
    showDescFull: false, // 简介展开,true显示简介所有内容
    desc60words: ''
  },
  onLoad({ id }) {
    // 缓存数据
    // if (wx.getStorageSync('movieInfo')) {
    //   let movieInfo = JSON.parse(wx.getStorageSync('movieInfo'));
    //   this.setData({
    //     movieInfo,
    //     desc60words: this.getDesc60Words(movieInfo.summary)
    //   });
    //   return;
    // }
    // id = 30329892; // 模拟(航海王：狂热行动)
    if (!id) return; 
    this.getData(id);
  },
  getData(id) {
    this.setData({ id: id, isLoading: true });
    Api.getMovieDetail({
      id
    }).then(res => {
      this.setData({
        isLoading: false,
        movieInfo: res,
        desc60words: this.getDesc60Words(res.summary)
      });
      wx.setStorageSync('movieInfo', JSON.stringify(res));
    }).catch(statucCode => {
      wx.showModal({
        title: '提示',
        content: `请求失败：${statucCode}`
      });
      this.setData({ isLoading: false });
    });
  },
  getDesc60Words(desc) {
    return desc.substr(0, 60)+'...';
  },
  showDescFullWords() {
    this.setData({ showDescFull: true });
  }
})
