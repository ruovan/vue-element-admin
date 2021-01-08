import Mock from 'mockjs'

console.log(Mock)

// 这里的 c 代表 Chinese，中文；不加 c ，则为英语

// 1. 生成文本 @cword
// 生成随机字符串
const data1 = Mock.mock({
  string: '@cword'
})
console.log(data1)

// 生成指定字符串长度和范围
const data11 = Mock.mock({
  string: '@cword(3,9)',
  str: '@cword(7)'
})
console.log(data11)

// 2. 生成标题 @ctitle
const data2 = Mock.mock({
  title: '@ctitle'
})
console.log(data2)

// 3. 生成句子 @csentence
const data3 = Mock.mock({
  sentence: '@csentence'
})
console.log(data3)

// 4. 生成段落 @cparagraph
const data4 = Mock.mock({
  paragraph: '@cparagraph'
})
console.log(data4)

/* ----------------------- */
// 1. 生成随机数字,范围为1-100
const num1 = Mock.mock({
  'number|1-100': 10
})
console.log(num1)
// 2. 生成随机字符串
const str = Mock.mock({
  'str|5-20': 'string'
})
console.log(str)
// 3. 生成增量id，在生成多个时会自动加1，默认为1
const id = Mock.mock({
  id: '@increment()'
})
console.log(id)
/* ------------------------------------- */

// 1. 生成姓名、地址、身份证号
// @city()，设置为true，会返回升级城市
// 不设置true，只有市级城市
const info = Mock.mock({
  username: '@cname()',
  address: '@city(true)',
  idCard: '@id()'
})
console.log(info)
// 2. 生成图片，@image(arg1,arg2,arg3,arg4,arg5)
/*
  arg1:图片大小；
  arg2:图片背景色；
  arg3:图片前景色
  arg4:图片格式
  arg5:图片文字
*/
const imgUrl = Mock.mock({
  img_url: "@image('250x250','#00f','#f0f','png','生成图片')"
})
console.log(imgUrl)

// 3.生成时间,@data
const time = Mock.mock({
  date: '@data(yyyy-MM-dd hh:mm:ss)'
})
console.log(time)

// 4.生成数组，设置长度：（|10）；设置范围（|10-20）个数组，
const arr = Mock.mock({
  'list|10-20': [
    {
      username: '@cname',
      address: '@city(true)',
      idCard: '@increment(1)'
    }
  ]
})
console.log(arr)

/** mock拦截请求 */

// Mock.mock('url','method',{response})
// 另一种方式
// Mock.mock('url','method',()=>{ return { response } })

// url：请求地址；method：请求方法；response：响应数据
Mock.mock('/api/getInfo', 'get', {
  status: 200,
  message: 'Mock拦截get请求'
})
Mock.mock('/api/postInfo', 'post', () => {
  return {
    status: 200,
    msg: 'Mock拦截post请求'
  }
})
