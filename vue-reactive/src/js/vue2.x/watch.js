import Watcher from './Watcher'
export default function (getter, callback) {
  new Watcher(getter, { watch: true, callback })
}
