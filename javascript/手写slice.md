## 手写实现slice方法
- __start:__
  - 若没有参数那就从0开始
  - 若有参数则为入参
  - 若为负数，则倒数从倒数第几位开始
- __end:__
  - 若无参数，则为字长，取至末尾
  - 若有参数，且大于字长，则取至末尾
  - 若为负数，则倒数从倒数第几位开始
```javascript
Array.prototype.mySlice = function () {
  let length = this.length
  let start = arguments[0] ? (arguments[0] <= -length ? -length : arguments[0]) : 0 //start位取值处理 无参为0 并处理临界值
  start = start >= 0 ? Number(start) : (isNaN(start + length) ? 0 : start + length) //start正负数处理 使得start始终为正数 并处理传入字符串
  let end = arguments[1] || arguments[1] === 0 ? (arguments[1] >= length ? length : arguments[1]) : length //end位取值处理 无参为字长 并处理临界值
  end = end >= 0 ? end : end + length //end正负处理 

  let size = end - start >= 0 ? end - start : 0 //始终size>=0
  let clone = new Array(size)
  if (this.charAt) {
    for (let i = 0; i < size; i++) {
      clone[i] = this.charAt(start + i)
    }
  } else {
    for (let i = 0; i < size; i++) {
      clone[i] = this[start + i]
    }
  }
  return clone
}
```

```javascript
//测试
function fn() {
  return Array.prototype.mySlice.call(arguments)
}
console.log([1, 2, 3, 4, 5].mySlice())        //[ 1, 2, 3, 4, 5 ]
console.log([1, 2, 3, 4, 5].mySlice(1, 3))    //[ 2, 3 ]
console.log([1, 2, 3, 4, 5].mySlice(-9, 4))   //[ 1, 2, 3, 4 ]
console.log([1, 2, 3, 4, 5].mySlice(-3, 9))   //[ 3, 4, 5 ]
console.log(fn('a', 'b', 'c'))                //[ 'a', 'b', 'c' ]
console.log(fn(1, 2, 3))                      //[ 1, 2, 3 ]
```
