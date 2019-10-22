// loading
Component({
  properties: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      data: ''
    }
  },
  data: {
    inputTimer: null
  },
  ready() {},
  methods: {
    input(e) {
      const input = e.detail.value;
      if (this.data.inputTimer) clearTimeout(this.data.inputTimer);
      const timer = setTimeout(() => {
        this.triggerEvent('change', input)
      }, 500);
      this.setData({
        inputTimer: timer
      });
    },
    confirm(e) {
      const input = e.detail.value;
      this.triggerEvent('confirm', input);
    }
  }
});
