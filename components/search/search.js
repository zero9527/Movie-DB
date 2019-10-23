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
    inputValue: '',
    inputTimer: null,
    showClearIcon: false
  },
  ready() {},
  observers: {
    'value': function(value) {
      this.setData({
        inputValue: value
      })
    },
    'inputValue': function(inputValue) {
      this.setData({ showClearIcon: inputValue !== '' });
    }
  },
  methods: {
    input(e) {
      const input = e.detail.value;
      if (this.data.inputTimer) clearTimeout(this.data.inputTimer);
      const timer = setTimeout(() => {
        this.triggerEvent('change', input)
      }, 500);
      this.setData({
        inputValue: input,
        inputTimer: timer
      });
    },
    confirm(e) {
      const input = e.detail.value;
      this.triggerEvent('confirm', input);
    },
    clear() {
      this.setData({
        inputValue: ''
      })
    }
  }
});
