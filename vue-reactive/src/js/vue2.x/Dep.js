export default class Dep {
  constructor() {
    this.deps = new Set()
  }
  depend() {
    if (Dep.target) {
      this.deps.add(Dep.target)
    }
  }
  notify() {
    this.deps.forEach((watcher) => watcher.update())
  }
}
Dep.target = null

const watcherTargetStack = []

export function pushStack(target) {
  if (Dep.target) {
    watcherTargetStack.push(Dep.target)
  }
  Dep.target = target
}
export function popStack() {
  Dep.target = watcherTargetStack.pop()
}
