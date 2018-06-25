// 兼容IE7一下浏览器的写法
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      let versions = [
        "MSXML2.XMLHttp.6.0",
        "MSXML2.XMLHttp.3.0",
        "MSXML2.XMLHttp"
      ],
          i,
          len;
      
      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = version[i];
          break;
        } catch (e) {
          console.log("error: " + e);
        }
      }    
    }

    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error("No XHR object available.");
  }
}