const Api = require('../../api/movie.js');
const app = getApp();

Page({
  data: {
    movieLineStatus: 0, // 0影院热映，1即将上映
    movieLine: [{},{},{},{},{},{}], // 院线
    movieComing: [{},{},{},{},{},{}], // 即将上映
    movieTop250: [], // Top250
    currentPage: 0,
    isLoading: false
  },
  onLoad() {
    this.init();
  },
  init() {
    this.getDataList('movieLine', {
      city: '深圳',
      start: 0,
      count: 6
    });
    this.getDataList('movieTop250', {
      start: 0,
      count: 10
    });
  },
  toSearchList(input) {
    wx.navigateTo({
      url: '/pages/search-list/search-list?input='+input
    })
  },
  movieLineStatusChange(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      movieLineStatus: status - 0
    });

    if (this.data.movieComing[0].title) return;
    this.getDataList('movieComing', {
      start: 0,
      count: 6
    });
  },
  getDataList(type, params) {
    if (this.data.isLoading) return;

    const type2Api = {
      movieLine: 'getMovieLine',
      movieComing: 'getMovieComing',
      movieTop250: 'getMovieTop250'
    };
    this.setData({ isLoading: true });

    Api[type2Api[type]](params)
    .then(res => {
      this.setData(type === 'movieTop250' ? {
        currentPage: this.data.currentPage+1,
        movieTop250: [...this.data.movieTop250, ...res.subjects]
      } : {
        [type]: res.subjects
      });
      setTimeout(() => {
        this.setData({ isLoading: false });
      }, 300);
    }).catch(statucCode => {
      wx.showModal({
        title: '提示',
        content: `请求失败：${statucCode}`
      });
      this.setData({ isLoading: false });
    });
  },
  refresh() {
    this.setData({ currentPage: 0 });
    this.init();
  },
  loadMore() {
    this.getDataList('movieTop250', {
      start: this.data.currentPage*10,
      count: 10
    });
  },
  toDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id='+id
    })
  }
})
