class MVVM {
  constructor(options) {
    // 挂载可用数据到实例上
    this.$el = options.el;
    this.$data = options.data;
    this.$methods = options.methods
    // 如果含有模板就去编译
    if (this.$el) {
      // 数据劫持处理
      new Observer(this.$data);
      // 用数据和元素进行编译
      new Compile(this.$el, this);
    }
  }
}