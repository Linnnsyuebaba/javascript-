class _Person {
  constructor(name) {
    this.name = name
    this.sayName()
  }
  sayName() {
    return this.name
  }
}
const createSinglePerson = (function () {
  let single = null
  return function (...[name]) {
    if (!single) single = new _Person(name)
    return single
  }
})()