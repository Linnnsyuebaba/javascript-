function cycleDetector(obj) {
    var hasCircle = false, //  定义一个变量，标志是否有环
        cache = []; //  定义一个数组，来保存对象类型的属性值
    (function (obj) {
        var keys = Object.keys(obj); //获取当前对象的属性数组
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = obj[key];
            if (typeof value == 'object' && value !== null) {
                var index = cache.indexOf(value)      //check
                if (index !== -1) {     //判断对象或子对象是否已存在
                    hasCircle = true
                    break
                } else {
                    cache.push(value)   //子对象存储
                    arguments.callee(value)
                }
            }
        }
    })(obj)
    return hasCircle
}

//test
const a = {
    name1: 'a',
    child1: {
        name2: 'b',
        child2: {
            name3: 'c',
            child3: {
                name4: 'd',
                child4: null
            }
        }
    }
}
a.child1.child2.child3.child4 = a.child1
console.log(cycleDetector(a))       //true