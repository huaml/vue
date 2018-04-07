let SEARCH_KEY = '__search__'
let DEFAULT = {}
const KEYWORD = 'keyword'
const SEARCH_MAX_LENGTH = 10
/**
 * 存储搜索记录信息到本地
 * @param  {[type]} num    [1129457436314]
 * @param  {[type]} code   [ems]
 * @return {"num":"1129457436314","auto":[{"comCode":"ems","num":"1129457436314"},{"comCode":"shentong","num":"3340176817150"}]}
 */
export function saveToLocalStorage (code, num, shortName) {
  let storage = localStorage.getItem(SEARCH_KEY)
  // 如果本地存储不存在则创建,存在则从本地存储读取
  if (!storage) {
    storage = {
      comCode: KEYWORD,
      auto: []
    }
    storage.auto.push({
      comCode: code,
      num: num,
      shortName: shortName
    })
  } else {
    storage = JSON.parse(storage)
    let arr = storage.auto
    let index = arr.findIndex((item) => {
      return item.num === num
    })
    if (index === 0) {
      return
    }
    if (index > 0) {
      arr.splice(index, 1)
    }
    arr.unshift({
      comCode: code,
      num: num,
      shortName: shortName
    })
    if (SEARCH_MAX_LENGTH && arr.length > SEARCH_MAX_LENGTH) {
      arr.pop()
    }
  }
  localStorage.setItem(SEARCH_KEY, JSON.stringify(storage))
}

/**
 * 读取本地存储搜索记录信息
 * @return 全部本地存储搜索记录信息
 */
export function loadFromLocalStorage () {
  let storage = localStorage.getItem(SEARCH_KEY)
  // 如果本地存储为空时，返回默认值
  if (!storage) {
    return DEFAULT
  }
  // 本地存储不为空，读取全部数据
  storage = JSON.parse(storage)
  return storage
}

/**
 * 删除单个本地存储搜索记录信息
 */
export function deteleLocalStorage (query) {
  let storage = JSON.parse(localStorage.getItem(SEARCH_KEY))
  let arr = storage.auto
  let index = arr.findIndex((item) => {
    return item.num === query
  })
  if (index > -1) {
    arr.splice(index, 1)
  }
  localStorage.setItem(SEARCH_KEY, JSON.stringify(storage))
}

/**
 * 清空本地存储搜索记录信息
 */
export function removeLocalStorage () {
  localStorage.removeItem(SEARCH_KEY)
}
