let eventEmitter = {}
eventEmitter.list = {}
eventEmitter.on = function (event, fn) {
  let self = this
  self.list[event]
    ? self.list[event].add(fn)
    : (self.list[event] = new Set()).add(fn)
  return self
}
eventEmitter.emit = function (event, ...args) {
  let self = this
  let fns = self.list[event]
  if (!fns || fns.size === 0) return false
  fns.forEach((fn) => {
    fn.apply(self, args)
  })
  return self
}
eventEmitter.off = function (event, fn) {
  let self = this
  let fns = self.list[event]
  if (!fns || fns.size === 0) return false
  if (!fn) {
    fns.clear()
  } else {
    fns.delete(fn)
  }
  return self
}
eventEmitter.once = function (event, fn) {
  let self = this
  function once (...args) {
    self.off(event, once)
    fn.apply(self, args)
  }
  self.on(event, once)
  return self
}
function user1(content) {
  console.log(`user1订阅了${content}`)
}
function user2(content) {
  console.log(`user2订阅了${content}`)
}
function user3(content) {
  console.log(`user3订阅了${content}`)
}
eventEmitter.on('play', user1) // 订阅play
eventEmitter.on('play', user2) // 订阅play
eventEmitter.off('play', user2) // 解除play订阅
eventEmitter.once('test', user3) // 订阅一次test
eventEmitter.emit('play', 'play') // 发布play（此时有一个订阅）
eventEmitter.emit('test', 'test') // 发布test（此时有一个订阅）
eventEmitter.emit('test', 'test') // 再次发布test（此时无人订阅）

// user1订阅了play
// user3订阅了test

