const CookieUtil = {

  get(name) {
    let cookieName = encodeURIComponent(name) + "=",
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart); // StringObject.indexOf(value, fromIndex)
      if (cookieEnd) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }

    return cookieValue;
  },

  set(name, value, expires, path, domain, secure) {
    let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    if (expires instanceof Date) {
      cookieText += "; expires=" + expires.toGMTString();
    }

    if (path) {
      cookieText += "; path=" + path;
    }

    if (domain) {
      cookieText += "; domain=" + domain;
    }

    if (secure) {
      cookieText += "; secure"; // secure是一个安全标识
    }

    document.cookie = cookieText;
  },

  unset(name, path, domain, secure) {
    this.set(name, "", new Date(0), path, domain, secure);
  }

};

export default CookieUtil;