function jsonp(options) {
  let url = options.url
  let data = options.data
  let fn = options.fn
  let param = []
  for (key in data) {
    param.push(`${key}=${data[key]}`)
  }
  let script = document.createElement('script')
  script.src = `${url}?${param.join('&')}`
  document.body.appendChild(script)
  return new Promise((resolve, reject) => {
    window[fn] = (data) => {
      try {
        resolve(data)
      } catch (e) {
        reject(e)
      } finally {
        script.parentNode.removeChild(script)
      }
    }
  })
}
jsonp({
  url: 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg',
  data: {
    _: 1563357180747,
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    jsonpCallback: 'jsonp1'
  },
  fn: 'jsonp1'
}).then(data => {
  console.log(data)
}).catch(e =>{
  console.log(e)
})