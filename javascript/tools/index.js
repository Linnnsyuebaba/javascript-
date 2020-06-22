// 获取当前路径
function getCurrentHref() {
  return typeof this.href === 'undefined'
    ? document.location.toString().toLowerCase()
    : this.href.toString().toLowerCase()
}

// 日期格式转换
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1, //month
    'd+': this.getDate(), //day
    'h+': this.getHours(), //hour
    'm+': this.getMinutes(), //minute
    's+': this.getSeconds(), //second
    'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(), //millisecond
  }
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o) {
    if (new RegExp(`(${k})`).test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(('' + o[k]).length)
      )
  }
  return format
}

// 判断是否以某字段结尾
String.prototype.endWith = (words) => {
  const index = this.length - words.length
  return index > 0 && this.lastIndexOf(words) === index
}

// 获取cookie值
function getCookie(key) {
  var arr = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`))
  if (arr != null) return unescape(arr[2])
  return null
}
