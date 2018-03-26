// 存储数据到本地存储
export function saveStorage (value, maxLen) {
  var history = localStorage.__history__
  if (!history) {
    history = []
  } else {
    history = JSON.parse(history)
  }
  var index = history.findIndex(function (item) {
    return item === value
  })
  if (index === 0) {
    return
  }
  if (index > 0) {
    history.splice(index, 1)
  }
  history.unshift(value)
  if (maxLen && history.length > maxLen) {
    history.pop()
  }
  localStorage.__history__ = JSON.stringify(history)
}

// 读取本地存储数据
export function loadStorage (def) {
  var history = localStorage.__history__
  if (!history) {
    return def
  }
  history = JSON.parse(history)
  return history || def
}

// 删除一条本地存储数据
export function deleteStorage (query) {
  var history = JSON.parse(localStorage.__history__)
  var index = history.findIndex(function (item) {
    return item === query
  })
  if (index > -1) {
    history.splice(index, 1)
  }
  localStorage.__history__ = JSON.stringify(history)
  return history
}

// 清空本地存储数据
export function clearStorage () {
  localStorage.removeItem('__history__')
  return []
}
