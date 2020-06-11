import isObject from '../utils'
import Dep from './Dep'
export default function observer(data) {
  if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      defineObserver(data, key)
    })
  }
  return data
}
function defineObserver(obj, key) {
  let value = obj[key]
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      dep.depend()
      return value
    },
    set(newVal) {
      value = newVal
      dep.notify()
    },
  })
  if (isObject(value)) {
    observer(value)
  }
}
