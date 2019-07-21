# call apply bind

它们都可以改变函数都执行作用域（改变this）

> ## call
```javascript
Function.prototype.myCall = function(context) {
  context = context || window   //根据入参决定指向
  context.fn = this   //this指向调用call的函数，谁最后调用this指向哪
  const args = [...arguments].slice(1)    //去除传入的第一个参数指向
  context.fn(...args)   //根据call的特点: 接受的是若干个参数列表
  delete context.fn; // 执行后销毁新增属性
  return context
}
```

> ## apply
```javascript
Function.prototype.myApply = function(context) {
  context = context || window   //根据入参决定指向
  context.fn = this   //this指向调用call的函数，谁最后调用this指向哪
  const args = [...arguments].slice(1)    //去除传入的第一个参数指向
  context.fn(args)  //根据call的特点: 接受一个包含多个参数的数组
  delete context.fn; // 执行后销毁新增属性
  return context
}
```

> ## bind
```javascript
ES5
Function.prototype.myBind = function() {
  let self = this
  let args = Array.prototype.slice.call(arguments)
  let context = args.shift()
  return function(){
    let _args = Array.prototype.slice.call(arguments)
    return self.apply(context, args.concat(_args))
  }
}

ES6
Function.prototype.myBind = function(...args){
  let self = this
  let context = args.shift()
  return function(..._args){
    return self.apply(context, [...args, ..._args])
  }
}
```
