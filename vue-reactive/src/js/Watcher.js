import Dep, { pushStack, popStack } from './Dep'
export default class Watcher {
  constructor(getter, options = {}) {
    const { computed, watch, callback } = options
    this.getter = getter
    this.computed = computed
    this.watch = watch
    this.callback = callback
    if (this.computed) {
      this.dep = new Dep()
      this.depend = function () {
        this.dep.depend(this)
      }
    } else {
      this.get()
    }
  }
  get() {
    pushStack(this)
    this.value = this.getter()
    popStack()
    return this.value
  }
  update() {
    if (this.computed) {
      this.dep.notify()
    } else if (this.watch) {
      const oldValue = this.value
      this.get()
      this.callback(oldValue, this.value)
    } else {
      this.get()
    }
  }
}
