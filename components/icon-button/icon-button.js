Component({
  properties: {
    style: {
      type: Object,
      default: {}
    },
    icon: {
      type: String,
      default: 'icon-arrow-upward-outline'
    }
  },
  data: {},
  methods: {
    tap() {
      this.triggerEvent('tap');
    }
  }
});
