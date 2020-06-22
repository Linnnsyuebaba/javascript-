import Watcher from './Watcher'
export default function computed(getter) {
  const computedWatcher = new Watcher(getter, { computed: true })
  let attr = {}
  Object.defineProperty(attr, 'value', {
    get() {
      computedWatcher.depend()
      return computedWatcher.get()
    },
  })
  return attr
}
