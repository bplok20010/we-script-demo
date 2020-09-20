const app = getApp()

Page({
  data: {
    loading: true,
    list: [
      '苹果',
      '橙子',
      '柚子',
      '香瓜',
      '香蕉',
      '葡萄',
      '芒果',
    ],
  },

  // 内容随机排列
  shuffle(array) {
    // 具体内容远程加载实现
    return array;
  },

  setScriptContext(e) {
    e.detail.setContext(this);
  },

  handleSort() {
    this.setData({
      list: this.shuffle(this.data.list)
    })
  },

  loadSuccess(e) {
    this.setData({
      loading: false
    })
    // e.detail.context // 当前上下文
    console.log('we-script远程代码加载/执行成功')
  },

  loadError(e) {
    // e.detail.error // 错误信息
    console.log('we-script远程代码加载/执行失败')
  },

  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})