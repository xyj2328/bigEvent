// 每次发起真正的请求之后，都会经过

$.ajaxPerfilter(function(config){
  // 将key-value形式的数据，转成json格式
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
  // 统一设置基准地址
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  config.contentType = 'application/json'
  config.data = format2Json(config.data)
})