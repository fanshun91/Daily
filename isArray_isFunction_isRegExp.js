// 判断是否为数组
function isArray(value) {
  return Object.prototype.toString.call(value) == "[object Array]";
}

// 判断是否为函数
function isFunction(value) {
  return Object.prototype.toString.call(value) == "[object Function]";
}

// 判断是否为正则
function isFunction(value) {
  return Object.prototype.toString.call(value) == "[object RegExp]";
}