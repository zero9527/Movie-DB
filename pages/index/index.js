const Api = require('../../api/movie.js');
const app = getApp();

Page({
  data: {
    movieLineStatus: 0, // 0影院热映，1即将上映
    movieLine: [{},{},{},{},{},{}], // 院线
    movieComing: [], // 即将上映
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
    this.getDataList('movieComing', {
      start: 0,
      count: 6
    });
    this.getDataList('movieTop250', {
      start: 0,
      count: 10
    });
  },
  movieLineStatusChange(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      movieLineStatus: status - 0
    });
  },
  getDataList(type, params) {
    if (this.data.loading) return;

    const type2Api = {
      movieLine: 'getMovieLine',
      movieComing: 'getMovieComing',
      movieTop250: 'getMovieTop250'
    };
    this.setData({ isLoading: true });

    Api[type2Api[type]](params)
    .then(res => {
      this.setData({ isLoading: false });
      this.setData(type === 'movieTop250' ? {
        currentPage: this.data.currentPage+1,
        movieTop250: [...this.data.movieTop250, ...res.subjects]
      } : {
        [type]: res.subjects
      });
    });
  },
  refresh() {
    this.setData({
      currentPage: 0
    });
    this.init();
  },
  loadMore() {
    console.log('到底部了');
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
