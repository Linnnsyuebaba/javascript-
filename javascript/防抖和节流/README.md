# 防抖和节流

防抖和节流的作用都是防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下只会调用一次，而节流的 情况会每隔一定时间（参数wait）调用函数。
> ## 防抖
__防抖每次触发事件时都取消之前的延时调用方法__

```javascript
function debounce(fn, delay = 500) {
    let timer = null
    return function (_args) {
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.call(this, _args)
        }, delay)
    }
}
```

> ## 节流
节流每次触发事件时都判断当前是否有等待执行的延时函数
```javascript
function throttle(fn, delay) {
    let flag = true     //设定一个标记，去判断是否有延时回调存在
    return function (_args) {
        if (!flag) return
        flag = false
        setTimeout(function () {
            fn.call(this, _args)
            flag = true
        }, delay)
    }
}
```
> ## demo
demo之中利用对三种形态的对比
