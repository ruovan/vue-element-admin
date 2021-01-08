/**
 * 判断字符串是否是....开头的，即验证是否为外链
 * @param {string} path
 * @returns {bool}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
