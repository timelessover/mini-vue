class Observer {
  constructor(data) {
    this.observer(data);
  }

  observer(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }


  defineReactive(obj, key, value) {
    let dep = new Dep();
    let that = this
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 劫持数据响应式，与watcher关联
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newVal) {
        if (newVal !== value) {
          value = newVal;
          // 这边修改了值后需要重新监听
          that.observer(value)
          dep.notify();
        }
      }
    });
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}