Component({
  properties: {},
  data: {
    count: 0,
  },
  methods: {
    increment() {
      this.setData({
        count: this.data.count+1
      })
    },
    decrease() {
      this.setData({
        count: this.data.count-1
      })
    }
  }
});
