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

module.exports = {
  param2Obj
}
