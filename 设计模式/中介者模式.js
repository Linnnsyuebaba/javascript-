const _Goods = {
  // ...
}
const mediator = (function () {
  let DOM1 = document.querySelector('#...')
  let DOM2 = document.querySelector('#...')
  return {
    changed: function (subject) {
      switch (subject) {
        case DOM1:
          // TODO
          break
        case DOM2:
          // TODO
          break
      }
    },
  }
})() // 通过中间层处理操作 处理数据变化
DOM1.onchange = () => {
  mediator.changed(this)
}
DOM2.onchange = () => {
  mediator.changed(this)
}

new Event()

