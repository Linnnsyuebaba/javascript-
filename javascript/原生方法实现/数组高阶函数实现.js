// 数组map方法
Array.prototype.myMap = function (fn, ctx) {
  const thisArr = Array.prototype.slice.call(this)
  let mapArray = []
  for (let i = 0; i < thisArr.length; i++) {
    if (!thisArr.hasOwnProperty(i)) continue
    mapArray[i] = fn.call(ctx, thisArr[i], i, this)
  }
  return mapArray
}

//数组map方法(reduce)
Array.prototype.myMap = function (fn, ctx) {
  let thisArr = Array.prototype.slice.call(this)
  return thisArr.reduce(
    (pre, cur, index) => [...pre, fn.call(ctx, cur, index, this)],
    []
  )
}

// 数组filter方法
Array.prototype.myFilter = function (fn, ctx) {
  const thisArr = Array.prototype.slice.call(this)
  let filterArr = []
  for (let i = 0; i < thisArr.length; i++) {
    if (!thisArr.hasOwnProperty(i)) continue
    fn.call(ctx, thisArr[i], i, this) && filterArr.push(thisArr[i])
  }
  return filterArr
}

// 数组filter方法(reduce)
Array.prototype.myFilter = function (fn, ctx) {
  let thisArr = Array.prototype.slice.call(this)
  return thisArr.reduce((pre, cur, index) => {
    return fn.call(ctx, cur, index, this) ? [...pre, cur] : [...pre]
  }, [])
}

// 数组some方法
Array.prototype.mySome = function (fn, ctx) {
  const thisArr = Array.prototype.slice.call(this)
  if (!thisArr.length) return false
  for (let i = 0; i < thisArr.length; i++) {
    if (!thisArr.hasOwnProperty(i)) continue
    const res = fn.call(ctx, thisArr[i], i, this)
    if (res) return true
  }
}
