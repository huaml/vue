export function formatDate (date, fmt) {
  var obj = {
    'M+': date.getMonth() + 1, // 获取月份
    'd+': date.getDay(),       // 获取日
    'h+': date.getHours(),     // 获取时
    'm+': date.getMinutes(),   // 获取分
    's+': date.getSeconds()    // 获取秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear())
  }
  for (var k in obj) {
    if (new RegExp(`(${k})`).test(fmt)) {
      var str = obj[k] + ''
      fmt = fmt.replace(RegExp.$1, ('00' + str).substr(str.length))
    }
  }
  return fmt
}
