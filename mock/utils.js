/**
 * @param {string} url
 * @returns {Object}
 */
// 创建 param2Obj 函数，处理 url 参数 中的 ？和 &
function param2Obj(url) {
  // 使用 decodeURIComponent() 函数对 URL 进行编码
  // 先获取url 中 ？之后的字符串，并用空格代替 \ 符号，+ 表示一次或多次
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')

  if (!search) {
    return {}
  }
  const obj = {}
  // 通过 & 符号分隔字符串
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    // 查找是否含有 =
    const index = v.indexOf('=')
    if (index !== -1) {
      // 含有 = ,则将数组分为键值对形式
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  // 以对象形式返回地址栏中的参数
  return obj
}
/**
 * 简易深度复制，存在很多边界情况的bug
 * 如果想使用一个完美的深度拷贝，使用lodash的_.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

module.exports = {
  param2Obj,
  deepClone
}
