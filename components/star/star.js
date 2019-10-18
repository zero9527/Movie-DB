// 星星评分
Component({
  properties: {
    score: { // 评分
      type: Number,
      value: 0
    },
    readonly: { // 只读： true 只显示，false 手动打分
      type: Boolean,
      value: true
    }
  },
  data: {
    _score: 5,
  },
  methods: {
    scoreChange(e) {
      let score = e.currentTarget.dataset.score;
      this.setData({
        _score: score
      });
      this.triggerEvent('score-change', score);
    }
  }
});
