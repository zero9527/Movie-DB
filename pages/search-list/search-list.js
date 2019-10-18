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
    if (!input) return;
    this.setData({ input });
    this.searchMovie();
  },
  searchMovie() {
    if (this.data.isLoading) return;
    this.setData({ isLoading: true });

    Api.searchMovie({
      q: this.data.input,
      start: this.data.currentPage*10,
      count: 10
    })
    .then(res => {
      this.setData({
        isLoading: false,
        searchList: res
      })
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
    this.searchMovie();
  },
  toDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id='+id
    })
  }
})
