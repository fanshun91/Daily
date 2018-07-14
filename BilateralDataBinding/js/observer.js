/**
 *  Observer 观察者
 *  usage: 
 *  Implement a listener to hijack and listen to all properties, 
 *  notify subscribers if there is data change.
 */

function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk(data) {
    const self = this;
    Object.keys(data).forEach(key => {
      self.defineReaction(data, key, data[key]);
    });
  },
  defineReaction(data, key, value) {
    let dep = new Dep();
    let childObj = observe(value);

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function getter() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }

        return value;
      },
      set: function setter(newValue) {
        if (newValue === val) {
          return;
        }

        value = newValue;
        dep.notify();
      }
    });
  }
};

function observe(value) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
};

Dep.target = null;