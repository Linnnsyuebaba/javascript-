export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
export function debounce(fn, wait = 500) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
