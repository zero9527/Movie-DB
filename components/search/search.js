// loading
Component({
  properties: {
    value: {
      type: String,
      data: ''
    }
  },
  data: {
    showInputFull: false
  },
  ready() {},
  methods: {
    focus() {
      this.setData({ showInputFull: true });
    },
    blur() {
      this.setData({ showInputFull: false });
    },
    toSearchList(e) {
      const input = e.detail.value;
      this.triggerEvent('confirm', input);
    }
  }
});
