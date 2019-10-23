const Api = require('../../api/movie.js');
const app = getApp();

Page({
  data: {
    input: '',
    searchList: [],
    currentPage: 0,
    isLoading: false
  },
  onLoad({ input }) {
    // input = '海'; // 模拟
    if (!input) return;
    this.setData({ input });
    this.searchMovie();
  },
  searchChange(e) {
    this.setData({ input: e.detail });
    this.searchMovie();
  },
  searchMovie() {
    if (this.data.isLoading) return;
    this.setData({ isLoading: true });

    let movieTop250All = wx.getStorageSync('movieTop250All');
    if (movieTop250All) {
      let searchRes = movieTop250All.filter(item => item.title.includes(this.data.input));
      this.setData({
        isLoading: false,
        searchList: searchRes
      });

    } else {
      app.getMovieTop250All(res => {
        this.setData({
          isLoading: false,
          searchList: res
        });
      });
    }
  },
  toDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id='+id
    })
  },
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }
})
